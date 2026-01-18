import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('loads with todo list visible', async ({ page }) => {
    await expect(page.locator('text=Tasks')).toBeVisible();
  });

  test('displays empty state when no todos exist', async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.locator('text=Create Your First Task')).toBeVisible();
  });

  test('search functionality filters todos', async ({ page }) => {
    const searchInput = page.locator('[placeholder="Search tasks..."]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('nonexistent');
    await expect(page.locator('text=No tasks found')).toBeVisible();
  });
});

test.describe('Add Todo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('opens modal from "Add Task" button', async ({ page }) => {
    await page.click('text=Add Task');
    await expect(page.locator('text=Add New Task')).toBeVisible();
  });

  test('opens modal from "Create Your First Task" button', async ({ page }) => {
    await page.click('text=Create Your First Task');
    await expect(page.locator('text=Add New Task')).toBeVisible();
  });

  test('creates new todo with all fields', async ({ page }) => {
    await page.click('text=Add Task');
    await page.fill('input[placeholder="What needs to be done?"]', 'Test todo');
    await page.fill('textarea', 'Test description');
    await page.selectOption('select', 'high');
    await page.click('button:has-text("Save")');
    await expect(page.locator('text=Test todo')).toBeVisible();
  });

  test('form validation requires title', async ({ page }) => {
    await page.click('text=Add Task');
    await page.click('button:has-text("Save")');
    await expect(page.locator('text=Title is required')).toBeVisible();
  });
});

test.describe('Edit Todo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.click('text=Add Task');
    await page.fill('input[placeholder="What needs to be done?"]', 'Original title');
    await page.click('button:has-text("Save")');
  });

  test('opens edit modal with existing values', async ({ page }) => {
    await page.click('[aria-label="Edit"]');
    await expect(page.locator('text=Edit Task')).toBeVisible();
    const titleInput = page.locator('input[placeholder="What needs to be done?"]');
    await expect(titleInput).toHaveValue('Original title');
  });

  test('updates todo successfully', async ({ page }) => {
    await page.click('[aria-label="Edit"]');
    await page.fill('input[placeholder="What needs to be done?"]', 'Updated title');
    await page.click('button:has-text("Save")');
    await expect(page.locator('text=Updated title')).toBeVisible();
  });
});

test.describe('Toggle Completion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.click('text=Add Task');
    await page.fill('input[placeholder="What needs to be done?"]', 'Toggle test');
    await page.click('button:has-text("Save")');
  });

  test('toggles completion checkbox', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]');
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });
});

test.describe('Delete Todo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.click('text=Add Task');
    await page.fill('input[placeholder="What needs to be done?"]', 'Delete test');
    await page.click('button:has-text("Save")');
  });

  test('deletes todo with confirmation', async ({ page }) => {
    await page.click('[aria-label="Delete"]');
    await expect(page.locator('text=Delete Task')).toBeVisible();
    await page.click('button:has-text("Delete")');
    await expect(page.locator('text=Delete test')).not.toBeVisible();
  });
});

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('categories route is accessible', async ({ page }) => {
    await page.click('text=Categories');
    await expect(page.locator('text=Categories')).toBeVisible();
  });

  test('settings route is accessible', async ({ page }) => {
    await page.click('text=Settings');
    await expect(page.locator('text=Settings')).toBeVisible();
  });

  test('can navigate back to home', async ({ page }) => {
    await page.click('text=Settings');
    await expect(page.locator('text=Settings')).toBeVisible();
    await page.click('text=Tasks');
    await expect(page.locator('text=Tasks')).toBeVisible();
  });
});

test.describe('Category Pages', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('displays category cards', async ({ page }) => {
    await page.click('text=Categories');
    await expect(page.locator('text=Personal')).toBeVisible();
    await expect(page.locator('text=Work')).toBeVisible();
    await expect(page.locator('text=Shopping')).toBeVisible();
  });

  test('category detail page filters tasks', async ({ page }) => {
    await page.click('text=Add Task');
    await page.fill('input[placeholder="What needs to be done?"]', 'Work task');
    await page.selectOption('select', 'Work');
    await page.click('button:has-text("Save")');
    await page.click('text=Categories');
    await page.click('text=Work');
    await expect(page.locator('text=Work task')).toBeVisible();
  });
});

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('text=Settings');
  });

  test('displays theme toggles', async ({ page }) => {
    await expect(page.locator('text=Dark')).toBeVisible();
    await expect(page.locator('text=Light')).toBeVisible();
    await expect(page.locator('text=System')).toBeVisible();
  });

  test('theme toggles are clickable', async ({ page }) => {
    await page.click('text=Dark');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });
});

test.describe('Theme Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('dark mode applies correctly', async ({ page }) => {
    await page.click('text=Settings');
    await page.click('text=Dark');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('light mode applies correctly', async ({ page }) => {
    await page.click('text=Settings');
    await page.click('text=Light');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'light');
  });

  test('system mode applies correctly', async ({ page }) => {
    await page.click('text=Settings');
    await page.click('text=System');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'system');
  });
});

test.describe('Priority and Category Badges', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('priority badges display correctly', async ({ page }) => {
    await page.click('text=Add Task');
    await page.fill('input[placeholder="What needs to be done?"]', 'Priority test');
    await page.selectOption('select', 'high');
    await page.click('button:has-text("Save")');
    await expect(page.locator('text=High')).toBeVisible();
  });

  test('category badges display correctly', async ({ page }) => {
    await page.click('text=Add Task');
    await page.fill('input[placeholder="What needs to be done?"]', 'Category test');
    await page.selectOption('select:has-text("Category")', 'Work');
    await page.click('button:has-text("Save")');
    await expect(page.locator('text=Work')).toBeVisible();
  });
});

test.describe('localStorage Persistence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('todos persist after page reload', async ({ page }) => {
    await page.click('text=Add Task');
    await page.fill('input[placeholder="What needs to be done?"]', 'Persistent todo');
    await page.click('button:has-text("Save")');
    await page.reload();
    await expect(page.locator('text=Persistent todo')).toBeVisible();
  });

  test('theme preference persists', async ({ page }) => {
    await page.click('text=Settings');
    await page.click('text=Dark');
    await page.reload();
    await expect(page.locator('html[data-theme="dark"]')).toBeVisible();
  });
});
