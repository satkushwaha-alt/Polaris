import {test, expect} from '@playwright/test';
import { login } from '../../../utils/login';
import AdvanceReport4 from '../../../config_file/databrowser_json/AdvanceReport_Attributes4.json';
import { validateAttributes } from '../../../utils/validate_Attributes';
import { dragAndDropByXPath } from '../../../utils/Drag';
import { group } from 'node:console';

test('test8', async ({ page }) => {
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
    // tab- !@#$%^&*()<>?:"{}=
    await page.getByRole('button', { name: '!@#$%^&*()<>?:"{}=' }).click();
    await expect(page.locator('#root')).toContainText('!@#$%^&*()<>?:"{}=');
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
    //top/Bottom
    await page.getByRole('checkbox').nth(1).check();
  
    await page.getByRole('spinbutton', { name: 'Value' }).click();
    await page.getByRole('spinbutton', { name: 'Value' }).fill('018');
    await page.getByRole('textbox', { name: 'Measure' }).click();
    await page.getByRole('combobox').fill('unrealised_price_base_dtd');
    await page.getByRole('option', { name: 'unrealised_price_base_dtd' }).click();
    // Drag in Groups        
   const attributesToDrag = ['Analyst'];
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
    // Formatting

    // unrealised_price_base_dtd
    await page.locator('#RightColumnPanelSearchsearchInputIconContainer').click();
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('unrealised_price_base_dtd');
    await page.getByRole('button', { name: 'unrealised_price_base_dtd' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Number Type' }).click();
    await page.getByRole('combobox').fill('Percentage');
    await page.getByRole('option', { name: 'Percentage' }).click();
    await page.getByRole('textbox', { name: 'Negative Value Formatting' }).click();
    await page.getByRole('combobox').fill('Default');
    await page.getByRole('option', { name: 'DEFAULT', exact: true }).click();
    await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
    await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('03');
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    // unrealised_price_base_mtd
    await page.locator('#RightColumnPanelSearchsearchInputIconContainer').click();
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('unrealised_price_base_mtd');
    await page.getByRole('button', { name: 'unrealised_price_base_mtd', exact: true }).click();
    await page.getByRole('button', { name: 'unrealised_price_base_mtd', exact: true }).getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Number Type' }).click();
    await page.getByRole('combobox').fill('Percentage');
    await page.getByRole('option', { name: 'Percentage' }).click();
    await page.getByRole('textbox', { name: 'Negative Value Formatting' }).click();
    await page.getByRole('combobox').fill('COLORED');
    await page.getByRole('option', { name: 'COLORED', exact: true }).click();
     await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
    await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('01');
    await page.getByRole('button', { name: 'Apply', exact: true }).click();

    // unrealised_price_base_itd
    await page.locator('#RightColumnPanelSearchsearchInputIconContainer').click();
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('unrealised_price_base_itd');
    await page.getByRole('button', { name: 'unrealised_price_base_itd' }).click();
    await page.getByRole('button', { name: 'unrealised_price_base_itd' }).getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Number Type' }).click();
    await page.getByRole('combobox').fill('Number');
    await page.getByRole('option', { name: 'Number' }).click();
    await page.getByRole('textbox', { name: 'Negative Value Formatting' }).click();
    await page.getByRole('combobox').fill('Default');
    await page.getByRole('option', { name: 'DEFAULT', exact: true }).click();

    await page.getByRole('textbox', { name: 'Unit' }).click();
    await page.getByRole('combobox').fill('Millions');
    await page.getByRole('option', { name: 'Millions' }).click();
    await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
    await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('00');
    await page.getByRole('button', { name: 'Apply', exact: true }).click();

    //unrealised_price_base_qtd
        await page.locator('#RightColumnPanelSearchsearchInputIconContainer').click();
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('unrealised_price_base_qtd');
    await page.getByRole('button', { name: 'unrealised_price_base_qtd' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Number Type' }).click();
    await page.getByRole('combobox').fill('Currency');
    await page.getByRole('option', { name: 'Currency' }).click();
    await page.getByRole('textbox', { name: 'Negative Value Formatting' }).click();
    await page.getByRole('combobox').fill('Defaultbrac');
    await page.getByRole('option', { name: 'DEFAULTBRAC' }).click();
    await page.getByRole('textbox', { name: 'Unit' }).click();
    await page.getByRole('combobox').fill('Thousands');
    await page.getByRole('option', { name: 'Thousands' }).click();
    await page.getByRole('textbox', { name: 'Prefix' }).click();
    await page.getByRole('textbox', { name: 'Prefix' }).fill('₹');
    await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
    await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('02');
    await page.getByRole('button', { name: 'Apply', exact: true }).click();

    //unrealised_price_base_ytd
    await page.locator('#RightColumnPanelSearchsearchInputIconContainer').click();
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('unrealised_price_base_ytd');
    await page.getByRole('button', { name: 'unrealised_price_base_ytd' }).click();
    await page.getByRole('button', { name: 'unrealised_price_base_ytd' }).getByTestId('myEditIcon').click();
    
    await page.getByRole('textbox', { name: 'Number Type' }).click();
    await page.getByRole('combobox').fill('Currency');
    await page.getByRole('option', { name: 'Currency' }).click();
    await page.getByRole('textbox', { name: 'Negative Value Formatting' }).click();
    await page.getByRole('combobox').fill('Coloredbrac');
    await page.getByRole('option', { name: 'COLOREDBRAC' }).click();
    await page.getByRole('textbox', { name: 'Prefix' }).click();
    await page.getByRole('textbox', { name: 'Prefix' }).fill('$');
    await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
    await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('04');
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    // unrealised_price_local_dtd
    await page.locator('#RightColumnPanelSearchsearchInputIconContainer').click();
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('unrealised_price_local_dtd');
    await page.getByRole('button', { name: 'unrealised_price_local_dtd' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Number Type' }).click();
    await page.getByRole('combobox').fill('Currency');
    await page.getByRole('option', { name: 'Currency' }).click();
    await page.getByRole('textbox', { name: 'Negative Value Formatting' }).click();
    await page.getByRole('combobox').fill('Default');
    await page.getByRole('option', { name: 'DEFAULT', exact: true }).click();
    await page.getByRole('textbox', { name: 'Unit' }).click();
    await page.getByRole('combobox').fill('Billion');
    await page.getByRole('option', { name: 'Billions' }).click();
    await page.getByRole('textbox', { name: 'Prefix' }).click();
    await page.getByRole('textbox', { name: 'Prefix' }).fill('₹');
    await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
    await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('00');
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    // Preview

    await page.getByRole('button', { name: 'Preview' }).click();
    await expect(page.getByLabel('!@#$%^&*()<>?:"{}=')).toContainText('!@#$%^&*()<>?:"{}=');
    await expect(page.locator('[id="!#$%^()<>?:\\"{}=GridId"]')).toContainText('Total Rows: 18');
    await expect(page.getByRole('treegrid')).toContainText('i unrealised_price_base_dtd');
    await expect(page.getByRole('treegrid')).toContainText('28,454,631,510.000%');
    await expect(page.getByRole('treegrid')).toContainText('unrealised_price_base_itd');
    await expect(page.getByRole('treegrid')).toContainText('285M');
    await expect(page.getByRole('treegrid')).toContainText('unrealised_price_base_mtd');
    await expect(page.getByRole('treegrid')).toContainText('285M');
    await expect(page.getByRole('treegrid')).toContainText('unrealised_price_base_qtd');
    await expect(page.getByRole('treegrid')).toContainText('₹284,546.32K');
    await expect(page.getByRole('treegrid')).toContainText('unrealised_price_base_ytd');
    await expect(page.getByRole('treegrid')).toContainText('$284,546,315.1000');
    
    
});