import { Page, Locator, expect } from '@playwright/test';

export class MoodysAnalyticsPage {
  private page: Page;
  public searchApplicationDropDown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchApplicationDropDown = this.page.locator('div[role="combobox"]');
  }
}