import DarkMode from '../dist/dark-mode';


let darkMode;

describe('Given an instance of Darkmode with remember "false" and localstorage setting "dark"', () => {
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

        darkMode = new DarkMode({
            remember: false
        });
    })

    describe('After creating an instance', () => {
        test('should be in light mode', () => {
            expect(darkMode.getMode()).toBe('light');
        })
    })
});