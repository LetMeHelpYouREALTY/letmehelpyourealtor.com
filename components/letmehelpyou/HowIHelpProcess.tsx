import { howIHelpSteps } from "@/lib/letmehelpyou-services";

export default function HowIHelpProcess() {
  return (
    <section className="lmhy-section bg-lmhy-sand/30">
      <div className="lmhy-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="lmhy-badge mb-4">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-lmhy-charcoal mb-4">
            Let Me Help You — Step by Step
          </h2>
          <p className="text-lg text-lmhy-charcoal/70">
            No runaround. No assistant queue. You work directly with Dr. Jan Duffy from first
            call through closing and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {howIHelpSteps.map(({ step, title, description }) => (
            <div key={step} className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lmhy-coral text-white font-display font-bold text-lg mb-4">
                {step}
              </div>
              <h3 className="font-display font-bold text-lg text-lmhy-charcoal mb-2">{title}</h3>
              <p className="text-sm text-lmhy-charcoal/70 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
