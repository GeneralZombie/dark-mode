import DarkMode from '../dist/dark-mode';

let darkMode;

describe('Given an instance of Darkmode with usePrefersColorScheme "false" and prefersColorScheme set to "dark"', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: (query) => {
                    if (query === '(prefers-color-scheme: dark)') {
                        return {
                            matches: true
                        }
                    }
                    return {
                        matches: false
                    }
                },
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });

        darkMode = new DarkMode({
            usePrefersColorScheme: false
        });
    })

    describe('After creating an instance', () => {
        test('should be in light mode', () => {
            expect(darkMode.getMode()).toBe('light');
        })
    })
});