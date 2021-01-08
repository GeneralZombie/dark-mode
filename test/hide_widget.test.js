import DarkMode from '../dist/dark-mode';

let darkMode;

describe('Given an instance without widget of Darkmode', () => {
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

        darkMode = new DarkMode({
            hideWidget: true
        });
    })

    describe('After creating an instance and loading saved state from localstorage', () => {
        test('should be in light mode', () => {
            expect(darkMode.getMode()).toBe('light');
        })
        test('container should not have custom dark-mode class', () => {
            expect(document.querySelector('body.dark-mode-active')).toBeNull();
        })
        test('widget should not be rendered', () => {
            expect(document.querySelector('.dark-mode-widget')).toBeNull();
        })
    })

    describe('After one toggle()', () => {
        beforeAll(() => {
            darkMode.toggle();
        })
        test('should be in dark mode', () => {
            expect(darkMode.getMode()).toBe('dark');
        })
        test('container should have dark-mode class', () => {
            expect(document.querySelector('body.dark-mode-active')).not.toBeNull();
        })
        test('widget should not be rendered', () => {
            expect(document.querySelector('.dark-mode-widget')).toBeNull();
        })
    })
});