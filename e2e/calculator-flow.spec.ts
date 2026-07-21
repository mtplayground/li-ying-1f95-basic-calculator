import { expect, test, type Page } from '@playwright/test';

function display(page: Page) {
  return page.getByRole('status');
}

async function clickKey(page: Page, name: string) {
  await page.getByRole('button', { name }).click();
}

async function expectDisplay(page: Page, value: string) {
  await expect(display(page)).toHaveText(value);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expectDisplay(page, '0');
});

test('chains multi-operator calculations with mouse input', async ({
  page,
}) => {
  await clickKey(page, 'Eight');
  await clickKey(page, 'Add');
  await clickKey(page, 'Two');
  await clickKey(page, 'Multiply');
  await expectDisplay(page, '10');

  await clickKey(page, 'Three');
  await clickKey(page, 'Equals');

  await expectDisplay(page, '30');
});

test('handles decimal arithmetic with keyboard input', async ({ page }) => {
  await page.keyboard.type('1.5');
  await page.keyboard.type('+');
  await page.keyboard.type('2.25');
  await page.keyboard.press('Enter');

  await expectDisplay(page, '3.75');
});

test('recovers from division by zero via clear', async ({ page }) => {
  await page.keyboard.type('9/0');
  await page.keyboard.press('Enter');
  await expectDisplay(page, 'Cannot divide by zero');

  await page.keyboard.press('Escape');
  await expectDisplay(page, '0');

  await page.keyboard.type('5+5');
  await page.keyboard.press('Enter');
  await expectDisplay(page, '10');
});

test('starts a new calculation directly after a result', async ({ page }) => {
  await clickKey(page, 'Seven');
  await clickKey(page, 'Add');
  await clickKey(page, 'Eight');
  await clickKey(page, 'Equals');
  await expectDisplay(page, '15');

  await clickKey(page, 'Four');
  await clickKey(page, 'Add');
  await clickKey(page, 'One');
  await clickKey(page, 'Equals');

  await expectDisplay(page, '5');
});
