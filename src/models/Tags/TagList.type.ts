export const TagListName = {
  TECH_SKILL: 'TECH_SKILL', // react, nodejs, python, etc.
  EXPERIENCE_LEVEL: 'EXPERIENCE_LEVEL', // junior, mid, senior, lead etc.
  COMPANY_SIZE: 'COMPANY_SIZE', // 1-10, 11-50, 51-200, etc.
  COMPANY_TYPE: 'COMPANY_TYPE', // startup, corporation, product, agency etc.
  EMPLOYMENT_TYPE: 'EMPLOYMENT_TYPE', // full-time, part-time, internship etc.
  WORK_PLACE: 'WORK_PLACE', // office, remote, hybrid etc.
  DOMAIN: 'DOMAIN', // finance, health, assurance etc.
  BENEFITS: 'BENEFITS', // health insurance, gym, remote work etc.
  LANGUAGE: 'LANGUAGE', // english, spanish, french, german, italian, dutch, mandarin etc.
  YEARS_EXPERIENCE: 'YEARS_EXPERIENCE', // <1 Year, 1+ Year, 2+ Years, 3+ years, 4+ Years, 5+ Years, 6+ Years, 7+ Years, 8+ Years, 9+ Years, 10+ Years etc.
  JOB_ROLE: 'JOB_ROLE', // Full-Stack Developer - DEVELOPMENT, Backend Developer - DEVELOPMENT, Frontend Developer - DEVELOPMENT, DevOps - DEVELOPMENT, Mobile Developer - DEVELOPMENT, QA Engineer - DEVELOPMENT, Data Scientist - DEVELOPMENT, Product Manager - DESIGNER, Project Manager - OPERATIONS, Scrum Master - OPERATIONS, Business Analyst - OPERATIONS, UX/UI Designer - DESIGNER, etc.
} as const;

export type TagListNameType = (typeof TagListName)[keyof typeof TagListName];

// export const FederatedCredentialsIssuer = {
//   LOCAL: 'LOCAL',
//   GOOGLE: 'GOOGLE',
// } as const;

// export type FederatedCredentialsIssuerType =
//   (typeof FederatedCredentialsIssuer)[keyof typeof FederatedCredentialsIssuer];
