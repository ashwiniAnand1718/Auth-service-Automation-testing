import { chromium } from 'playwright'; // Import here, not from '@playwright/test'

export class EmailHelper {
  async getOtpFromEmail(emailAddress: string, senderEmail: string): Promise<string> {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.mailinator.com/');
    await page.getByRole('link', { name: 'Public Inbox', exact: true }).click();
    await page.getByRole('textbox', { name: 'inbox field' }).fill(emailAddress);
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'GO' }).click();

    const mailCells = page.getByRole('cell', { name: senderEmail });
    await mailCells.first().click();
    await page.waitForTimeout(5000);
    const frame = await page.locator('iframe[name="html_msg_body"]').contentFrame();
    if (!frame) throw new Error('Could not find email content frame');

    const otpText = await frame.locator('body').innerText();
    const otpValue = otpText.match(/\d{6}/)?.[0];

    await browser.close();

    if (!otpValue) {
      throw new Error('OTP not found in email content');
    }
    return otpValue;
  }
}