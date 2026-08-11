import { heroMockupInvoices } from "@/lib/content";

export function HeroMockup() {
  return (
    <div className="mockup-frame">
      <div className="mockup-card">
        <div className="mockup-topbar">
          <span className="tdot r" />
          <span className="tdot y" />
          <span className="tdot g" />
          <span className="tlabel caption">atlas.controve.app</span>
        </div>
        <div className="mockup-body">
          <div className="mockup-side">
            <div className="side-item active sidebar-item">
              <span className="sq" style={{ background: "var(--blue-bg)" }} />
              Invoices
            </div>
            <div className="side-item sidebar-item">
              <span className="sq" style={{ background: "var(--green-bg)" }} />
              Receipts
            </div>
            <div className="side-item sidebar-item">
              <span className="sq" style={{ background: "var(--purple-bg)" }} />
              CRM
            </div>
            <div className="side-item sidebar-item">
              <span className="sq" style={{ background: "var(--amber-bg)" }} />
              GST Ledger
            </div>
            <div className="side-item sidebar-item">
              <span className="sq" style={{ background: "var(--orange-bg)" }} />
              Bills Payable
            </div>
            <div className="side-item sidebar-item">
              <span className="sq" style={{ background: "var(--pink-bg)" }} />
              Overdue Alerts
            </div>
          </div>
          <div className="mockup-main">
            <h5>Invoices</h5>
            <div className="sub caption">4 active · updated automatically as payments land</div>
            <table className="mtable">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {heroMockupInvoices.map((inv, idx) => (
                  <tr key={idx}>
                    <td>{inv.client}</td>
                    <td>{inv.amount}</td>
                    <td>
                      <span className={`pill ${inv.type}`}>
                        <span className="d" />
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
