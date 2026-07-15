import failOnConsoleWarningError from "vitest-fail-on-console";

failOnConsoleWarningError();

// js-dom doesn't include scrollIntoView function and that's why we need to mock it
// to avoid false failed tests in DocumentsList, DocumentTypesPage and DocumentTypesContent test files.
// globalThis.HTMLElement.prototype.scrollIntoView = vi.fn();

// Avoid "ResizeObserver is not defined" error
globalThis.ResizeObserver = class ResizeObserver {
  observe(): void {
    /*do nothing*/
  }

  unobserve(): void {
    /*do nothing*/
  }

  disconnect(): void {
    /*do nothing*/
  }
};
