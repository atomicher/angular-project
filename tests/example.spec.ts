import { test, expect } from '@playwright/test';

test.describe('E2E Scenario: Destination Management', () => {

  // Перед кожним тестом виконуємо вхід
  test.beforeEach(async ({ page }) => {
    // 1. Йдемо на сторінку логіну
    await page.goto('http://localhost:4200/login');

    // 2. Вводимо правильні дані (ті, що в AuthService)
    await page.fill('input[formControlName="email"]', 'admin@gmail.com');
    await page.fill('input[formControlName="password"]', '12345');

    // 3. Натискаємо "Увійти"
    await page.click('button[type="submit"]');

    // 4. Чекаємо перенаправлення на головну сторінку (або появи кнопки виходу)
    await expect(page).toHaveURL('http://localhost:4200/items');
  });

  test('should successfully add a new item and verify its visibility', async ({ page }) => {
    const newItemName = 'Варшава ' + Date.now();

    // 1. Тепер, коли ми залогінені, можемо йти на сторінку додавання
    // Можна клікнути по кнопці або перейти за посиланням
    await page.click('text=+ Додати'); 
    // Або: await page.goto('http://localhost:4200/items/add');

    // 2. Перевіряємо, що ми на правильній сторінці
    await expect(page).toHaveURL(/\/items\/add/);

    // 3. Вводимо дані у форму створення
    await page.fill('input[formControlName="name"]', newItemName);
    await page.fill('input[formControlName="country"]', 'Польща');
    await page.fill('textarea[formControlName="description"]', 'Столиця Польщі, E2E тест.');
    // Додаємо картинку (обов'язкове поле)
    await page.fill('input[formControlName="imageUrl"]', 'https://placehold.co/260x160');

    // 4. Сабміт форми
    await page.click('button[type="submit"]');

    // 5. Перевірка перенаправлення назад до списку
    await expect(page).toHaveURL(/\/items$/); // URL має закінчуватися на /items

    // 6. Перевірка, що новий елемент з'явився у списку
    // Шукаємо картку, яка містить унікальне ім'я, яке ми створили
    const newCard = page.locator('.card', { hasText: newItemName });
    await expect(newCard).toBeVisible();
  });
});