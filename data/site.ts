export const siteConfig = {
  name: "Apex Learning Academy",
  shortName: "Apex Learning",
  tagline: "Learn with Clarity. Prepare with Confidence.",
  description:
    "Explore structured courses, focused learning, and guided preparation designed to help you move forward with confidence.",
  conceptNote: "A Profolio concept demo. Replace all sample academy information before launch.",
  phone: "",
  phonePlaceholder: "[INSTITUTE PHONE]",
  whatsappNumber: "",
  whatsappPlaceholder: "[WHATSAPP NUMBER]",
  email: "",
  emailPlaceholder: "[INSTITUTE EMAIL]",
  address: "",
  addressPlaceholder: "[INSTITUTE ADDRESS]",
  location: "",
  locationPlaceholder: "[Institute Location]",
  socialLinks: [] as { label: string; href: string }[],
  publicUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, ""),
  seo: {
    defaultTitle: "Apex Learning Academy | Learn with Clarity",
    titleTemplate: "%s | Apex Learning Academy",
    keywords: ["coaching courses", "exam preparation", "structured learning", "Apex Learning Academy"],
    openGraphImage: "",
  },
  colors: {
    background: "#FFFFFF",
    secondaryBackground: "#F7F8FC",
    text: "#111827",
    secondaryText: "#64748B",
    primary: "#5B35D5",
    primaryDeep: "#4520BF",
    secondary: "#8B5CF6",
    accent: "#06B6D4",
    border: "#E5E7EB",
  },
} as const;

export function whatsappUrl(message = "Hello, I would like to know more about your coaching courses.") {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "");
  if (!number) return undefined;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function telUrl() {
  const number = siteConfig.phone.replace(/[^+\d]/g, "");
  return number ? `tel:${number}` : undefined;
}

export function mailtoUrl() {
  return siteConfig.email.trim() ? `mailto:${siteConfig.email.trim()}` : undefined;
}
