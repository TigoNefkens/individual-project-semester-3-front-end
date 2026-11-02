import { expect } from '@playwright/test';
export async function login(
  page,
  username = "Playwright@gmail.com",
  password = "Testing123"
) {
  // Ga naar loginpagina
  await page.goto("http://localhost:5173/login");

  // Vul email en wachtwoord in
  await page.getByPlaceholder("E-mail").fill(username);
  await page.getByPlaceholder("Password").fill(password);

  // Klik op Confirm button
  await page.getByRole("button", { name: "Confirm" }).click();

  // Wacht tot de modal zichtbaar is
  const modalText = page.locator('.ConfirmPopup').locator('..').locator('p'); 
  await expect(modalText).toBeVisible();

  // Klik de modal confirm button
  await page.getByRole('button', { name: 'Confirm', exact: true }).first().click();

  // Wacht tot navigatie naar homepage (alleen bij succesvolle login)
  await page.waitForURL("http://localhost:5173");
}