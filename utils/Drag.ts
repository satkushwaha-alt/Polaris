import { Page, Locator } from '@playwright/test';

export async function dragAndDropByXPath(
  page: Page,
  source: Locator,
  target: Locator
): Promise<void> {

  await source.scrollIntoViewIfNeeded();
  await target.scrollIntoViewIfNeeded();

  await source.waitFor({ state: 'visible' });
  await target.waitFor({ state: 'visible' });

  const sourceBox = await source.boundingBox();
  const targetBox = await target.boundingBox();

  if (!sourceBox || !targetBox) {
    throw new Error('Source or Target not found');
  }

  // Move to source
  await page.mouse.move(
    sourceBox.x + sourceBox.width / 2,
    sourceBox.y + sourceBox.height / 2
  );

  await page.waitForTimeout(200);

  await page.mouse.down();

  // Slow move to target (React safe)
  await page.mouse.move(
    targetBox.x + 30,
    targetBox.y + 20,
    { steps: 40 }
  );

  await page.waitForTimeout(300);

  await page.mouse.up();

  // Wait for React re-render
  await page.waitForTimeout(500);
}