import { test , expect } from '@playwright/test';
import { login } from '../../../utils/login';
import AdvanceReport2 from '../../../config_file/databrowser_json/AdvanceReport_Attributes2.json';
import AdvanceReport1 from '../../../config_file/databrowser_json/AdvanceReport_Attributes1.json'
import { validateAttributes } from '../../../utils/validate_Attributes';
import { get } from 'node:http';

test('Create Config', async ({ page }) => {

    test.setTimeout(5 * 60 * 1000);
    login(page, 'satkushwaha@ivp.in', 'ivp@123');
    //Left Menu - open Data Browser
    // await expect(page.getByTestId('menu-icon')).toBeVisible();
    await page.getByTestId('menu-icon').click();
    await page.getByRole('button', { name: 'Configuration' }).click();

    await page.getByRole('button', { name: 'Reports' , exact: true}).click();
    await page.getByRole('button', { name: 'Data Browser' }).click();

    //search Report - Advance Report 1

    await page.locator('#ReportListSearchsearchInputIconContainer').getByRole('button').filter({ hasText: /^$/ }).click();
    await page.locator('#searchField').fill('Advance Report 1');
    await expect(page.getByLabel('Advance Report')).toContainText('Advance Report 1');
    // Open Report- Advance Report 
    await page.getByRole('link', { name: 'Advance Report' }).click();
    await page.getByRole('button', { name: 'Dictionary#2' }).click();
//     // validate- columns
// await page
//     .locator('#RightColumnPanelSearchsearchInputIconContainer > .MuiButtonBase-root')
//     .click();
//     for (const attribute of AdvanceReport2.Attributes) {
//   console.log(`🔍 Searching attribute: ${attribute}`);

  
  
//  await page.locator('#searchField').nth(1).click();
//  await page.locator('#searchField').nth(1).fill(attribute);
//  await page.getByRole('button', { name: attribute, exact: true }).click();
//  await page.getByRole('button', { name: attribute, exact: true }).getByTestId('myitemClose').click();
//   await page.waitForTimeout(500);

// }

await page.locator('#ItemSelectionSearchsearchInputIconContainer').click();
for (const attribute of AdvanceReport1.Attributes) {
    console.log(`🔍 Searching attribute: ${attribute}`)
    ;
    await page.locator('#searchField').first().click();
await page.locator('#searchField').first().fill(attribute);
// await page.getByText(`${attribute}String<EMPTY>${attribute}_groupStringposition pnl`).click();
await page.locator('#itemsGrid').getByText(attribute, { exact: true }).click();
}
await page.getByRole('button', { name: 'Next', exact: true }).click();
await page.getByRole('button', { name: 'Save' }).click();


});
    