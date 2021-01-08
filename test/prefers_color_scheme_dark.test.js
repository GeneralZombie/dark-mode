import DarkMode from '../dist/dark-mode';

let darkMode;

describe('Given an instance of Darkmode with prefersColorScheme set to "dark"', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: query === '(prefers-color-scheme: dark)',
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });

        darkMode = new DarkMode();
    })

    describe('After creating an instance', () => {
        test('should be in dark mode', () => {
            expect(darkMode.getMode()).toBe('dark');
        })
    })
});