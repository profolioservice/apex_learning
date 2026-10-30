import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppAction } from "@/components/ui/whatsapp-action";

export function FinalCTA() {
  return (
    <section className="section section--compact" aria-labelledby="final-cta-heading">
      <div className="container">
        <div className="cta-band">
          <div className="cta-copy"><h2 id="final-cta-heading">Your next step starts here.</h2><p>Tell us what you&apos;re preparing for, and we&apos;ll help you find the information you need.</p></div>
          <div className="cta-actions"><Link className="button button--white" href="/contact">Enquire about courses <ArrowRight aria-hidden="true" /></Link><WhatsAppAction className="button button--outline" /></div>
        </div>
      </div>
    </section>
  );
}
