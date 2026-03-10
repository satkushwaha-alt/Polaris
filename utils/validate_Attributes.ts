import { expect, Page } from '@playwright/test';

export async function validateAttributes(
  page: Page,
  columns: string[]
) {
  const root = page.locator('#root');

  for (const column of columns) {
    console.log(`Validating column: ${column}`);

    try {
      // Click search icon
      await page.locator('#RightColumnPanelSearchsearchInputIconContainer').click();

      // Locate visible search field fresh each time
      const searchField = page.locator('input#searchField:visible');

      await searchField.fill('');       
      await searchField.fill(column);

      // Wait briefly for UI update
      await page.waitForTimeout(300);

      await expect(root).toContainText(column, { timeout: 4000 });

      console.log(`✅ Passed: ${column}`);
    } catch (error) {
      console.error(`❌ Failed column: ${column}`);
      console.error(error);

      // Optional: Take screenshot for failed column
      // await page.screenshot({
      //   path: `error-${column}.png`,
      //   fullPage: true,
      // });

      // Re-throw error so test still fails properly
      throw error;
    }
  }
}