import {test, expect} from '@playwright/test';
import { login } from '../../../utils/login';
import AdvanceReport4 from '../../../config_file/databrowser_json/AdvanceReport_Attributes4.json';
import { validateAttributes } from '../../../utils/validate_Attributes';
import { dragAndDropByXPath } from '../../../utils/Drag';


test('test7', async ({ page }) => {
    test.setTimeout(8 * 60 * 1000);
    //login
    await login(page, 'anssharma@ivp.in', 'ivp@123');
    //Left Menu - open Data Browser
    await page.getByTestId('menu-icon').click();
    await page.getByRole('button', { name: 'Configuration' }).click();
    await page.getByRole('button', { name: 'Reports' , exact: true}).click();
    await page.mouse.move(300, 200);
    await page.getByRole('button', { name: 'Data Browser' }).click();
    //search Report - @Advance#Report 2
    await page.locator('#ReportListSearchsearchInputIconContainer').getByRole('button').filter({ hasText: /^$/ }).click();
    await page.locator('#searchField').fill('@Advance#Report 2');
    await page.getByRole('link', { name: '@Advance#Report' }).click();
    // tab- 12345678
    await page.getByRole('button', { name: '12345678' }).click();
    await expect(page.locator('#root')).toContainText('12345678');
    // validate- columns
    await validateAttributes(page, AdvanceReport4.Attributes); //Validate columns from JSON file
    await page.getByRole('button', { name: 'Next' }).click();

    //sorting
    await page.locator('#RightColumnPanelSearchsearchInputIconContainer').click();
    await page.locator('#searchField').fill('Analyst');
    await page.getByRole('button', { name: 'Analyst' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Sort By' }).click();
    await page.getByRole('combobox').fill('ASC');
    await page.getByRole('option', { name: 'Asc' }).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    // Drag in Groups        
   const attributesToDrag = ['Custodian123'];
    const target = page.locator("//*[text()='Groups']/ancestor::div/following-sibling::div[contains(@class,'MuiBox-root')]")
    for (const attribute of attributesToDrag) {
        console.log(`🔍 Searching for attribute: ${attribute}`);
        // Search attribute in right panel
        await page.locator('#RightColumnPanelSearchsearchInputIconContainer').click();
        await page.locator('#searchField').fill(attribute);
        await expect(page.getByTestId('virtuoso-item-list')).toContainText(attribute);
        console.log(`🚀 Dragging attribute into Filters: ${attribute}`);
        const source = page.locator(
            `//div[@role='button'][.//text()[normalize-space()='${attribute}']]//div[contains(@class,'dragHandle')]`
        );
        await dragAndDropByXPath(page, source, target);
        console.log(`✅ Successfully dragged: ${attribute}`);
        await page.waitForTimeout(500); // allow re-render stability
    }
    //Grouping
    //as_of_date
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('as_of_date');
    await page.getByRole('button', { name: 'as_of_date' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Aggregation' }).click();
    await page.getByRole('combobox').fill('MAX');
    await page.getByRole('option', { name: 'MAX' }).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    //realised_price_base_mtd
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('realised_price_base_mtd');
    await page.getByRole('button', { name: 'realised_price_base_mtd', exact: true }).click();
    await page.getByRole('button', { name: 'realised_price_base_mtd', exact: true }).getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Aggregation' }).click();
    await page.getByRole('combobox').fill('SUM');
    await page.getByRole('option', { name: 'SUM', exact: true }).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    //realised_price_base_ytd
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('realised_price_base_ytd');
    await page.getByRole('button', { name: 'realised_price_base_ytd', exact: true }).click();
    await page.getByRole('button', { name: 'realised_price_base_ytd', exact: true }).getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Aggregation' }).click();
    await page.getByRole('combobox').fill('Sum');
    await page.getByRole('option', { name: 'SUM', exact: true }).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
   //unrealised_price_base_dtd
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('unrealised_price_base_dtd');
    await page.getByRole('button', { name: 'unrealised_price_base_dtd' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Aggregation' }).click();
    await page.getByRole('combobox').fill('SUM');
    await page.getByRole('option', { name: 'SUM', exact: true }).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    //unrealised_price_base_itd
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('unrealised_price_base_itd');
    await page.getByRole('button', { name: 'unrealised_price_base_itd' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Aggregation' }).click();
    await page.getByRole('combobox').fill('SUM');
    await page.getByRole('option', { name: 'SUM', exact: true }).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    // Preview
    await page.getByRole('button', { name: 'Preview' }).click();
    await expect(page.getByLabel('12345678')).toContainText('12345678');
    await expect(page.locator('[id="12345678GridId"]')).toContainText('Total Rows: 26');
   
    
});