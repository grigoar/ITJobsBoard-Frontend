export const TagListName = {
  TECH_SKILL: 'TECH_SKILL', // react, nodejs, python, etc.
  EXPERIENCE_LEVEL: 'EXPERIENCE_LEVEL', // junior, mid, senior, lead etc.
  COMPANY_SIZE: 'COMPANY_SIZE', // 1-10, 11-50, 51-200, etc.
  COMPANY_TYPE: 'COMPANY_TYPE', // startup, corporation, product, agency etc.
  EMPLOYMENT_TYPE: 'EMPLOYMENT_TYPE', // full-time, part-time, internship etc.
  WORK_PLACE: 'WORK_PLACE', // office, remote, hybrid etc.
  DOMAIN: 'DOMAIN', // finance, health, assurance etc.
} as const;

export type TagListNameType = (typeof TagListName)[keyof typeof TagListName];

// export const FederatedCredentialsIssuer = {
//   LOCAL: 'LOCAL',
//   GOOGLE: 'GOOGLE',
// } as const;

// export type FederatedCredentialsIssuerType =
//   (typeof FederatedCredentialsIssuer)[keyof typeof FederatedCredentialsIssuer];
