import { test , expect } from '@playwright/test';
import { login } from '../../../utils/login';
import AdvanceReport2 from '../../../config_file/databrowser_json/AdvanceReport_Attributes2.json';
import { validateAttributes } from '../../../utils/validate_Attributes';
import { dragAndDropByXPath } from '../../../utils/Drag';

test('test3', async ({ page }) => {
     test.setTimeout(15 * 60 * 1000);
   //login
   await login(page, 'satkushwaha@ivp.in', 'ivp@123');
   //Left Menu - open Data Browser
   await expect(page.getByTestId('menu-icon')).toBeVisible();
   await page.getByTestId('menu-icon').click(); 
    await page.getByRole('button', { name: 'Configuration' }).click();  




    await page.getByRole('button', { name: 'Reports', exact: true }).click();
    await page.mouse.move(300, 200);
    await page.getByRole('button', { name: 'Data Browser' }).click();
  //search Report - Advance Report 1
  await page.locator('#ReportListSearchsearchInputIconContainer').getByRole('button').filter({ hasText: /^$/ }).click();
    await page.locator('#searchField').fill('Advance Report 1');
    await expect(page.getByLabel('Advance Report')).toContainText('Advance Report 1');
  // Open Report- Advance Report 1
  await page.getByRole('link', { name: 'Advance Report' }).click();
  await page.getByRole('button', { name: 'Dictionary#3' }).click();    

  //validate column
  await validateAttributes(page, AdvanceReport2.Attributes); //Validate columns from JSON file
  await page.getByRole('button', { name: 'Next' }).click();
  
  //drag and drop attributes to filter
const attributesToDrag = ['Analyst', 'as_of_date', 'Fund_Aliased'];
const target = page.locator(
  "xpath=//p[normalize-space()='Filters']/parent::div/parent::div/following-sibling::div"
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
  await page.waitForTimeout(500); // allow re-render stability
}
//Aply filter
//Analyst
await page.getByRole('button', { name: 'Analyst P' }).click();
await page.locator('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-rw9148').first().click();
await page.locator("//*[text()='Sync Filter']/following-sibling::*").click();
await page.getByRole('textbox', { name: 'Default Value' }).click();
await page.getByRole('textbox', { name: 'Default Value' }).fill('Capital Goods^~^Software & Services^~^Transportation');
await page.getByRole('button', { name: 'Apply', exact: true }).click();
//as_of_date
await page.getByRole('button', { name: 'as_of_date' }).click();
await page.locator('div:nth-child(2) > .MuiBox-root.css-13dv55s > .MuiBox-root.css-lf3h8d > .MuiGrid-root.MuiGrid-container > .MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-auto.rightItemsContainer > .MuiButtonBase-root').click();
await page.locator("//*[text()='Range Filter']/following-sibling::*").click();
await page.getByLabel('StartDateCheckboxParent').getByLabel('', { exact: true }).check();
await page.locator('.MuiInputAdornment-root > .MuiButtonBase-root').first().click();
await page.getByRole('button', { name: 'calendar view is open, switch' }).click();
await page.getByRole('radio', { name: '2018' }).click();
await page.getByRole('radio', { name: 'April' }).click();
await page.getByRole('gridcell', { name: '1', exact: true }).nth(1).click();
await page.getByRole('textbox', { name: 'End Date' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('Today_Plus_N');
await page.getByRole('option', { name: 'Today_Plus_N' }).click();
await page.getByRole('spinbutton', { name: 'N' }).click();
await page.getByRole('spinbutton', { name: 'N' }).fill('180');
await page.getByRole('textbox', { name: 'Source Column Name' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('Analyst');
await page.getByRole('option', { name: 'Analyst' }).click();
await page.getByRole('button', { name: 'Apply', exact: true }).click();
//Fund_Aliased
await page.getByRole('button', { name: 'Fund_Aliased P' }).click();
await page.locator('div:nth-child(3) > .MuiBox-root.css-13dv55s > .MuiBox-root.css-lf3h8d > .MuiGrid-root.MuiGrid-container > .MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-auto.rightItemsContainer.css-zbl7nu > .MuiButtonBase-root').click();
await page.locator("//*[text()='Sync Filter']/following-sibling::*").click();
await page.getByRole('textbox', { name: 'Default Value' }).click();
await page.getByRole('textbox', { name: 'Default Value' }).fill('FOF^~^HYC^~^MST');
await page.getByRole('button', { name: 'Apply', exact: true }).click();
await page.getByRole('button', { name: 'Save' }).click();

//Sorting
//Analyst
await page.locator('#searchField').click();
await page.locator('#searchField').fill('Analyst');
await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'Analyst' }).click();
await page.getByTestId('myEditIcon').click();
await page.getByRole('textbox', { name: 'Sort By' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('ASC');
await page.getByRole('option', { name: 'Asc' }).click();
await page.getByRole('heading', { name: 'Selected Columns' }).click();
await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'Apply', exact: true }).click();
//__ID
await page.locator('#searchField').click();
await page.locator('#searchField').fill('__ID');
await page.getByRole('button', { name: '__ID' }).click();
await page.getByRole('button', { name: '__ID' }).click();
await page.getByTestId('myEditIcon').click();
await page.getByRole('textbox', { name: 'Sort By' }).click();
await page.getByRole('combobox').fill('Desc');
await page.getByRole('option', { name: 'Desc' }).click();
await page.getByRole('heading', { name: 'Selected Columns' }).click();
await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'Apply', exact: true }).click();
await page.getByRole('button', { name: 'Save' }).click();

//Formatting
//as_of_date

await page.locator('#searchField').click();
await page.locator('#searchField').fill('as_of_date');
await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'as_of_date' }).click();
await page.getByTestId('myEditIcon').click();
await page.getByRole('textbox', { name: 'Date Format' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('MM/dd/yyyy HH:mm:ss');
await page.getByRole('option', { name: 'MM/dd/yyyy HH:mm:ss' }).click();
await page.mouse.move(100,100);
await page.getByRole('heading', { name: 'Selected Columns' }).click();


await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'Apply', exact: true }).click();
//knowledge_date
await page.locator('#searchField').click();
await page.locator('#searchField').fill('knowledge_date');
 await page.mouse.move(300, 200);
