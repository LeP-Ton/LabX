import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ThemeToggle } from "@/components/theme-toggle";

describe("主题切换", () => {
  it("切换并持久化黑色主题", async () => {
    document.documentElement.dataset.theme = "light";
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: "切换到黑色主题" }));

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("labx-theme")).toBe("dark");
    expect(
      screen.getByRole("button", { name: "切换到白色主题" }),
    ).toBeInTheDocument();
  });
});
