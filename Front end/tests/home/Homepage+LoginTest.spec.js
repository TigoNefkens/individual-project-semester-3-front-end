// @ts-check
import { test, expect } from '@playwright/test';
import { login } from '../utils/login.js';

test('homepage loads and has main elements', async ({ page }) => {
  // Ga naar je lokale homepage (pas de URL aan als nodig)
  await page.goto('http://localhost:5173/');

  // Controleer dat de hoofdheader zichtbaar is
  await expect(page.getByText('THE #1 PLATFORM FOR CONNECTING MUSICIANS')).toBeVisible();

  // Controleer dat de titels zichtbaar zijn
  await expect(page.getByText('Jam with Others')).toBeVisible();
  await expect(page.getByText('Find. Play. Unite.')).toBeVisible();

  // Controleer dat de knoppen zichtbaar zijn
  await expect(page.getByRole('link', { name: '🎸 Start a Band' })).toBeVisible();
  await expect(page.getByRole('link', { name: '🔍 Discover Bands' })).toBeVisible();
});

test('clicking Start a Band navigates to Create-bands page', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Klik de knop en check de URL
  await page.getByRole('link', { name: '🎸 Start a Band' }).click();
  await expect(page).toHaveURL(/.*Create-bands/);
});

test('clicking Discover Bands navigates to Find-bands page', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Klik de knop en check de URL
  await page.getByRole('link', { name: '🔍 Discover Bands' }).click();
  await expect(page).toHaveURL(/.*Find-bands/);
});

test('Try logging in', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await login(page);
});

test('incorrect password shows error modal', async ({ page }) => {
    await page.goto("http://localhost:5173/login");

    // Vul email en fout wachtwoord in
    await page.getByPlaceholder("E-mail").fill("Playwright@gmail.com");
    await page.getByPlaceholder("Password").fill("WrongPassword123");
    await page.getByRole('button', { name: 'Confirm', exact: true }).click();

    // Modal verschijnt met foutmelding
    const modalConfirm = page.locator('.ConfirmPopup');
    const modalText = modalConfirm.locator('..').locator('p');
    await expect(modalText).toHaveText("Invalid credentials"); // tekst kan "ERROR: ..." zijn

    // Sluit de modal
    await modalConfirm.click();

    // Blijf op de login pagina
    await expect(page).toHaveURL("http://localhost:5173/login");
  });

  test('update profile colors and description', async ({ page }) => {
  // 1️⃣ Log in via helper
  await login(page);
  
  // Modal van login sluiten
  const loginModal = page.locator('.ConfirmPopup');
  if (await loginModal.isVisible()) {
      await loginModal.click();
  }
  
  // 2️⃣ Navigeer naar ProfilePage
  await page.goto('http://localhost:5173/Profile'); // pas aan als route anders is
  
  // Wacht tot de pagina geladen is
  await expect(page.locator('.profilepage-content')).toBeVisible();
  
  // 3️⃣ Verander kleuren via de dropdowns
  const color1Dropdown = page.locator('div.color-option').nth(0).locator('select');
  const color2Dropdown = page.locator('div.color-option').nth(1).locator('select');
  const borderDropdown = page.locator('div.color-option').nth(2).locator('select');
  
  await color1Dropdown.selectOption('#FF0000'); // rood
  await color2Dropdown.selectOption('#00FF00'); // groen
  await borderDropdown.selectOption('#0000FF'); // blauw
  
  // 4️⃣ Wijzig de About me beschrijving
  const descriptionInput = page.locator('div.Description-edit input');
  await descriptionInput.fill('Updated via Playwright test');
  
  // 5️⃣ Save changes knop klikbaar
  const saveButton = page.locator('button.ProfileButtons', { hasText: 'Save changes' });


  await saveButton.click();


  });

  test('clicking a band navigates to its detail view', async ({ page }) => {
    // 1️⃣ Ga naar de Find-bands pagina
    await page.goto('http://localhost:5173/Find-bands');

    // 2️⃣ Wacht tot er minstens één band component geladen is
    const bandComponent = page.locator('.square').first();
    await expect(bandComponent).toBeVisible();

    // 3️⃣ Klik op de "View Band" knop van de eerste band
    const viewButton = bandComponent.locator('button', { hasText: 'View Band' });
    await viewButton.click();

    // 4️⃣ Controleer dat de URL klopt
    await expect(page).toHaveURL(/.*Find-bands\/view/);

  });
  
  test('redirects to login modal if not logged in', async ({ page }) => {

    // 2️⃣ Ga naar Create-bands pagina
    await page.goto('http://localhost:5173/Create-bands');

    // 3️⃣ Wacht tot de modal zichtbaar is
    const modal = page.locator('.ConfirmPopup').first();
    await expect(modal).toBeVisible();

    // 4️⃣ Controleer de tekst in de modal
    const modalText = modal.locator('..').locator('p'); // p binnen de modal
    await expect(modalText).toHaveText(/please login/i);

    // 5️⃣ Klik op Confirm knop
    await modal.click();

    // 6️⃣ Controleer dat de URL naar login is gegaan
    await expect(page).toHaveURL(/.*login/);
  });