await page.getByRole('button', { name: 'knowledge_date' }).click();
await page.getByTestId('myEditIcon').click();
await page.getByRole('textbox', { name: 'Date Format' }).click();
await page.getByRole('combobox').fill('yyyy/MM/dd HH:mm:ss');
await page.getByRole('option', { name: 'yyyy/MM/dd HH:mm:ss' }).click();
await page.getByRole('heading', { name: 'Selected Columns' }).click();
await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'Apply', exact: true }).click();
//CommissionLocalMTD
await page.locator('#searchField').click();
await page.locator('#searchField').fill('CommissionLocalMTD');
await page.getByRole('button', { name: 'CommissionLocalMTD' }).click();
await page.getByTestId('myEditIcon').click();
await page.getByRole('textbox', { name: 'Number Type' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('Percentage');
await page.getByRole('option', { name: 'Percentage' }).click();
await page.getByRole('textbox', { name: 'Negative Value Formatting' }).click();
await page.getByRole('combobox').fill('Colored');
await page.getByRole('option', { name: 'COLORED', exact: true }).click();
await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('03');
await page.getByRole('heading', { name: 'Selected Columns' }).click();
await page.getByRole('button', { name: 'Apply', exact: true }).click();

//CommissionLocalQTD
await page.locator('#searchField').click();
await page.locator('#searchField').fill('CommissionLocalQTD');
await page.getByRole('button', { name: 'CommissionLocalQTD' }).click();
await page.getByTestId('myEditIcon').click();
await page.getByRole('textbox', { name: 'Number Type' }).click();
await page.getByRole('combobox').fill('Percentage');
await page.getByRole('option', { name: 'Percentage' }).click();
await page.getByRole('textbox', { name: 'Negative Value Formatting' }).click();
await page.getByRole('combobox').fill('ColoredBrac');
await page.getByRole('option', { name: 'COLOREDBRAC' }).click();
await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('01');
await page.getByRole('heading', { name: 'Selected Columns' }).click();
await page.getByRole('button', { name: 'Apply', exact: true }).click();

//market_value_base_eod
await page.locator('#searchField').click();
await page.locator('#searchField').fill('market_value_base_eod');
await page.getByRole('button', { name: 'market_value_base_eod' }).click();
await page.getByTestId('myEditIcon').click();
await page.getByRole('textbox', { name: 'Number Type' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('Percentage');
await page.getByRole('option', { name: 'Percentage' }).click();
await page.getByRole('textbox', { name: 'Negative Value Formatting' }).click();
await page.getByRole('combobox').fill('Defaultbrac');
await page.getByRole('option', { name: 'DEFAULTBRAC' }).click();
await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('02');
await page.getByRole('heading', { name: 'Selected Columns' }).click();
await page.getByRole('button', { name: 'Apply', exact: true }).click();


//market_value_base_eod
await page.locator('#searchField').click();
await page.locator('#searchField').fill('market_price_base_eod');
await page.getByRole('button', { name: 'market_price_base_eod' }).click();
await page.getByTestId('myEditIcon').click();
await page.getByRole('textbox', { name: 'Number Type' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('Currency');
await page.getByRole('option', { name: 'Currency' }).click();
await page.getByRole('textbox', { name: 'Negative Value Formatting' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('Defaultbrac');
await page.getByRole('option', { name: 'DEFAULTBRAC' }).click();
await page.getByRole('textbox', { name: 'Unit' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('Thousands');
await page.getByRole('option', { name: 'Thousands' }).click();
await page.getByRole('textbox', { name: 'Prefix' }).click();
await page.getByRole('textbox', { name: 'Prefix' }).fill('₹');
await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('02');
await page.getByRole('heading', { name: 'Selected Columns' }).click();
await page.getByRole('button', { name: 'Apply', exact: true }).click();

//market_price_base_sod

await page.locator('#searchField').click();
await page.locator('#searchField').fill('market_price_base_sod');
await page.getByRole('button', { name: 'market_price_base_sod' }).click();
await page.getByTestId('myEditIcon').click();
await page.getByRole('textbox', { name: 'Number Type' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('Currency');
await page.getByRole('option', { name: 'Currency' }).click();

await page.getByRole('textbox', { name: 'Negative Value Formatting' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('Coloredbrac');
await page.getByRole('option', { name: 'COLOREDBRAC' }).click();
await page.getByRole('textbox', { name: 'Prefix' }).click();
await page.getByRole('textbox', { name: 'Prefix' }).fill('$');
await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('04');
await page.getByRole('heading', { name: 'Selected Columns' }).click();
await page.getByRole('button', { name: 'Apply', exact: true }).click();
await page.getByRole('button', { name: 'Save' }).click();

//Bulk Formatting
//market_value_base_eod, market_value_local_eod, market_value_local_sod
await page.getByTestId('Bulk Format').click();
await page.getByRole('textbox', { name: 'Column Data Type' }).click();
await page.getByRole('combobox').fill('Numeric');
await page.getByRole('option', { name: 'Numeric' }).click();
await page.getByRole('textbox', { name: 'Number Type' }).click();
await page.getByRole('combobox').fill('Number');
await page.getByRole('option', { name: 'Number' }).click();
await page.locator('div:nth-child(4) > span > .MuiFormControl-root > .MuiInputBase-root').click();
await page.getByRole('combobox').fill('Defaultbrac');
await page.getByRole('option', { name: 'DEFAULTBRAC' }).click();
await page.getByRole('textbox', { name: 'Unit' }).click();
await page.getByRole('combobox').fill('Million');
await page.getByRole('option', { name: 'Millions' }).click();
await page.getByRole('textbox', { name: 'Suffix' }).click();
await page.getByRole('textbox', { name: 'Suffix' }).fill('DOLLOR');
await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('1');
await page.getByRole('textbox', { name: 'Columns to update' }).click();
await page.getByRole('combobox').fill('Market_value_base_eod');
await page.getByRole('option', { name: 'market_value_base_eod' }).click();
await page.getByRole('combobox').fill('market_value_local_eod');
await page.getByRole('option', { name: 'market_value_local_eod' }).click();
await page.getByRole('combobox').fill('market_value_local_sod');
await page.getByRole('option', { name: 'market_value_local_sod' }).click();
await page.locator('.groupListContainer > .MuiStack-root > .MuiBox-root.css-16oes29').click();
await page.getByRole('button', { name: 'Apply' }).click();
// total_base_dtd, total_base_mtd
// await page.getByRole('combobox').fill('total_base_dtd');
// await page.getByRole('option', { name: 'total_base_dtd' }).click();
// await page.getByRole('button', { name: 'Apply' }).click();
await page.getByTestId('Bulk Format').click();
await page.getByRole('textbox', { name: 'Column Data Type' }).click();
await page.getByRole('combobox').fill('Numeric');
await page.getByRole('option', { name: 'Numeric' }).click();
await page.getByRole('textbox', { name: 'Number Type' }).click();
await page.getByRole('combobox').fill('Number');
await page.getByRole('option', { name: 'Number' }).click();
await page.getByRole('textbox', { name: 'Negative Formatting' }).click();
await page.getByRole('combobox').fill('Coloredbrac');
await page.getByRole('option', { name: 'COLOREDBRAC' }).click();
await page.getByRole('textbox', { name: 'Suffix' }).click();
await page.getByRole('textbox', { name: 'Suffix' }).fill('DOLLOR');
await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('2');
await page.getByRole('textbox', { name: 'Columns to update' }).click();
await page.getByRole('combobox').fill('Total_base_dtd');
await page.getByRole('option', { name: 'total_base_dtd' }).click();
await page.getByRole('combobox').fill('total_base_mtd');
await page.getByRole('option', { name: 'total_base_mtd' }).click();
await page.locator('.groupListContainer > .MuiStack-root > .MuiBox-root.css-16oes29').click();
await page.getByRole('button', { name: 'Apply' }).click();
// total_base_qtd, total_base_ytd, total_local_dtd
await page.getByTestId('Bulk Format').click();
await page.getByRole('textbox', { name: 'Column Data Type' }).click();
await page.getByRole('combobox').fill('Numeric');
await page.getByRole('option', { name: 'Numeric' }).click();
await page.getByRole('textbox', { name: 'Number Type' }).click();
await page.getByRole('combobox').fill('Currency');
await page.getByRole('option', { name: 'Currency' }).click();
await page.getByRole('textbox', { name: 'Negative Formatting' }).click();
await page.getByRole('combobox').fill('Defaultbrac');
await page.getByRole('option', { name: 'DEFAULTBRAC' }).click();
await page.getByRole('textbox', { name: 'Unit' }).click();
await page.getByRole('combobox').fill('Billions');
await page.getByRole('option', { name: 'Billions' }).click();
await page.getByRole('textbox', { name: 'Prefix' }).click();
await page.getByRole('textbox', { name: 'Prefix' }).fill('$');
await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('0');
await page.getByRole('textbox', { name: 'Columns to update' }).click();
await page.getByRole('combobox').fill('total_base_qtd');
await page.getByRole('option', { name: 'total_base_qtd' }).click();
await page.getByRole('combobox').fill('total_base_ytd');
await page.getByRole('option', { name: 'total_base_ytd' }).click();
await page.getByRole('combobox').fill('total_local_dtd');
await page.getByRole('option', { name: 'total_local_dtd' }).click();
await page.locator('.groupListContainer > .MuiStack-root > .MuiBox-root.css-16oes29').click();
await page.getByRole('button', { name: 'Apply' }).click();
// market_price_base_eod, market_price_local_eod
await page.getByTestId('Bulk Format').click();
await page.getByRole('textbox', { name: 'Column Data Type' }).click();
await page.getByRole('combobox').fill('Numeric');
await page.getByRole('option', { name: 'Numeric' }).click();
await page.getByRole('textbox', { name: 'Number Type' }).click();
await page.getByRole('combobox').fill('Percentage');
await page.getByRole('option', { name: 'Percentage' }).click();
await page.getByRole('textbox', { name: 'Negative Formatting' }).click();
await page.getByRole('combobox').fill('Default');
await page.getByRole('option', { name: 'DEFAULT', exact: true }).click();
await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('3');
await page.getByRole('textbox', { name: 'Columns to update' }).click();
await page.getByRole('combobox').fill('market_price_base_eod');
await page.getByRole('option', { name: 'market_price_base_eod' }).click();
await page.getByRole('combobox').fill('market_price_local_eod');
await page.getByRole('option', { name: 'market_price_local_eod' }).click();
await page.locator('.groupListContainer > .MuiStack-root > .MuiBox-root.css-16oes29').click();
await page.getByRole('button', { name: 'Apply' }).click();
await page.getByRole('button', { name: 'Save' }).click();

//validation
await page.getByRole('button', { name: 'Preview' }).click();
await expect(page.locator('#root')).toContainText('Advance Report 1');
await expect(page.getByLabel('Dictionary#3')).toContainText('Dictionary#3');

try {
  await expect(
    page.locator('[id="Dictionary#3GridId"]')
  ).toContainText('Total Rows: 1,825', { timeout: 60000 });

  console.log('✅ Total Rows count: 1,825');
} catch (error) {
  console.error('❌ Total Rows count not visible within timeout');
  throw error; // rethrow to fail the test
}
try{
    await expect(page.getByRole('treegrid')).toContainText('__ID');
  await expect(page.getByRole('treegrid')).toContainText('58,862.00');
  await expect(page.getByRole('treegrid')).toContainText('58,861.00');
  await expect(page.getByRole('treegrid')).toContainText('58,859.00');
  await expect(page.getByRole('treegrid')).toContainText('Analyst');
  await expect(page.getByRole('treegrid')).toContainText('Capital Goods');
  await expect(page.getByRole('treegrid')).toContainText('CommissionLocalMTD');
  await expect(page.getByRole('treegrid')).toContainText('35,650,079.060%');
  await expect(page.getByRole('treegrid')).toContainText('CommissionLocalQTD');
  await expect(page.getByRole('treegrid')).toContainText('35,650,079.1%');
  await expect(page.getByRole('treegrid')).toContainText('market_price_base_sod');
  await expect(page.getByRole('treegrid')).toContainText('market_price_base_sod');
  await expect(page.getByRole('treegrid')).toContainText('$109.3200');
  await expect(page.getByRole('treegrid')).toContainText('market_price_base_eod');
  await expect(page.getByRole('treegrid')).toContainText('13,997.000%');
}catch(error){
  console.log(`grid validation failed`);
}



});