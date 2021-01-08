import DarkMode from '../dist/dark-mode';

let darkMode;

describe('Given an instance of Darkmode with prefersColorScheme set to "light" and defaultDarkMode set to "true', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: (query) => ({
                matches: query === '(prefers-color-scheme: light)',
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            }),
        });

        darkMode = new DarkMode({
            defaultDarkMode: true
        });
    })

    describe('After creating an instance', () => {
        test('should be in light mode', () => {
            expect(darkMode.getMode()).toBe('light');
        })
    })
});