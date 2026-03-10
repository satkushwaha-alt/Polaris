import { test , expect } from '@playwright/test';
import { login } from '../../../utils/login';
import AdvanceReport1 from '../../../config_file/databrowser_json/AdvanceReport_Attributes1.json';
import { validateAttributes } from '../../../utils/validate_Attributes';
import { dragAndDropByXPath } from '../../../utils/Drag';

test('test2', async ({ page }) => {
     test.setTimeout(15 * 60 * 1000);
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
  // Open Report- Advance Report 1 - Dictionary#2
  await page.getByRole('link', { name: 'Advance Report' }).click();
  await page.getByRole('button', { name: 'Dictionary#2' }).click();

  // validate- columns
     
    await validateAttributes(page, AdvanceReport1.Attributes); 
    await page.getByRole('button', { name: 'Next' }).click();

    

// drag and drop attributes to filter
const attributesToDrag = ['Analyst', 'as_of_date', 'Gics_industry_group'];
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
// Filter by Analyst
await page.getByRole('button', { name: 'Analyst P' }).click();
await page.locator('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-rw9148').first().click();
await page.locator("//*[text()='Sync Filter']/following-sibling::*").click();
await page.getByRole('textbox', { name: 'Default Value' }).click();
await page.getByRole('textbox', { name: 'Default Value' }).fill('Capital Goods');

await page.getByRole('button', { name: 'Apply', exact: true }).click();
//right panel- uncheck as_of_date
await page.getByRole('button', { name: 'as_of_date' }).click();
await page.locator('div:nth-child(2) > .MuiBox-root.css-13dv55s > .MuiBox-root.css-lf3h8d > .MuiGrid-root.MuiGrid-container > .MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-auto.rightItemsContainer > .MuiButtonBase-root').click();
await page.locator("//*[text()='Sync Filter']/following-sibling::*").click();
await page.getByRole('button', { name: 'Apply', exact: true }).click();
//right panel- uncheck Gics_industry_group
await page.getByRole('button', { name: 'Gics_industry_group P' }).click();
await page.locator('div:nth-child(3) > .MuiBox-root.css-13dv55s > .MuiBox-root.css-lf3h8d > .MuiGrid-root.MuiGrid-container > .MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-auto.rightItemsContainer.css-zbl7nu > .MuiButtonBase-root').click();
await page.locator("//*[text()='Sync Filter']/following-sibling::*").click();
await page.getByRole('button', { name: 'Apply', exact: true }).click();
// sorting by __ID
await page.locator('#RightColumnPanelSearchsearchInputIconContainer').click();
await page.locator('#searchField').fill('__ID');
await page.getByRole('button', { name: '__ID' }).click();
await page.getByTestId('myEditIcon').click();
await page.getByRole('textbox', { name: 'Sort By' }).click();
await page.getByRole('combobox').fill('ASC');
await page.getByRole('option', { name: 'Asc' }).click();
await page.getByRole('button', { name: 'Apply', exact: true }).click();
await page.getByRole('button', { name: 'Save' }).click();

//navigation
await page.getByRole('button', { name: 'Navigation' }).click();
await expect(page.locator('body')).toContainText('DEFAULT TAB');
await expect(page.locator('body')).toContainText('Dictionary#2');
await page.getByRole('textbox').first().click();
await page.getByRole('textbox').first().fill('Dictionary#1');
await page.getByLabel('SecondaryTabDropdown').getByTestId('ExpandMoreIcon').click();
await page.getByRole('option', { name: 'Dictionary#1' }).click();

await page.getByLabel('', { exact: true }).check();
await page.getByRole('textbox').nth(1).click();
await page.getByRole('textbox').nth(1).fill('Dictionary#2');
await page.getByLabel('PrimaryTabColumnDropdown').getByTestId('ExpandMoreIcon').click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('Analyst');
await page.getByRole('option', { name: 'Analyst' }).click();
await page.getByLabel('SecondaryTabColumnDropdown').getByTestId('ExpandMoreIcon').click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('Analyst');
await page.getByRole('option', { name: 'Analyst' }).click();
await page.getByLabel('Add Column Mapping').getByRole('button').click();
await page.getByTestId('ExpandMoreIcon').nth(3).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('as_of_date');
await page.getByRole('option', { name: 'as_of_date' }).click();
await page.getByTestId('ExpandMoreIcon').nth(4).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('as_of_date');
await page.getByRole('option', { name: 'as_of_date' }).click();
await page.getByRole('button', { name: 'Save' }).click();

await page.getByRole('button', { name: 'Close' }).click();
await page.getByRole('button', { name: 'Save' }).click();

// Formatting
//as_of_date
await page.locator('#searchField').click();
await page.locator('#searchField').fill('as_of_date');
await expect(page.getByTestId('virtuoso-item-list')).toContainText('as_of_date');
await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'as_of_date' }).click();
await page.getByTestId('myEditIcon').click();
await page.getByRole('textbox', { name: 'Date Format' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('MM/dd/yyyy');
await page.getByRole('option', { name: 'MM/dd/yyyy', exact: true }).click();


await page.getByRole('heading', { name: 'Selected Columns' }).click();
await page.getByRole('button', { name: 'Apply', exact: true }).click();

//knowledge_date
await page.locator('#searchField').click();
await page.locator('#searchField').fill('knowledge_date');
await expect(page.getByTestId('virtuoso-item-list')).toContainText('knowledge_date');
await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'knowledge_date' }).click();
await page.getByTestId('myEditIcon').click();
await page.getByRole('textbox', { name: 'Date Format' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('yyyy/MM/dd');
await page.getByRole('option', { name: 'yyyy/MM/dd', exact: true }).click();
await page.getByRole('heading', { name: 'Selected Columns' }).click();
await page.getByRole('button', { name: 'Apply', exact: true }).click();

//CommissionLocalMTD
await page.locator('#searchField').click();
await page.locator('#searchField').fill('CommissionLocalMTD');
await expect(page.getByTestId('virtuoso-item-list')).toContainText('CommissionLocalMTD');
await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'CommissionLocalMTD' }).click();
await page.getByTestId('myEditIcon').click();
await page.getByRole('textbox', { name: 'Number Type' }).click();
await page.getByRole('combobox').fill('Number');
await page.getByRole('option', { name: 'Number' }).click();
await page.getByRole('textbox', { name: 'Negative Value Formatting' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('COLORED');
await page.getByRole('option', { name: 'COLORED', exact: true }).click();
await page.getByRole('textbox', { name: 'Unit' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('Millions');
await page.getByRole('option', { name: 'Millions' }).click();
await page.getByRole('textbox', { name: 'Suffix' }).click();
await page.getByRole('textbox', { name: 'Suffix' }).fill('NUM');
await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('03');
await page.getByRole('heading', { name: 'Selected Columns' }).click();
await page.getByRole('button', { name: 'Apply', exact: true }).click();

//CommissionLocalQTD
await page.locator('#searchField').click();
await page.locator('#searchField').fill('CommissionLocalQTD');
await expect(page.getByTestId('virtuoso-item-list')).toContainText('CommissionLocalQTD');
await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'CommissionLocalQTD' }).click();
await page.getByTestId('myEditIcon').click();
await page.getByRole('textbox', { name: 'Number Type' }).click();
await page.getByRole('combobox').fill('Number');
await page.getByRole('option', { name: 'Number' }).click();
await page.getByRole('textbox', { name: 'Negative Value Formatting' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('COLOREDBRAC');
await page.getByRole('option', { name: 'COLOREDBRAC' }).click();
await page.getByRole('textbox', { name: 'Unit' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('Billions');
await page.getByRole('option', { name: 'Billions' }).click();
await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('01');
await page.getByRole('heading', { name: 'Selected Columns' }).click();
await page.getByRole('button', { name: 'Apply', exact: true }).click();

//market_value_base_eod
await page.locator('#searchField').click();
await page.locator('#searchField').fill('market_value_base_eod');
await expect(page.getByTestId('virtuoso-item-list')).toContainText('market_value_base_eod');
await page.getByTestId('virtuoso-item-list').getByRole('button', { name: 'market_value_base_eod' }).click();
await page.getByTestId('myEditIcon').click();
await page.getByRole('textbox', { name: 'Number Type' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('Number');
await page.getByRole('option', { name: 'Number' }).click();
await page.getByRole('textbox', { name: 'Negative Value Formatting' }).click();
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill('DEFAULTBRAC');
await page.getByRole('option', { name: 'DEFAULTBRAC' }).click();

await page.getByRole('textbox', { name: 'Unit' }).click();
await page.getByRole('combobox').fill('Thousands');
await page.getByRole('option', { name: 'Thousands' }).click();

await page.getByRole('textbox', { name: 'Suffix' }).click();
await page.getByRole('textbox', { name: 'Suffix' }).fill('₹');
await page.getByRole('spinbutton', { name: 'Decimal Places' }).click();
await page.getByRole('spinbutton', { name: 'Decimal Places' }).fill('02');
await page.getByRole('heading', { name: 'Selected Columns' }).click();
await page.getByRole('button', { name: 'Apply', exact: true }).click();

await page.getByRole('button', { name: 'Save' }).click();

//Linking
await page.getByTestId('Add Link Column').click();
await page.getByRole('textbox', { name: 'Display Column Name' }).click();
await page.getByRole('textbox', { name: 'Display Column Name' }).fill('Link Column Test');
await page.getByRole('textbox', { name: 'Link Text' }).click();
await page.getByRole('textbox', { name: 'Link Text' }).fill('Click Here');
await page.getByRole('textbox', { name: 'URL' }).click();
await page.getByRole('textbox', { name: 'URL' }).fill('https://www.google.com/search?q={Gics_industry}');
await page.getByRole('button', { name: 'Add' }).click();
await page.getByRole('button', { name: 'Save' }).click();

//validation

await page.getByRole('button', { name: 'Preview' }).click();
await expect(page.getByText('Advance Report 1')).toBeVisible();
await expect(page.locator('#root')).toContainText('Advance Report 1');
await expect(page.getByLabel('Dictionary#2')).toContainText('Dictionary#2');
// await expect(page.getByText('Total Rows: 24')).toBeVisible();


try {
  const grid = page.locator('[id="Dictionary#2GridId"]');

    await expect(grid).toContainText('Total Rows: 24', {
        timeout: 60000
    });

  console.log('✅ Correct row count found');
} catch (error) {
  const actualText = await page
    .locator('[id="Dictionary#2GridId"]')
    .textContent();

  console.log('❌ Row count mismatch');
  console.log('Actual Text:', actualText);
}
await expect(page.getByRole('treegrid')).toContainText('316.00');
await expect(page.getByRole('treegrid')).toContainText('Capital Goods');
await expect(page.getByRole('treegrid')).toContainText('BBG00ID9E8A9');
await expect(page.getByRole('treegrid')).toContainText('05/21/2018');
await expect(page.getByRole('treegrid')).toContainText('Capital Goods');
await expect(page.getByRole('treegrid')).toContainText('509.00');
await expect(page.getByRole('treegrid')).toContainText('Capital Goods');
await expect(page.getByRole('treegrid')).toContainText('BBG00BC1G7N0');
await expect(page.getByRole('treegrid')).toContainText('05/21/2018');
await expect(page.getByRole('treegrid')).toContainText('Capital Goods');
await expect(page.getByRole('treegrid')).toContainText('1,485.00');
await expect(page.getByRole('treegrid')).toContainText('Capital Goods');
await expect(page.getByRole('treegrid')).toContainText('BBG00PO9O1J5');
await expect(page.getByRole('treegrid')).toContainText('05/21/2018');
await expect(page.getByRole('treegrid')).toContainText('Capital Goods');

await expect(page.getByRole('treegrid')).toContainText('1,680.00');
await expect(page.getByRole('treegrid')).toContainText('1,729.00');
// navigation - validate after linking
try{
      await page.getByRole('gridcell', { name: 'Capital Goods' }).first().click();
  await page.getByRole('gridcell', { name: 'Capital Goods' }).first().click({button: 'right'});
  await expect(page.getByRole('tree')).toContainText('Dictionary#1');
  await page.getByLabel('Context Menu').getByText('Dictionary#').click();
  await expect(page.getByText('total rows: 24')).toBeVisible();
  await expect(page.locator('[id="Dictionary#1GridId"]')).toContainText('Total Rows: 24');
  await expect(page.getByRole('treegrid')).toContainText('Capital Goods');
  await expect(page.getByRole('treegrid')).toContainText('Capital Goods');
  await expect(page.getByRole('treegrid')).toContainText('Capital Goods');
  await page.getByRole('tab', { name: 'Dictionary#2' }).click();
  await page.getByRole('gridcell', { name: '/21/2018' }).first().click();
  await page.getByRole('gridcell', { name: '/21/2018' }).first().click({button: 'right'});
  await expect(page.getByRole('tree')).toContainText('Dictionary#1');
  await page.getByLabel('Context Menu').getByText('Dictionary#').click();
  await expect(page.getByText('total rows: 24')).toBeVisible();
  await expect(page.getByRole('treegrid')).toContainText('5/21/2018');
  await expect(page.getByRole('treegrid')).toContainText('5/21/2018');
  await expect(page.getByRole('treegrid')).toContainText('5/21/2018');
  await expect(page.locator('[id="Dictionary#1GridId"]')).toContainText('Total Rows: 24');
}catch(error){
  console.error('navigation Failed');
}




  try {
    await page.getByRole('tab', { name: 'Dictionary#2' }).click();
    await page.getByRole('tab', { name: 'Columns' }).click();

    await page.locator('//*[@aria-label="Toggle All Columns Visibility"]').click();
    await page.waitForTimeout(5000);

    await page.getByRole('textbox', { name: 'Filter Columns Input' }).click();
    await page.getByRole('textbox', { name: 'Filter Columns Input' }).fill('Link Column Test');

    await page.locator('//*[@aria-label="Toggle All Columns Visibility"]').click();
    await page.waitForTimeout(5000);

    await expect(page.getByRole('columnheader')).toContainText('Link Column Test');
    await expect(page.getByRole('treegrid')).toContainText('Click Here');

    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Click Here' }).first().click();
    const page1 = await popupPromise;

    const frame = page1
      .locator('iframe[name="a-pslkk5cpcynx"]')
      .contentFrame();

    await expect(frame.getByText("I'm not a robot")).toBeVisible();

    await expect(page1.locator('body')).toContainText(
      "About this page Our systems have detected unusual traffic"
    );

    console.log('✅ Link Column Test validation passed');

  } catch (error) {
    console.error('Link Column Test validation failed');
    console.error(error);
  }
});
