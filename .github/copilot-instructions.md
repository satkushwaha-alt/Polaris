# Polaris Playwright Test Automation - AI Coding Instructions

## Project Overview
This is a **Playwright-based end-to-end test automation framework** for the Polaris/IVP Data Warehouse application. Tests target a web-based QA environment and validate configuration, performance metrics, and user workflows through the UI.

**Key Stack**: Playwright 1.58.2, TypeScript, CommonJS

## Architecture & Patterns

### Test Structure
- **Test Directory**: `tests/` contains all test files
- **Common Methods**: `Commom_Method.ts` (note: intentional typo in codebase) houses reusable test logic
- **Data Utilities**: `Databrowser/` subfolder contains data-driven test fixtures/utilities
- **Naming Convention**: Test files end with `.spec.ts` (Playwright standard)

### Configuration & Execution
- **Config File**: `playwright.config.ts` defines test behavior:
  - **Headless**: `false` (visual debugging required)
  - **Browser**: Chromium only
  - **Viewport**: `null` (maximized windows)
  - **Reporting**: HTML reports auto-open after test runs
  - **Diagnostics**: Screenshots on failure, videos on failure, traces always enabled
  - **Timeout**: 60 seconds per test
  - **CI Behavior**: 2 retries, 1 worker (serial execution)
  - **Local Behavior**: Parallel execution enabled by default

### Target Application
- **App URL**: `https://li-polarisautomationqa.ivp.in/IVPDWH`
- **Auth Pattern**: Email + Password credentials (see `test-1.spec.ts` for login example)
- **Key Pages**: Configuration → Performance, with Data Browser validation

## Critical Developer Workflows

### Running Tests
```bash
# Single test file
npx playwright test tests/test-1.spec.ts

# All tests
npx playwright test

# With UI mode (visual debugging)
npx playwright test --ui

# Specific test by name
npx playwright test -g "test name pattern"
```

### Test Execution Behaviors
- **Exit Code 1** indicates test failures (check `test-results/` directory)
- **HTML Reports**: Auto-opens at `playwright-report/index.html` after run
- **Artifacts Location**: `test-results/<test-name-browser>/` contains screenshots and videos
- **Debug Traces**: Available in test-results for failed tests; open with: `npx playwright show-trace <trace-file>`

### Adding New Tests
1. Create `.spec.ts` file in `tests/` directory
2. Import `{ test, expect }` from `@playwright/test`
3. Extract reusable steps → add to `Commom_Method.ts`
4. Use role-based selectors: `getByRole()` preferred over XPath
5. Always add assertions: `expect()` for verification

## Key Conventions & Patterns

### Selector Strategy (Priority Order)
1. **Accessibility Locators** (PREFERRED): `getByRole()`, `getByLabel()`, `getByTestId()`
   - Example: `page.getByRole('button', { name: 'Submit' })`
2. **Text-based**: `getByText()`
3. **CSS/XPath** (AVOID): Only when accessibility selectors unavailable

### Test ID Usage
The app uses `data-testid` attributes extensively. Reference them directly:
```typescript
await expect(page.getByTestId('ConfigSummaryContainer').nth(1)).toBeVisible();
```

### Login Pattern
Standardized in existing tests (email/password form + Submit button):
```typescript
await page.goto('https://li-polarisautomationqa.ivp.in/IVPDWH');
await page.getByRole('textbox', { name: 'Email' }).fill('email@ivp.in');
await page.getByRole('textbox', { name: 'Password' }).fill('password');
await page.getByRole('button', { name: 'Submit' }).click();
```

### Assertion Patterns
- **Visibility**: `expect(element).toBeVisible()`
- **Text Content**: `expect(page.locator()).toContainText()`
- **Page State**: `expect(page).toHaveTitle()`
- Always include meaningful test descriptions for failure debugging

## Integration Points & Dependencies

### External Dependencies
- **Playwright**: Handles browser automation, element interaction, assertions
- **@types/node**: TypeScript support for Node utilities
- **.env Support**: Ready (commented out in config) for environment-specific credentials

### Known Issues & Workarounds
- **Headless Mode**: Disabled by default—tests require visual browser; CI environment must support headless rendering
- **Window Maximize**: Uses Chrome flag `--start-maximized` to ensure full viewport visibility
- **Test Naming**: `Commom_Method.ts` has intentional typo—maintain as-is to preserve test references

## File Reference Map
- **Config**: [playwright.config.ts](playwright.config.ts) — Execution settings, reporter config
- **Login/Common Steps**: [tests/Commom_Method.ts](tests/Commom_Method.ts) — Reusable test utilities
- **QA Smoke Test**: [tests/test-1.spec.ts](tests/test-1.spec.ts) — Login + Configuration validation (production example)
- **Reference Test**: [tests/example.spec.ts](tests/example.spec.ts) — Simple Playwright.dev tests (for reference only)

## Productivity Tips
- Use `--ui` mode for interactive test development and debugging
- Inspect selectors in the Playwright Inspector before finalizing
- Keep credentials in environment variables, not hardcoded (template ready in config)
- Run single test file to validate changes quickly before full suite
- Always check `test-results/` artifacts when tests fail
