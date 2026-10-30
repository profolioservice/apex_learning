"use client";

import { useMemo, useState } from "react";
import { Search, UsersRound } from "lucide-react";
import { facultyPlaceholders } from "@/data/faculty";
import { EmptyState } from "@/components/ui/empty-state";

export function FacultyDirectory() {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => facultyPlaceholders.filter((person) => `${person.subject} ${person.label}`.toLowerCase().includes(query.trim().toLowerCase())), [query]);
  return <>
    <div style={{ maxWidth: 420, marginBottom: 22 }}><label className="filter-label" htmlFor="faculty-search">Search by subject</label><div className="search-input-wrap"><Search aria-hidden="true" /><input className="input" id="faculty-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. Science, language" /></div></div>
    {matches.length ? <div className="faculty-grid" aria-live="polite">{matches.map((person) => <article className="faculty-card" key={person.id}><div className="faculty-visual"><span className="faculty-avatar"><UsersRound aria-hidden="true" /></span></div><div className="faculty-card-body"><span className="faculty-placeholder-label">Replace before production</span><h2>{person.label}</h2><div className="faculty-subject">{person.subject}</div><p>{person.note}</p><p className="faculty-placeholder-note">No real identity, degree, qualification, biography or years of experience are claimed.</p></div></article>)}</div> : <EmptyState title="No profile placeholders match" description="Try another subject, or clear your search to review the replaceable demo profiles." />}
  </>;
}
