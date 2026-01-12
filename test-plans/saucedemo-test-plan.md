# SauceDemo — Comprehensive Test Plan

## Executive summary

This document provides a comprehensive test plan for https://www.saucedemo.com. The plan covers all visible modules and user flows: authentication, inventory browsing, product details, shopping cart, checkout (information, overview, completion), sorting/filtering, account/session actions (logout), error handling, accessibility, responsiveness, performance, and security-related checks. Each scenario is independent and assumes a fresh browser state unless otherwise noted.

Target audience: QA engineers, developers, and product owners.

Scope: Functional, negative, boundary, UI/UX, accessibility, performance, and basic security tests for the public web UI. API-level and backend load/stress tests are out-of-scope but suggested as next steps.

Assumptions (global):
- Tests start from a blank/fresh browser session (no cached credentials, localStorage, cookies, or storage state). Where authentication is required, the standard Sauce Demo test accounts and credentials are used (standard_user / secret_sauce, locked_out_user, problem_user, performance_glitch_user) unless a different account is specified in the scenario.
- The application is reachable at https://www.saucedemo.com and responds over HTTPS.
- Test environment has deterministic data (inventory content consistent across runs).

How to use this plan:
- Each scenario is independent; run in any order. If a scenario requires pre-seeded data, the steps include seeding actions.
- Each scenario lists: title, assumptions, step-by-step steps, expected results, success criteria, and failure conditions.

---

## Module map (high level)
- Authentication (Login, error messages, locked accounts)
- Inventory (list/grid of products, product thumbnails)
- Product Detail page
- Cart (add/remove items, quantity via add/remove flows)
- Checkout (Checkout: Your Information, Overview, Complete)
- Sorting & Filtering
- Navigation (menu, logout)
- Persistence & Session (localStorage, storageState, cookies)
- UI/UX (responsiveness, accessibility ARIA/keyboard)
- Error and negative flows (network failures, slow responses)
- Performance and load-related checks
- Security checks (session fixation, direct URL access without auth)

---

## Test data
- Valid users:
  - standard_user / secret_sauce (happy-path user)
  - locked_out_user / secret_sauce (login fails with "locked out")
  - problem_user / secret_sauce (known UI/data anomalies)
  - performance_glitch_user / secret_sauce (slow responses)
- Product examples: any items visible on inventory (e.g., "Sauce Labs Backpack", "Sauce Labs Bike Light")

Note: adjust product names to exactly match live inventory.

---

## Scenarios

### 1. Login — Happy path
Assumptions: Fresh state. Using `standard_user / secret_sauce`.
Steps:
1. Navigate to https://www.saucedemo.com.
2. Verify login form is visible with username and password fields and Login button.
3. Enter username `standard_user` and password `secret_sauce`.
4. Click Login.

Expected results:
- Browser navigates to inventory page (URL contains `/inventory.html`).
- Inventory list is visible and contains product cards.
- No error message shown.

Success criteria: User lands on inventory and can see products.
Failure conditions: Login rejected; error message appears; redirect doesn't happen.


### 2. Login — Locked out user (negative)
Assumptions: Fresh state. Using `locked_out_user / secret_sauce`.
Steps:
1. Load login page.
2. Enter `locked_out_user` and `secret_sauce`.
3. Click Login.

Expected results:
- Visible error message: user is locked out (text variation acceptable but message present).
- No navigation to inventory.

Success criteria: Proper error shown and user remains on login page.
Failure: Silent failure or navigation to inventory.


### 3. Login — Missing credentials (validation)
Assumptions: Fresh state.
Steps:
1. Navigate to login page.
2. Leave username blank; enter `secret_sauce` only; click Login.
3. Repeat: enter username but leave password blank; click Login.

Expected:
- Form validation or visible error requiring both fields.
- No navigation to inventory.

Success: Clear validation/error shown for missing input.


### 4. Inventory — Product listing and count
Assumptions: Logged in as `standard_user`.
Steps:
1. From inventory page, count the number of product cards shown.
2. Verify each card has: thumbnail image, product name, description (or short text), price, and an Add to cart button.

Expected:
- Cards count matches expected inventory size.
- Each product card contains all required elements and price is a valid currency.

Failure: Missing elements, broken images, incorrect prices.


