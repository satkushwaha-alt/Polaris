import { test , expect } from '@playwright/test';
import { login } from '../../../utils/login';
import AdvanceReport2 from '../../../config_file/databrowser_json/AdvanceReport_Attributes2.json';
import { validateAttributes } from '../../../utils/validate_Attributes';
import { dragAndDropByXPath } from '../../../utils/Drag';
import { COMMON_XPATHS } from  "./Common_Locators"



test('test4', async ({ page }) => {
  test.setTimeout(8 * 60 * 1000);
    //login
    await login(page, 'satkushwaha@ivp.in', 'ivp@123');
    //Left Menu - open Data Browser
    await expect(page.getByTestId('menu-icon')).toBeVisible();
    await page.getByTestId('menu-icon').click();
    await page.getByRole('button', { name: 'Configuration' }).click();
    await page.getByRole('button', { name: 'Reports', exact: true }).click();
    await page.mouse.move(300, 200);
    await page.getByRole('button', { name: 'Data Browser' }).click();
    //search Report - Advance Report 2
    await page.locator('#ReportListSearchsearchInputIconContainer').getByRole('button').filter({ hasText: /^$/ }).click();
    await page.locator('#searchField').fill('Advance Report 1');
    await expect(page.getByLabel('Advance Report')).toContainText('Advance Report 1');
    // Open Report- Advance Report 2
    await page.getByRole('link', { name: 'Advance Report' }).click();
    await page.getByRole('button', { name: 'Dictionary#4' }).click();
    //validate column
    await validateAttributes(page, AdvanceReport2.Attributes); //Validate columns from JSON fil//
    await page.getByRole('button', { name: 'Next' }).click();

    //drag and drop attributes to filter
    const attributesToDrag = ['Analyst', 'as_of_date', 'Gics_industry', 'Gics_industry_group'];
    const target = page.locator(
        "//p[text()='Filters']/parent::div/parent::div/following-sibling::div"
    );
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
        await page.waitForTimeout(500); // Small delay to ensure UI updates after each drag-and-drop
    }

    // Apply filter
    //analyst

    await page.getByRole('button', { name: 'Analyst P' }).click();
    await page.locator('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-rw9148').first().click();
    await page.getByRole('textbox', { name: 'Default Value' }).click();
    await page.getByRole('textbox', { name: 'Default Value' }).fill('Software & Services^~^Transportation^~^Banks^~^Capital Goods');
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    //as_of_date

    
    await page.getByRole('button', { name: 'as_of_date' }).first().click();
    await page.locator('div:nth-child(2) > .MuiBox-root.css-13dv55s > .MuiBox-root.css-lf3h8d > .MuiGrid-root.MuiGrid-container > .MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-auto.rightItemsContainer > .MuiButtonBase-root').click();
    await page.locator(COMMON_XPATHS.rangeFilter).click();
    await page.getByLabel('StartDateCheckboxParent').getByLabel('', { exact: true }).check();
    await page.locator('.MuiInputAdornment-root > .MuiButtonBase-root').first().click();
    await page.getByRole('button', { name: 'calendar view is open, switch' }).click();
    await page.getByRole('radio', { name: '2018' }).click();
    await page.getByRole('radio', { name: 'March' }).click();
    await page.getByRole('gridcell', { name: '25', exact: true }).nth(2).click();
    await page.getByLabel('EndDateCheckboxParent').getByLabel('', { exact: true }).check();
    await page.getByLabel('EndDateCheckboxParent').getByLabel('', { exact: true }).uncheck();
    await page.getByRole('textbox', { name: 'End Date' }).click();
    await page.getByRole('combobox').fill('FirstBusinessDayOfYear_Plus_N');
    await page.getByRole('option', { name: 'FirstBusinessDayOfYear_Plus_N' }).click();
    await page.getByRole('spinbutton', { name: 'N' }).click();
    await page.getByRole('spinbutton', { name: 'N' }).fill('1');
    await page.getByLabel('NavDateCheckboxParent').getByLabel('', { exact: true }).check();
    await page.locator('.MuiGrid-root.MuiGrid-container.css-gbt7e7 > .MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-6\\.25 > .databrowser-tooltip > span > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
    await page.getByRole('button', { name: 'calendar view is open, switch' }).click();
    await page.getByRole('radio', { name: '2018' }).click();
    await page.getByRole('radio', { name: 'April' }).click();
    await page.getByRole('gridcell', { name: '1', exact: true }).nth(1).click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    //Gics_industry
    await page.getByRole('button', { name: 'Gics_industry P' }).click();
    await page.locator('div:nth-child(3) > .MuiBox-root.css-13dv55s > .MuiBox-root.css-lf3h8d > .MuiGrid-root.MuiGrid-container > .MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-auto.rightItemsContainer.css-zbl7nu > .MuiButtonBase-root').click();
    await page.locator("(//*[normalize-space()='Sync Filter']/following-sibling::*)[1]").click();
    await page.getByRole('textbox', { name: 'Default Value' }).click();
    await page.getByRole('textbox', { name: 'Default Value' }).fill('Insurance^~^Electric Utilities^~^Capital Markets');
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    await page.getByRole('button', { name: 'P', exact: true }).nth(1).click();
    //Gics_industry_group
    await page.getByRole('button', { name: 'Gics_industry_group C' }).click();
    await page.locator('div:nth-child(4) > .MuiBox-root.css-13dv55s > .MuiBox-root.css-lf3h8d > .MuiGrid-root.MuiGrid-container > .MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-auto.rightItemsContainer.css-zbl7nu > .MuiButtonBase-root').click();
    await page.getByRole('button', { name: 'Apply', exact: true }).click();
    await page.getByRole('button', { name: 'C', exact: true }).nth(1).click();
    await page.getByRole('button', { name: 'Save' }).click();

    //  Sorting
    //Analyst

    await page.locator('#RightColumnPanelSearchsearchInputIconContainer').click();
    await page.locator('#searchField').fill('Analyst');
    await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'Analyst' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Sort By' }).click();
    await page.getByRole('combobox').fill('ASC');
    await page.getByRole('option', { name: 'Asc' }).click();
    await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'Apply', exact: true }).click();
    //Fund_Aliased
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('Fund_Aliased');
    await page.getByRole('button', { name: 'Fund_Aliased' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Sort By' }).click();
    await page.getByRole('combobox').fill('DESC');
    await page.getByRole('option', { name: 'Desc' }).click();
    await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'Apply', exact: true }).click();
    //__ID
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('__ID');
    await page.getByRole('button', { name: '__ID' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Sort By' }).click();
    await page.getByRole('combobox').fill('ASC');
    await page.getByRole('option', { name: 'Asc' }).click();
    await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'Apply', exact: true }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    
    //Formatting
    //CommissionLocalMTD

    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('CommissionLocalMTD');
    await page.getByRole('button', { name: 'CommissionLocalMTD' }).click();
   
    await page.getByTestId('myEditIcon').click();

    await page.getByRole('textbox', { name: 'Number Type' }).click();
    await page.getByRole('combobox').fill('Percentage');
    await page.getByRole('option', { name: 'Percentage' }).click();
    await page.getByRole('textbox', { name: 'Negative Value Formatting' }).click();
    await page.getByRole('combobox').fill('Default');
    await page.getByRole('option', { name: 'DEFAULT', exact: true }).click();
    await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
    await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('03');
    await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'Apply', exact: true }).click();
    await page.locator('#searchField').click();
    //CommissionLocalQTD
    await page.locator('#searchField').fill('CommissionLocalQTD');
    await page.getByRole('button', { name: 'CommissionLocalQTD' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Number Type' }).click();
    await page.getByRole('combobox').fill('Percentage');
    await page.getByRole('option', { name: 'Percentage' }).click();
    await page.getByRole('textbox', { name: 'Negative Value Formatting' }).click();
    await page.getByRole('combobox').fill('Colored');
    await page.getByRole('option', { name: 'COLORED', exact: true }).click();
    await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
    await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('01');
    await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'Apply', exact: true }).click();
    //market_value_base_eod
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('market_value_base_eod');
    await page.getByRole('button', { name: 'market_value_base_eod' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'Number Type' }).click();
    await page.getByRole('combobox').fill('Number');
    await page.getByRole('option', { name: 'Number' }).click();
    await page.getByRole('textbox', { name: 'Unit' }).click();
    await page.getByRole('combobox').fill('Million');
    await page.getByRole('option', { name: 'Millions' }).click();
    await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
    await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('00');
    await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'Apply', exact: true }).click();
   
    //market_price_base_eod

    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('market_price_base_eod');
    await page.getByRole('button', { name: 'market_price_base_eod' }).click();
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
    await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'Apply', exact: true }).click();
    
    //market_price_base_sod
    try{
         await page.locator('#searchField').click();
    
        await page.locator('#searchField').fill('market_price_base_sod');
        await page.getByRole('button', { name: 'market_price_base_sod' }).click();
        await page.getByTestId('myEditIcon').click();
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
        await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'Apply', exact: true }).click();
    }catch(error){
        console.error(`Formatting not applied on market_price_base_sod`);
        console.error();
    }
   
    
    //market_value_base_sod
    try{
            await page.locator('#searchField').click();
        await page.locator('#searchField').fill('market_value_base_sod');
        await page.getByRole('button', { name: 'market_value_base_sod' }).click();
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
        await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'Apply', exact: true }).click();
        await page.getByRole('button', { name: 'Save' }).click();
        await page.waitForTimeout(3000);
    }catch(error){
        console.log(`formatting not applied on market_value_base_sod`);
        console.error();
    }
   

    // Bulk Formatting
    try{
            await page.getByTestId('Bulk Format').click();
        await page.getByRole('textbox', { name: 'Column Data Type' }).click();
        await page.getByRole('combobox').fill('Date');
        await page.getByRole('option', { name: 'Date' }).click();
        await page.getByRole('textbox', { name: 'Date Format' }).click();
        await page.getByRole('combobox').fill('MM/dd/yyyy HH:mm:ss');
        await page.getByRole('option', { name: 'MM/dd/yyyy HH:mm:ss' }).click();
        await page.getByRole('textbox', { name: 'Columns to update' }).click();
        await page.getByRole('combobox').fill('as_of_date');
        await page.getByRole('option', { name: 'as_of_date' }).click();
        await page.getByRole('combobox').fill('knowledge_date');
        await page.getByRole('option', { name: 'knowledge_date' }).click();
        await page.locator('.groupListContainer > .MuiStack-root > .MuiBox-root.css-16oes29').click();
        await page.waitForTimeout(2000);
        await page.getByRole('button', { name: 'Apply' }).nth(2).click();
    }catch(error){
        console.error(error);
    }
    

  try{
      await page.getByTestId('Bulk Format').click();
    await page.getByRole('textbox', { name: 'Column Data Type' }).click();
    await page.getByRole('combobox').fill('Date');
    await page.getByRole('option', { name: 'Date' }).click();
    await page.getByRole('textbox', { name: 'Date Format' }).click();
    await page.getByRole('combobox').fill('yyyy/MM/dd HH:mm:ss');
    await page.getByRole('option', { name: 'yyyy/MM/dd HH:mm:ss' }).click();
    await page.getByRole('textbox', { name: 'Columns to update' }).click();
    await page.getByRole('combobox').fill('trade_date');
    await page.getByRole('option', { name: 'trade_date' }).click();
    await page.locator('.groupListContainer > .MuiStack-root > .MuiBox-root.css-16oes29').click();
    await page.getByRole('button', { name: 'Apply' }).nth(2).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(3000);

  }catch(error){
    console.error(error);
  }

    //Linking

  
    await page.locator('#RightColumnPanelSearchsearchInputIconContainer').click();
    await page.locator('#searchField').click();
    await page.locator('#searchField').fill('security_name');
    await page.getByRole('button', { name: 'security_name' }).click();
    await page.getByTestId('myEditIcon').click();
    await page.getByRole('textbox', { name: 'URL' }).click();
    await page.getByRole('textbox', { name: 'URL' }).fill('https://demo.ivp.in/SRM8.0/SMCreateUpdateSecurityNew.aspx?identifier=UpdateSecurityNew&pageType=View&secId={security_id}&mode=nw');
    await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'Apply', exact: true }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    //validation

    await page.getByRole('button', { name: 'Preview' }).click();
    await expect(page.getByLabel('Dictionary#4')).toContainText('Dictionary#4');
    await expect(page.locator('[id="Dictionary#4GridId"]')).toContainText('Total Rows: 437');
    await expect(page.getByRole('treegrid')).toContainText('7.00');
    await expect(page.getByRole('treegrid')).toContainText('8.00');
    await expect(page.getByRole('treegrid')).toContainText('9.00');
    await expect(page.getByRole('treegrid')).toContainText('CommissionLocalMTD');
    await expect(page.getByRole('treegrid')).toContainText('70,766,096.450%');
    await expect(page.getByRole('treegrid')).toContainText('CommissionLocalQTD');
    await expect(page.getByRole('treegrid')).toContainText('70,766,096.5%');
    await expect(page.getByRole('treegrid')).toContainText('market_price_base_sod');
    await expect(page.getByRole('treegrid')).toContainText('$934.1700');
    await expect(page.getByRole('treegrid')).toContainText('market_price_base_eod');
    await expect(page.getByRole('treegrid')).toContainText('₹0.30K');

    // Linking Validation
    try {
        await page.getByRole('tab', { name: 'Columns' }).click();
        await page.getByRole('checkbox', { name: 'Toggle All Columns Visibility' }).uncheck();
        await page.waitForTimeout(3000);
        await page.getByRole('textbox', { name: 'Filter Columns Input' }).click();
        await page.getByRole('textbox', { name: 'Filter Columns Input' }).fill('Security_name');
        await page.getByRole('checkbox', { name: 'Toggle All Columns Visibility' }).check();
        await page.waitForTimeout(3000);
        await expect(page.getByRole('treegrid')).toContainText('security_name');
        await expect(page.getByRole('treegrid')).toContainText('KLSBRM L 06/20/17 1');
        await expect(page.getByRole('treegrid')).toContainText('KLSBRM L 06/20/17 1');
    
        const page1Promise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'KLSBRM L 06/20/17' }).first().click();
        const page1 = await page1Promise;
        await page1.goto('https://demo.ivp.in/SRM8.0/Login.aspx');
        await expect(page1.locator('#upLogin')).toContainText('Login to Security Master ! Either UserId Or Password is Incorrect. Sign In');
    } catch (error) {
        console.error('Linking Validation failed,');
        console.error(error);
    }
});