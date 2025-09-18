import { loadCredentials } from '../../../../utils/auth-utils';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../../page-objects/sso-dashboard/login.page';

let loginPage: LoginPage;
let credentials = loadCredentials();

test.describe('All Login Scenarios', () => {

test.beforeAll(async ({ }) => {
  credentials = loadCredentials();
});

test.beforeEach(async ({ page }) => {
   loginPage = new LoginPage(page);
  await loginPage.navigate();
  //await page.goto('https://www.mailinator.com/');
});

test.skip('Login to the SSO Dashboard application with Existing User @reg, @smoke', async ({ page }) => {
  console.log("Running: Login to the SSO Dashboard application with Existing User");
  await loginPage.login( credentials.username, credentials.password);
  console.log("Successfully completed: Login to the SSO Dashboard application with Existing User");
  await page.getByRole('button', { name: 'Logout' }).click();
  await page.locator('div').filter({ hasText: /^Email$/ }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  console.log("Successfully logged out from the SSO Dashboard application");
});

test.only('Change Password SSO Dashboard @reg, @smoke', async ({ page,context }) => {
 
  console.log("Running: Change Password SSO Dashboard");
  await loginPage.login(credentials.username, credentials.password);
  //await page.pause();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Account Settings' }).click();

  const page1 = await page1Promise;
  await page1.goto('https://account.map-npe.moodys.com/profile');
  await page1.getByRole('link', { name: 'Change Password' }).click();
  await page1.getByRole('heading', { name: 'Change Password' }).click();
await page1.pause();
//#headlessui-control-«r0»
  await page1.getByRole('textbox', { name: 'Current password' }).click();
  await page1.getByRole('textbox', { name: 'Current password' }).fill('Shiv@12345678901235');
  //#headlessui-control-«r3»
  await page1.getByRole('textbox', { name: 'New password' }).click();
  await page1.getByRole('textbox', { name: 'New password' }).fill('Shiv@12345678901236');
  //#headlessui-control-«r6»
  await page1.getByRole('textbox', { name: 'Confirm password' }).click();
  await page1.getByRole('textbox', { name: 'Confirm password' }).fill('Shiv@12345678901236');
  await page1.pause();
  ////*[@id="change-password-form"]/button/text()
  await page1.getByRole('button', { name: 'Change Password' }).click();
  await page1.getByRole('heading', { name: 'Test Automation' }).click();
  await page1.getByText('Your password has been successfully updated.').click();
  console.log("Successfully completed: Change Password SSO Dashboard");
});

test.skip('Change Password SSO Dashboard1 @reg, @smoke', async ({ page,context }) => {
  await context.tracing.start({ screenshots: true, snapshots: true });
  await loginPage.login(credentials.username, credentials.password);
  await context.tracing.stop({ path: 'trace.zip' });
});

});