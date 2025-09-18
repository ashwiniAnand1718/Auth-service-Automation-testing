
interface CreateTenantData {
  TenantId: string;
  OrganizationId: string;
  DisplayName: string;
  Source: string;
}

export class CreateTenant {
  static createTenantData(tenantId: string, orgID: string, displayName: string, source: string): CreateTenantData {
    return {
      TenantId: tenantId,
      OrganizationId: orgID,
      DisplayName: displayName,
      Source: source,
    };
  }
}