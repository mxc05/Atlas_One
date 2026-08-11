type PricingHeroProps = {
  annual: boolean;
  onToggleAnnual: () => void;
};

export function PricingHero({ annual, onToggleAnnual }: PricingHeroProps) {
  return (
    <section className="p-hero">
      <div className="wrap">
        <div className="eyebrow" style={{ justifyContent: "center", display: "flex" }}>
          Pricing
        </div>
        <h1>Simple pricing, for every stage of freelancing.</h1>
        <p className="lede" style={{ marginLeft: "auto", marginRight: "auto" }}>
          Start free while you're finding your feet. Upgrade when GST, tax comparisons, and a CA start entering the picture.
        </p>

        <div className="toggle-row">
          <span id="lblMonthly" className={!annual ? "on" : ""}>
            Monthly
          </span>
          <button
            className={`switch ${annual ? "annual" : ""}`}
            id="billingSwitch"
            aria-label="Toggle annual billing"
            onClick={onToggleAnnual}
          >
            <span className="knob" />
          </button>
          <span id="lblAnnual" className={annual ? "on" : ""}>
            Annual
          </span>
          <span className="save-badge">Save ~20%</span>
        </div>
      </div>
    </section>
  );
}
