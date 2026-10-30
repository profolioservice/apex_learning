export const audienceFilters = [
  { id: "students", label: "School and university applicants", categoryIds: ["neet", "jee", "cuet"] },
  { id: "exam-candidates", label: "Competitive examination candidates", categoryIds: ["upsc-tnpsc", "banking-ssc-railway", "gate", "cat-mba"] },
  { id: "language-learners", label: "English proficiency learners", categoryIds: ["ielts-toefl"] },
  { id: "skills-learners", label: "Coding and IT skills learners", categoryIds: ["coding-it"] },
] as const;
