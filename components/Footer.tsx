import Link from "next/link";
import { AtlasLogoIcon } from "./AnimatedButton";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div>
            <Link href="/" className="brand">
              <span className="mark">
                <AtlasLogoIcon className="brand-logo-mark" />
              </span>
              <span className="brand-text">
                <span className="brand-name">
                  Atlas <em>One</em>
                </span>
                <span className="brand-by">by Controve</span>
              </span>
            </Link>
            <p style={{ marginTop: "14px" }}>
              A financial workspace for independent India — built so one real event updates everything that depends on
              it.
            </p>
          </div>
          <div className="foot-col">
            <h5>Product</h5>
            <Link href="/#highlights">Highlights</Link>
            <Link href="/#systems">Systems</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/#personas">Who it's for</Link>
          </div>
          <div className="foot-col">
            <h5>Systems</h5>
            <Link href="/#systems">Money In &amp; Out</Link>
            <Link href="/#systems">Tax Position</Link>
            <Link href="/#systems">Compliance</Link>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <Link href="/#cta">Waitlist</Link>
            <Link href="/#personas">For your CA</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <div className="foot-fine">
            © 2026 Atlas One by Controve. Atlas One does not file taxes or calculate final liability — it prepares the
            numbers you and your CA need.
          </div>
        </div>
      </div>
    </footer>
  );
}
