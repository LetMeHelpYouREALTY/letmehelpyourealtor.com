/**
 * Test: /api/leads/capture sends leads to Follow Up Boss via POST /events
 * (the old PUT /people call is not a FUB endpoint and returned 405).
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from './route'

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost:3000/api/leads/capture', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', referer: 'https://example.com/contact' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/leads/capture', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    fetchMock.mockReset()
    vi.stubGlobal('fetch', fetchMock)
    process.env.FUB_API_KEY = 'test-key'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('sends one General Inquiry event to FUB with the person and tags', async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ id: 42 }), { status: 201 }))

    const res = await POST(makeRequest({
      name: 'Pat Example Tester',
      email: 'pat@example.com',
      phone: '5555551234',
      message: 'Interested in open houses',
      priceMax: 500000,
      tags: ['open-house'],
      stage: 'New Lead',
    }))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data).toMatchObject({ success: true, personId: 42, isNew: true })

    const fubCalls = fetchMock.mock.calls.filter(([url]) => String(url).includes('followupboss'))
    expect(fubCalls).toHaveLength(1)
    const [url, init] = fubCalls[0]
    expect(url).toBe('https://api.followupboss.com/v1/events')
    expect(init.method).toBe('POST')
    const body = JSON.parse(init.body)
    expect(body.type).toBe('General Inquiry')
    expect(body.message).toBe('Interested in open houses')
    expect(body.description).toContain('Price:')
    expect(body.person).toMatchObject({
      firstName: 'Pat',
      lastName: 'Example Tester',
      emails: [{ value: 'pat@example.com' }],
      phones: [{ value: '5555551234' }],
    })
    expect(body.person.tags).toContain('website-lead')
    expect(body.person.tags).toContain('open-house')
    expect(body.person.stage).toBeUndefined()
  })

  it('reports an existing contact when FUB answers 200', async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ id: 7 }), { status: 200 }))
    const res = await POST(makeRequest({ firstName: 'Lee', email: 'lee@example.com' }))
    const data = await res.json()
    expect(data).toMatchObject({ success: true, personId: 7, isNew: false })
  })

  it('handles an archived lead flow (204, no body)', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 204 }))
    const res = await POST(makeRequest({ firstName: 'Lee', email: 'lee@example.com' }))
    expect(res.status).toBe(200)
    expect((await res.json()).personId).toBeNull()
  })

  it('does not retry a FUB client error', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ errorMessage: 'Bad' }), { status: 400 }))
    const res = await POST(makeRequest({ firstName: 'Lee', email: 'lee@example.com' }))
    expect(res.status).toBe(500)
    const fubCalls = fetchMock.mock.calls.filter(([url]) => String(url).includes('followupboss'))
    expect(fubCalls).toHaveLength(1)
  })

  it('returns 400 when email and phone are both missing', async () => {
    const res = await POST(makeRequest({ firstName: 'Lee' }))
    expect(res.status).toBe(400)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('returns 400 when the name is missing', async () => {
    const res = await POST(makeRequest({ email: 'lee@example.com' }))
    expect(res.status).toBe(400)
  })
})
