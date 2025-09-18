import { test, expect, APIRequestContext } from '@playwright/test';
import { makeApiRequest } from '../../../../utils/api-utils';
import { describe } from 'node:test';


describe('Get User APIs', () => {
test.only('Test User is Created on SSO Dashboard @smoke , @reg', async ({ request }: { request: APIRequestContext }) => {

  const response = await makeApiRequest(
    request,
    'get',
    '/api/v1/users/email/shivshakti@yopmail.com',
    { Authorization: 'SI5KPMLAtEALuPvqO-Lx5iAYoFFjGV6q2gSMtTmfctg' },
    ''
  );

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.profile.registrationSource).toBe('SSO Dashboard');
  console.log(responseBody);
})

test('Test User is Created on SSO Dashboard @reg', async ({ request }: { request: APIRequestContext }) => {

  const response = await makeApiRequest(
    request,
    'get',
    '/api/v1/users/email/shivshakti@yopmail.com',
    { Authorization: 'SI5KPMLAtEALuPvqO-Lx5iAYoFFjGV6q2gSMtTmfctg' },
    ''
  );

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.profile.registrationSource).toBe('SSO Dashboard');
  console.log(responseBody);
})
});

describe('post User APIs', () => {{


}})