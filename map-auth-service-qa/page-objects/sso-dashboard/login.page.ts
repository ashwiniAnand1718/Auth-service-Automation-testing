import { Page, Locator } from '@playwright/test';
import { URLS } from '../../config/urls';
import { MoodysAnalyticsPage } from './moodysAnalytics.page';
import { EmailHelper } from '../../utils/ui-utils';

export class LoginPage {
  public page: Page;
  public moodysLogo: Locator;
  public inputEmail: Locator;
  public inputPassword: Locator;
  public submitButton: Locator;
  public LoginIcon: Locator;
  public otpInput: Locator;
  public mfaSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.moodysLogo = this.page.locator('img[alt="Moody\'s"]');
    this.inputEmail = this.page.locator('input[type="email"]');
    this.inputPassword = this.page.locator('input[name="password"]');
    this.submitButton = this.page.locator('button[type="submit"]');
    this.LoginIcon = this.page.locator('div#app > div.v-application--wrap > header > div > div.my-2 > button');
    this.otpInput=this.page.locator('#«r0»-emailOtp');
    this.mfaSubmitButton=this.page.locator('#mfa-email-submit-btn');
  }

  async navigate() {
    await this.page.goto(URLS.npe_ui);
  }
  
  async login(username: string, password: string) {
    await this.moodysLogo.isVisible();
    console.log('Moody\'s logo is visible');
    await this.inputEmail.fill(username);
    console.log('Email Entered: ' + username);
    await this.submitButton.click();
    //await this.page.waitForSelector('input[name="password"]', { timeout: 5000 });
    await this.inputPassword.fill(password);
    await this.submitButton.click();
    //Getting otp
    const emailHelper = new EmailHelper();
    const otpValue = await emailHelper.getOtpFromEmail(username, 'idm-no-reply@moodys.com');
    console.log("Value of otp is:", otpValue);

    await this.page.getByRole('heading', { name: 'Check your email' }).click();
    await this.otpInput.click();
    await this.otpInput.fill(otpValue);
    await this.mfaSubmitButton.click();

    //await this.page.getByRole('heading', { name: 'Terms of Use' }).click();
    //await this.page.getByText('I agree to the Moody\'s Terms').click();

    //const page1Promise = this.page.waitForEvent('popup');
    //await this.page.getByRole('link', { name: 'View the Terms of Use.' }).click();
    //const page1 = await page1Promise;
    //const page2Promise = this.page.waitForEvent('popup');
    //await this.page.getByRole('link', { name: 'View the Terms of Use.' }).click();
    //const page2 = await page2Promise;
    //await this.page.getByRole('checkbox', { name: 'I agree to the Moody\'s Terms' }).click();
    //await this.page.getByRole('button', { name: 'Submit' }).click();

    await this.LoginIcon.hover();
    await this.page.waitForTimeout(3000);
    await this.page.getByText(username).isVisible();
    await this.page.getByRole('heading', { name: 'Check your email' }).isVisible();
    //const moodysAnalyticsPage = new MoodysAnalyticsPage(this.page);
    //await moodysAnalyticsPage.searchApplicationDropDown.isVisible();
    console.log("Page is landed successfully after login to accounts.moodysanalytics");
  }
}