### 5. Inventory — Add and remove a product (cart flow)
Assumptions: Logged in as `standard_user`.
Steps:
1. On inventory, click Add to cart for product A.
2. Observe cart badge count increments (usually top-right badge).
3. Click on cart; open cart page.
4. Verify product A is present.
5. Click Remove to remove product A.
6. Verify cart count decrements and product removed.

Expected:
- Add increases badge; remove decreases; cart contents match UX.

Success: Cart reflects actions accurately.


### 6. Cart — Empty cart behavior
Assumptions: Logged in and cart empty.
Steps:
1. Navigate to cart page with an empty cart.

Expected:
- Page indicates empty cart state or shows no products and appropriate messaging.


### 7. Product detail page
Assumptions: Logged in.
Steps:
1. From inventory, click a product name or image to open its detail page.
2. Verify detailed product title, description, price, and Add to cart button appear.
3. Click Add to cart, then navigate to cart and verify product present.

Expected:
- Product detail correctly shows metadata and add flow works.


### 8. Sorting & filtering
Assumptions: Logged in, multiple products available.
Steps:
1. Locate sorting control (e.g., dropdown) on inventory.
2. Select "Name (A to Z)". Verify list is alphabetically sorted.
3. Select "Name (Z to A)". Verify reversed order.
4. Select sort by price low->high and high->low; verify order.

Expected:
- Sorting control reorders list accordingly.

Edge: Ties resolved consistently.


### 9. Checkout — Happy path (complete purchase flow)
Assumptions: Logged in as `standard_user`, cart has 1-3 items.
Steps:
1. Open cart and click Checkout.
2. On "Checkout: Your Information", enter valid First name, Last name, and Postal Code; click Continue.
3. On Overview page, verify items, quantities, item total, tax (if shown), and Total.
4. Click Finish.

Expected:
- On Finish, user sees confirmation page with text like "THANK YOU FOR YOUR ORDER" and option to go back to inventory.
- Order overview reflects items added.

Success: Checkout completes and confirmation page shown.


### 10. Checkout — Validation (missing customer info)
Assumptions: Logged in, in checkout form.
Steps:
1. Click Checkout, leave name or postal code blank, click Continue.

Expected:
- Visible validation error requiring the missing fields.
- Cannot proceed to Overview.


### 11. Checkout — Price & totals accuracy
Assumptions: Logged in, 2 different items in cart.
Steps:
1. Add two items with known prices.
2. Proceed to Overview and verify subtotal equals sum of item prices.
3. Verify tax calculation (if shown) = subtotal * tax rate; check Total = subtotal + tax.

Expected:
- Correct arithmetic and values displayed.

Edge: If tax rounding present, tolerances should be documented.


### 12. Navigation — Menu and logout
Assumptions: Logged in.
Steps:
1. Open the side menu (hamburger) if present.
2. Click Logout.

Expected:
- User is returned to login page; protected inventory pages redirect to login if accessed without auth.


### 13. Direct URL access when unauthenticated (security)
Assumptions: Fresh browser (not logged in).
Steps:
1. Navigate directly to `/inventory.html`.

Expected:
- Application redirects to login page or blocks access.

Failure: Inventory is accessible without login.


### 14. Session persistence / storage behavior
Assumptions: Logged in.
Steps:
1. Add item(s) to cart.
2. Refresh page; verify cart state persists.
3. Close and reopen browser (or clear only page, preserving state) and re-navigate.

Expected:
- Either persistence through session storage/state or intentionally ephemeral behavior documented. The cart should persist across refresh; across full browser restart behavior must match spec.


### 15. Network failure resilience (negative)
Assumptions: Using a test harness or network throttling.
Steps:
1. Simulate a network failure or delay while performing Login or Checkout (e.g., block requests to API endpoints).
2. Observe UI behavior.

Expected:
- Friendly error messages; no silent failures. Retry affordances where appropriate.


### 16. Problem user & performance_glitch_user (special users)
Assumptions: Use provided `problem_user` and `performance_glitch_user` credentials.
Steps:
1. Login as `problem_user` and explore inventory/product pages — note UI anomalies or missing images.
2. Login as `performance_glitch_user` and measure page load times; verify app still functional.

Expected:
- `problem_user`: documented anomalies should appear (used for visual test coverage).
- `performance_glitch_user`: slower responses but no data corruption.


### 17. Accessibility — Keyboard navigation and ARIA
Assumptions: Fresh state.
Steps:
1. From login, navigate using Tab to ensure logical focus order.
2. Verify all interactive elements (buttons, links, form controls) have accessible names.
3. Run automated axe-core or Lighthouse accessibility checks for the main pages.

