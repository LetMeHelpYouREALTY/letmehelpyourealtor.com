$files = Get-ChildItem -Path app,components,lib -Recurse -Include *.tsx,*.ts -File |
  Where-Object { $_.FullName -notmatch 'node_modules|letmehelpyou-brand|letmehelpyou-services|page-metadata' }

$replacements = [ordered]@{
  'bg-gradient-to-r from-blue-600 to-blue-700' = 'bg-lmhy-coral'
  'from-blue-600 to-blue-700' = 'from-lmhy-coral to-lmhy-coral-dark'
  'hover:bg-blue-800' = 'hover:bg-lmhy-coral-dark'
  'hover:bg-blue-700' = 'hover:bg-lmhy-coral-dark'
  'hover:bg-blue-600' = 'hover:bg-lmhy-coral'
  'hover:bg-blue-50' = 'hover:bg-lmhy-cream'
  'hover:bg-blue-400' = 'hover:bg-lmhy-coral-dark'
  'hover:bg-blue-100' = 'hover:bg-lmhy-coral/5'
  'bg-blue-700' = 'bg-lmhy-coral-dark'
  'bg-blue-600' = 'bg-lmhy-coral'
  'bg-blue-500' = 'bg-lmhy-coral'
  'bg-blue-100' = 'bg-lmhy-coral/10'
  'bg-blue-50' = 'bg-lmhy-coral/5'
  'text-blue-800' = 'text-lmhy-coral-dark'
  'text-blue-700' = 'text-lmhy-coral-dark'
  'text-blue-600' = 'text-lmhy-coral'
  'text-blue-500' = 'text-lmhy-coral'
  'text-blue-400' = 'text-lmhy-gold'
  'text-blue-200' = 'text-white/70'
  'text-blue-100' = 'text-white/85'
  'hover:text-blue-700' = 'hover:text-lmhy-coral-dark'
  'hover:text-blue-600' = 'hover:text-lmhy-coral'
  'border-blue-600' = 'border-lmhy-coral'
  'border-blue-300' = 'border-lmhy-coral/30'
  'hover:border-blue-300' = 'hover:border-lmhy-coral/30'
  'ring-blue-600' = 'ring-lmhy-coral'
  'focus:ring-blue-600' = 'focus:ring-lmhy-coral'
  'focus-visible:ring-blue-600' = 'focus-visible:ring-lmhy-coral'
  'bg-slate-800' = 'bg-lmhy-charcoal-light'
  'bg-slate-900' = 'bg-lmhy-charcoal'
  'text-slate-900' = 'text-lmhy-charcoal'
  'text-slate-800' = 'text-lmhy-charcoal'
  'text-slate-700' = 'text-lmhy-charcoal/80'
  'text-slate-600' = 'text-lmhy-charcoal/70'
  'text-slate-500' = 'text-lmhy-charcoal/60'
  'text-slate-400' = 'text-lmhy-charcoal/50'
  'text-slate-300' = 'text-white/70'
  'border-slate-200' = 'border-lmhy-sand/60'
  'border-slate-800' = 'border-white/10'
  'bg-slate-50' = 'bg-lmhy-sand/20'
  'hover:bg-slate-50' = 'hover:bg-lmhy-cream'
  'container mx-auto px-4' = 'lmhy-container'
  'https://heyberkshire.com' = 'https://letmehelpyourealtor.com'
  'tel:+17022221964' = 'tel:+17025001942'
  'border-slate-100' = 'border-lmhy-sand/40'
  'border-slate-300' = 'border-lmhy-sand'
  'border-slate-700' = 'border-white/10'
  'bg-slate-100' = 'bg-lmhy-sand/30'
  'hover:bg-slate-100' = 'hover:bg-lmhy-sand/40'
  'hover:bg-slate-200' = 'hover:bg-lmhy-sand/50'
  'bg-slate-700' = 'bg-lmhy-charcoal-light'
  'bg-slate-600' = 'bg-lmhy-sage'
  'hover:bg-slate-600' = 'hover:bg-lmhy-charcoal'
  'hover:bg-slate-700' = 'hover:bg-lmhy-charcoal'
  'text-blue-900' = 'text-lmhy-charcoal'
  'text-blue-300' = 'text-lmhy-sand'
  'hover:text-blue-300' = 'hover:text-lmhy-sand'
  'lg:text-6xl font-bold' = 'lg:text-6xl font-display font-bold'
  'md:text-5xl font-bold' = 'md:text-5xl font-display font-bold'
  'text-3xl font-bold' = 'text-3xl font-display font-bold'
  'text-4xl font-bold' = 'text-4xl font-display font-bold'
  'Berkshire Hathaway HomeServices Nevada Properties' = 'Let Me Help You REALTOR · Las Vegas Valley'

$count = 0
foreach ($file in $files) {
  $content = [IO.File]::ReadAllText($file.FullName)
  $original = $content
  foreach ($key in $replacements.Keys) {
    $content = $content.Replace($key, $replacements[$key])
  }
  if ($content -ne $original) {
    [IO.File]::WriteAllText($file.FullName, $content)
    $count++
  }
}
Write-Output "Updated $count files"
