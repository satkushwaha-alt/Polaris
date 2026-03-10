import {test, expect} from '@playwright/test';
import { login } from '../../../utils/login';
import AdvanceReport5 from '../../../config_file/databrowser_json/AdvanceReport_Attributes5.json';
import { validateAttributes } from '../../../utils/validate_Attributes';
import { dragAndDropByXPath } from '../../../utils/Drag';

test('test9',   async ({ page }) => {
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
    // tab- 213@_Tab
    await page.getByRole('button', { name: '213@_Tab' }).click();
    await expect(page.locator('#root')).toContainText('213@_Tab');
    // validate- columns
    await validateAttributes(page, AdvanceReport5.Attributes); //Validate columns from JSON file
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
   const attributesToDrag = ['Analyst', 'portfolio'];
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

    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('as_of_date');
    await page.getByRole('button', { name: 'as_of_date' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Aggregation' }).click();
    await page.getByRole('combobox').fill('Min');
    await page.getByRole('option', { name: 'MIN' }).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    // knowledge_date
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('knowledge_Date');
    await page.getByRole('button', { name: 'knowledge_date' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Aggregation' }).click();
    await page.getByRole('combobox').fill('Max');
    await page.getByRole('option', { name: 'MAX' }).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    //trade_date
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('Trade_Date');
    await page.getByRole('button', { name: 'trade_date' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Aggregation' }).click();
    await page.getByRole('combobox').fill('Count');
    await page.getByRole('option', { name: 'COUNT' }).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    //market_price_base_eod
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('market_price_base_eod');
    await page.getByRole('button', { name: 'market_price_base_eod' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Aggregation' }).click();
    await page.getByRole('combobox').fill('None');
    await page.getByRole('option', { name: 'None' }).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    //market_price_local_eod
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('market_price_local_eod');
    await page.getByRole('button', { name: 'market_price_local_eod' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Aggregation' }).click();
    await page.getByRole('combobox').fill('Min');
    await page.getByRole('option', { name: 'MIN' }).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    //  market_value_base_sod
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('market_value_base_sod');
    await page.getByRole('button', { name: 'market_value_base_sod' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Aggregation' }).click();
    await page.getByRole('combobox').fill('Max');
    await page.getByRole('option', { name: 'MAX' }).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    // MiscExpensesLocalYTD
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('MiscExpensesLocalYTD');
    await page.getByRole('button', { name: 'MiscExpensesLocalYTD' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Aggregation' }).click();
    await page.getByRole('combobox').fill('Count');
    await page.getByRole('option', { name: 'COUNT' }).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    // Total_Base_dtd
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('Total_Base_dtd');
    await page.getByRole('button', { name: 'total_base_dtd' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Aggregation' }).click();
    await page.getByRole('combobox').fill('Sum');
    await page.getByRole('option', { name: 'SUM', exact: true }).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    // Total_Base_mtd
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('Total_Base_mtd');
    await page.getByRole('button', { name: 'total_base_mtd' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Aggregation' }).click();
    await page.getByRole('combobox').fill('Average');
    await page.getByRole('option', { name: 'AVERAGE' }).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    // Total_Base_ytd
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('unrealised_price_base_mtd');
    await page.getByRole('button', { name: 'unrealised_price_base_mtd' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Aggregation' }).click();
    await page.getByRole('combobox').fill('AbsSum');
    await page.getByRole('option', { name: 'ABSSUM' }).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    //Preview

    await page.getByRole('button', { name: 'Preview' }).click();
    await expect(page.getByLabel('@_Tab')).toContainText('213@_Tab');
    await expect(page.locator('#root')).toContainText('Total Rows: 126');
    


});
