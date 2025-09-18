import { test, expect, APIRequestContext } from '@playwright/test';
import { makeApiRequest } from '../../../../utils/api-utils';
import { describe } from 'node:test';
import { CreateTenant } from '../../../../fixtures/test-data/api-test-data/create-tenant';


describe('Create Tenant APIs', () => {
test('createTenant @reg', async ({ request }: { request: APIRequestContext }) => {

  const tenantData = CreateTenant.createTenantData('tenant-123', 'org-123', 'Test Tenant', 'SSO Dashboard');
  const response = await makeApiRequest(
    request,
    'post',
    '/api/v1/tenants',
    { Authorization: 'SI5KPMLAtEALuPvqO-Lx5iAYoFFjGV6q2gSMtTmfctg' },
    JSON.stringify(tenantData)
  );

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.profile.registrationSource).toBe('SSO Dashboard');
  console.log(responseBody);
})
});