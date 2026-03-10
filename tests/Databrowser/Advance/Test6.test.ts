import { test , expect } from '@playwright/test';
import { login } from '../../../utils/login';
import AdvanceReport3 from '../../../config_file/databrowser_json/AdvanceReport_Attributes3.json';
import { validateAttributes } from '../../../utils/validate_Attributes';

test('test6',async ({ page }) => {
    test.setTimeout(5 * 60 * 1000);
    //login
    await login(page, 'anssharma@ivp.in', 'ivp@123');
    //Left Menu - open Data Browser
    // await expect(page.getByTestId('menu-icon')).toBeVisible();
    await page.getByTestId('menu-icon').click();
    await page.getByRole('button', { name: 'Configuration' }).click();  
    await page.getByRole('button', { name: 'Reports' , exact: true}).click();
    await page.mouse.move(300, 200);
    await page.getByRole('button', { name: 'Data Browser' }).click();
    //search Report - @Advance#Report 2
    await page.locator('#ReportListSearchsearchInputIconContainer').getByRole('button').filter({ hasText: /^$/ }).click();
    await page.locator('#searchField').fill('@Advance#Report 2');
    await page.getByRole('link', { name: '@Advance#Report' }).click();
    // tab- %Tab_$1
    await page.getByRole('button', { name: '%Tab_$1' }).click();
    await expect(page.locator('#root')).toContainText('%Tab_$1');
    // validate- columns
    await validateAttributes(page, AdvanceReport3.Attributes); //Validate columns from JSON file
    await page.getByRole('button', { name: 'Next' }).click();

    // Top Bottom

    await page.getByRole('checkbox').nth(1).check();
    await page.getByRole('button', { name: 'Bottom' }).click();
    await page.getByRole('spinbutton', { name: 'Value' }).click();
    await page.getByRole('spinbutton', { name: 'Value' }).fill('015');
    await page.getByRole('textbox', { name: 'Measure' }).click();
    await page.getByRole('combobox').fill('market_value_base_eod');
    await page.getByRole('option', { name: 'market_value_base_eod' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Preview' }).click();
    await expect(page.getByLabel('%Tab_$')).toContainText('%Tab_$1');
    await expect(page.locator('#root')).toContainText('Total Rows: 15');
})