Expected:
- Logical tab order, focus indicators, and no critical a11y violations.


### 18. Responsiveness — Mobile and tablet layouts
Assumptions: Fresh state.
Steps:
1. Resize viewport to common mobile widths (375x812, 360x800) and tablet widths (768x1024).
2. Verify layout is usable: menu accessible, product cards readable, Add to cart tappable, no horizontal scroll.

Expected:
- UI adapts; no overlapping or clipped content; cart flows remain functional.


### 19. Visual regression & images
Assumptions: Baseline images available.
Steps:
1. Capture baseline screenshots for inventory and product detail pages.
2. Run visual comparison after UI changes or releases.

Expected:
- No unexpected visual diffs beyond accepted thresholds.


### 20. Cross-browser verification
Assumptions: Test environment with Chrome, Firefox, Safari (WebKit).
Steps:
1. Run key scenarios (login, add to cart, checkout) across supported browsers.

Expected:
- Feature parity and no critical browser-specific defects.


### 21. Performance — Page load (smoke)
Assumptions: Standard network.
Steps:
1. Measure first meaningful paint and Time To Interactive for Login and Inventory pages.
2. Record metrics for comparison across builds.

Expected:
- Pages load within acceptable thresholds (define SLA with product team, e.g., TTI < 3s on 3G slow-4G for critical flows).


### 22. Error messages and localization (if any)
Assumptions: Product only in English unless localized.
Steps:
1. Trigger error messages (bad login, missing checkout info) and verify readability and clarity.

Expected:
- Error messages are helpful, unobtrusive, and don't leak sensitive info.


### 23. Rate limiting and brute force protections (security)
Assumptions: Test accounts exist for safe testing.
Steps:
1. Automate repeated failed login attempts from same client/IP and watch for throttling or CAPTCHA.

Expected:
- Reasonable protections or account lockouts to prevent brute-force.


### 24. Data integrity after concurrent actions (edge)
Assumptions: Multi-tab or multi-client tests available.
Steps:
1. In tab A, add item X to cart.
2. In tab B, remove item X from cart or perform checkout.
3. Observe reconciliation across tabs.

Expected:
- Consistent view or clearly defined eventual-consistency behavior.


### 25. Cleanup & reset flows
Assumptions: Tests leave state behind.
Steps:
1. Document required cleanup after test runs: logout, clear cart, remove session tokens.

Expected:
- Tests end with fresh state or provide scripts to reset environment.


---

## Test priorities (recommended)
- P0 (blockers): Login happy path; Checkout happy path; Add/remove cart; Critical security path (direct inventory access blocked).
- P1: Sorting, product details, validation errors, logout, persistence.
- P2: Accessibility, responsiveness, network error handling, visual regressions.
- P3: Rate-limiting, concurrency, performance metrics, extended security checks.


## Edge cases & notes
- Blank or whitespace-only inputs.
- Extremely long names in checkout fields.
- Non-ASCII characters in names/postcodes.
- Price formatting differences (currency symbols, thousands separators).
- Client-side state manipulation (tampering with localStorage) and expected behavior.


## Automation suggestions
- Implement Playwright test suites mapped to each scenario group (Login, Inventory, Cart, Checkout).
- Reuse fixtures to handle login (or use storageState to speed authenticated tests).
- Add data-driven tests for multiple users and product sets.
- Integrate visual regression with Playwright snapshot or Percy/Chromatic.
- Run accessibility checks using Axe integration.


## Test artifacts to produce
- Scripts: smoke, regression, and full E2E suites.
- Baseline screenshots and visual diffs.
- Performance report CSV for page metrics.
- Accessibility report (a11y violations).


## Execution notes
- Tests should be runnable in CI against a stable test environment.
- Use `standard_user` for happy-path automation; keep special users for targeted tests.


---

## Appendix: Example test case format (copyable)

Title: Login - Happy Path
Assumptions: Fresh browser state.
Steps:
1. Navigate to https://www.saucedemo.com
2. Enter username `standard_user` and password `secret_sauce`.
3. Click Login.
Expected Result: User lands on inventory page with product list visible.

---

import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly baseUrl = 'https://www.saucedemo.com';

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(`${this.baseUrl}${path}`);
  }
}

Generated: Test plan saved in this workspace at `test-plans/saucedemo-test-plan.md`.

End of plan.
