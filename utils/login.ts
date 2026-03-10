import { Page, expect } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
    try {
        await page.goto('https://li-polarisautomationqa.ivp.in/IVPDWH', {
        waitUntil: 'domcontentloaded'
    });

    const email = page.getByRole('textbox', { name: 'Email' });
    const pass = page.getByRole('textbox', { name: 'Password' });
    const submit = page.getByRole('button', { name: 'Submit' });

    // Wait until visible
    await expect(email).toBeVisible();
    await email.fill(username);

    await expect(pass).toBeVisible();
    await pass.fill(password);

    // Click only if visible
    if (await submit.isVisible()) {
      await submit.click();
    } else {
      throw new Error('Submit button not clicked');
    }

    // Wait for navigation after login
    await page.waitForLoadState('networkidle');

  } catch (error) {
    console.error('Login failed:', error);

    // Take screenshot for debugging
    // await page.screenshot({ path: 'login-error.png', fullPage: true });

    throw error; // Important: fail the test
  }
}