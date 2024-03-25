export const FederatedCredentialsIssuer = {
  LOCAL: 'LOCAL',
  GOOGLE: 'GOOGLE',
} as const;

export type FederatedCredentialsIssuerType =
  (typeof FederatedCredentialsIssuer)[keyof typeof FederatedCredentialsIssuer];
