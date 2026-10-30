import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/data/site";

export function WhatsAppAction({ className = "button button--outline" }: { className?: string }) {
  const url = whatsappUrl();
  return url ? (
    <a className={className} href={url} target="_blank" rel="noreferrer">
      <MessageCircle aria-hidden="true" /> Chat on WhatsApp
    </a>
  ) : (
    <span className={`${className} whatsapp-unavailable`} aria-label="WhatsApp contact is not configured">
      <MessageCircle aria-hidden="true" /> WhatsApp details pending
    </span>
  );
}
