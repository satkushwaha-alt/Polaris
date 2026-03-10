import { test , expect } from '@playwright/test';
import { login } from '../../../utils/login';
import AdvanceReport1 from '../../../config_file/databrowser_json/AdvanceReport_Attributes1.json';
import { validateAttributes } from '../../../utils/validate_Attributes';

test('test1', async ({ page }) => {
  test.setTimeout(5 * 60 * 1000);
  //login
  await login(page, 'satkushwaha@ivp.in', 'ivp@123');
  //Left Menu - open Data Browser
  await expect(page.getByTestId('menu-icon')).toBeVisible();
  await page.getByTestId('menu-icon').click();
  
  await page.getByRole('button', { name: 'Configuration' }).click();
  await page.getByRole('button', { name: 'Reports' , exact: true}).click();
  await page.mouse.move(300, 200);
  await page.getByRole('button', { name: 'Data Browser' }).click();
  //search Report - Advance Report 1
  await page.locator('#ReportListSearchsearchInputIconContainer').getByRole('button').filter({ hasText: /^$/ }).click();
  await page.locator('#searchField').fill('Advance Report 1');
  await expect(page.getByLabel('Advance Report')).toContainText('Advance Report 1');
  // Open Report- Advance Report 1
  await page.getByRole('link', { name: 'Advance Report' }).click();
  await page.getByRole('button', { name: 'Dictionary#1' }).click();

  // validate- columns 
   //Fucntion call to validate columns from JSON file
  //  await page.locator('#RightColumnPanelSearchsearchInputIconContainer').click();
  //  await page.locator('#RightColumnPanelSearchsearchInputIconContainer > .MuiButtonBase-root').click();
  //  await page.locator('#searchField').nth(1).fill('__ID');
  //  await expect(page.locator('#root')).toContainText('__ID');
  //  await page.locator('#searchField').nth(1).click();
  //  await page.locator('#searchField').nth(1).fill('ANALYST');
  //  await expect(page.locator('#root')).toContainText('Analyst');
  await validateAttributes(page, AdvanceReport1.Attributes); //Validate columns from JSON file
  await page.getByRole('button', { name: 'Next' }).click();
  
  // Apply Sorting

  
 await page.locator('#RightColumnPanelSearchsearchInputIconContainer').click();
  await page.locator('#searchField').fill('__ID');


  await page.getByRole('button', { name: '__ID' }).click();
  await page.getByTestId('myEditIcon').click();

  await page.getByRole('textbox', { name: 'Sort By' }).click();
  
  await page.getByRole('combobox').fill('ASC');
  await page.getByRole('option', { name: 'Asc' }).click();
  await page.getByRole('button', { name: 'Apply', exact: true }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Preview' }).click();
  
 
// Validate Rows
  const grid = page.locator('[id="Dictionary#1GridId"]');
  await expect(grid).toBeVisible();

  await expect(grid).toContainText('Total Rows: 50,000');
  await expect(grid).toContainText('50,000');

  // validate sorting columns - __ID

  await expect(page.getByRole('treegrid')).toContainText('__ID');
 
  await expect(page.getByRole('treegrid')).toContainText('1.00');
  await expect(page.getByRole('treegrid')).toContainText('2.00');
  await expect(page.getByRole('treegrid')).toContainText('3.00');
  await page.locator('.ag-icon.ag-icon-menu-alt').first().click();
  // validate values in descending order
  await page.getByText('Sort Descending').click();
  await expect(page.getByRole('treegrid')).toContainText('59,438.00');
  await expect(page.getByRole('treegrid')).toContainText('59,437.00');
  await expect(page.getByRole('treegrid')).toContainText('59,436.00');

 

});
