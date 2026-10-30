import {
  Atom, BookOpen, BookOpenCheck, BriefcaseBusiness, ChartNoAxesCombined,
  CodeXml, Cog, GraduationCap, Landmark, Languages, Microscope,
} from "lucide-react";

const icons = {
  Microscope,
  Atom,
  Landmark,
  BriefcaseBusiness,
  Cog,
  ChartNoAxesCombined,
  BookOpenCheck,
  Languages,
  CodeXml,
  BookOpen,
  GraduationCap,
} as const;

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name as keyof typeof icons] ?? BookOpen;
  return <Icon className={className} aria-hidden="true" />;
}
