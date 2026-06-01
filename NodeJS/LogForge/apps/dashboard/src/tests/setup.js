import '@testing-library/jest-dom/vitest';

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverStub;

if (!navigator.clipboard) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: vi.fn() },
    configurable: true
  });
}

afterEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});
