import { expect, test } from "@playwright/test";

const modules = ["game", "music", "book", "art", "movie", "life"] as const;

const fieldDescriptions = {
  game: "研究生成式 AI、智能体与交互叙事如何共同构建可进入的虚拟世界。",
  music: "研究 AI 在作曲、声音设计与自适应音频中的创作和协作方式。",
  book: "研究语言模型如何参与世界观、角色、剧本与长篇叙事的构建。",
  art: "研究生成式 AI 在 UI、原画、视觉设计与三维资产流程中的应用。",
  movie: "研究 AI 在分镜、动画、影像生成与虚拟制作流程中的应用。",
  life: "研究人格建模、记忆系统与行为智能，构建具有持续性的虚拟角色。",
};

test("首页按既定顺序展示六个领域及其项目预览", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("main > h1")).toHaveText("LabX 独立 AI 实验室项目");
  await expect(page.locator("section.home-field")).toHaveCount(6);

  const fieldOrder = await page
    .locator("section.home-field")
    .evaluateAll((sections) => sections.map((section) => section.id));
  expect(fieldOrder).toEqual(modules);

  for (const moduleType of modules) {
    const field = page.locator(`#${moduleType}`);
    await expect(
      field.getByRole("heading", {
        name: fieldDescriptions[moduleType],
        exact: true,
      }),
    ).toBeVisible();

    const previewCount = await field
      .locator("article.home-project-card")
      .count();
    expect(previewCount).toBeGreaterThan(0);
    expect(previewCount).toBeLessThanOrEqual(3);
  }
});

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

test("跨页领域导航返回首页锚点且内容不被页头遮挡", async ({ page }) => {
  await page.goto("/about");
  await page
    .getByRole("navigation", { name: "应用领域" })
    .getByRole("link", { name: "Music", exact: true })
    .click();

  await expect(page).toHaveURL(/\/#music$/);
  await expect(page.locator("#music")).toBeVisible();

  await expect
    .poll(async () =>
      page.evaluate(() => {
        const header = document.querySelector<HTMLElement>(".site-header");
        const field = document.querySelector<HTMLElement>("#music");

        if (!header || !field) return false;
        return (
          field.getBoundingClientRect().top >=
          header.getBoundingClientRect().bottom - 1
        );
      }),
    )
    .toBe(true);
});

test("领域入口可以进入完整游戏列表", async ({ page }) => {
  await page.goto("/#game");
  await page.getByRole("link", { name: "全部游戏", exact: true }).click();

  await expect(page).toHaveURL(/\/game$/);
  await expect(page.getByText("LABX APPLICATION FIELD")).toBeVisible();
});

test("移动端保留横向领域导航和内容入口", async ({ page, isMobile }) => {
  test.skip(!isMobile, "仅在移动设备项目中执行");
  await page.goto("/");

  await expect(page.getByRole("link", { name: "LabX 首页" })).toBeVisible();
  await expect(
    page.locator(".site-header").getByText("探索和重构一切", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "关于", exact: true }),
  ).toBeVisible();
  const fieldNavigation = page.getByRole("navigation", { name: "应用领域" });
  await expect(fieldNavigation).toBeVisible();

  for (const moduleName of ["Game", "Music", "Book", "Art", "Movie", "Life"]) {
    await expect(
      fieldNavigation.getByRole("link", { name: moduleName, exact: true }),
    ).toBeVisible();
  }

  const navigationOverflow = await fieldNavigation.evaluate(
    (navigation) => getComputedStyle(navigation).overflowX,
  );
  expect(["auto", "scroll"]).toContain(navigationOverflow);

  await expect(
    page.getByRole("link", { name: "查看项目：余响纪元" }),
  ).toBeVisible();

  const hasPageOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  expect(hasPageOverflow).toBe(false);
});
