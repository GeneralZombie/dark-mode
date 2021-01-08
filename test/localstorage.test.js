import DarkMode from '../dist/dark-mode';


let darkMode;

describe('Given an instance of Darkmode with localstorage setting "dark"', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });

        const localStorageMock = (function() {
            let store = {
                'dark-mode': 'dark'
            };
            return {
                getItem: function(key) {
                    return store[key];
                },
                setItem: function(key, value) {
                    store[key] = value.toString();
                },
                clear: function() {
                    store = {};
                },
                removeItem: function(key) {
                    delete store[key];
                }
            };
        })();

        Object.defineProperty(window, 'localStorage', { value: localStorageMock });

        darkMode = new DarkMode();
    })

    describe('After creating an instance and loading saved state from localstorage', () => {
        test('should be in dark mode', () => {
            expect(darkMode.getMode()).toBe('dark');
        })
    })
});