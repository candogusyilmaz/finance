export type PartyRole = 'INDIVIDUAL' | 'ORGANIZATION' | 'SUPPLIER' | 'AFFILIATE';

export const PartyRoles: Readonly<Record<PartyRole, PartyRole>> = {
  INDIVIDUAL: 'INDIVIDUAL',
  ORGANIZATION: 'ORGANIZATION',
  SUPPLIER: 'SUPPLIER',
  AFFILIATE: 'AFFILIATE'
};
