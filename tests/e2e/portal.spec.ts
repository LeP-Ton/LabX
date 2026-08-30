import { expect, test } from "@playwright/test";

const modules = ["game", "music", "book", "art", "movie", "life"];

test("六个应用领域均可访问", async ({ page }) => {
  for (const moduleType of modules) {
    await page.goto(`/${moduleType}`);
    await expect(page.getByText("LABX APPLICATION FIELD")).toBeVisible();
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.getByText("演示内容", { exact: true })).toBeVisible();
  }
});

test("作品详情可以进入跨域关联作品", async ({ page }) => {
  await page.goto("/game/echoes-of-us");
  await expect(page.getByRole("heading", { name: "余响纪元" })).toBeVisible();

  await page.getByRole("link", { name: "查看作品：记忆潮汐" }).click();
  await expect(page).toHaveURL(/\/music\/memory-tide$/);
  await expect(page.getByRole("heading", { name: "记忆潮汐" })).toBeVisible();
});

test("黑白主题切换会持久化", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "切换到黑色主题" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("移动端保留核心导航和内容入口", async ({ page, isMobile }) => {
  test.skip(!isMobile, "仅在移动设备项目中执行");
  await page.goto("/");

  await expect(page.getByRole("link", { name: "LabX 首页" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "关于", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "查看核心项目：余响纪元" }),
  ).toBeVisible();
});
