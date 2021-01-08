import DarkMode from '../dist/dark-mode';

let darkMode;

describe('Given a default instance of Darkmode', () => {
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

        darkMode = new DarkMode();
    })

    describe('After creating an instance', () => {
        test('widget should be visible', () => {
            expect(document.querySelector('.dark-mode-widget')).not.toBeNull();
            expect(document.querySelector('.dark-mode-widget input[type=checkbox]')).not.toBeNull();
            expect(document.querySelector('.dark-mode-widget label')).not.toBeNull();
        })
        test('should be in light mode', () => {
            expect(darkMode.getMode()).toBe('light');
        })
        test('widget should not be checked', () => {
            expect(document.querySelector('.dark-mode-widget input[type=checkbox]').checked).not.toBe(true);
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
        test('widget should be checked', () => {
            expect(document.querySelector('.dark-mode-widget input[type="checkbox"]').checked).toBe(true);
        })
    })

    describe('After one more toggle()', () => {
        beforeAll(() => {
            darkMode.toggle();
        })
        test('should be in light mode', () => {
            expect(darkMode.getMode()).toBe('light');
        })
        test('container should not have dark-mode class', () => {
            expect(document.querySelector('body.dark-mode-active')).toBeNull();
        })
        test('widget should not be checked', () => {
            expect(document.querySelector('.dark-mode-widget input[type=checkbox]').checked).not.toBe(true);
        })

    })

    describe('After calling on()', () => {
        beforeAll(() => {
            darkMode.on();
        })
        test('should be in dark mode', () => {
            expect(darkMode.getMode()).toBe('dark');
        })
        test('widget should be checked', () => {
            expect(document.querySelector('.dark-mode-widget input[type=checkbox]').checked).toBe(true);
        })
    })

    describe('After calling off()', () => {
        beforeAll(() => {
            darkMode.off();
        })
        test('should be in light mode', () => {
            expect(darkMode.getMode()).toBe('light');
        })
        test('widget should not be checked', () => {
            expect(document.querySelector('.dark-mode-widget input[type=checkbox]').checked).not.toBe(true);
        })
    })

    describe('After calling setMode("dark")', () => {
        beforeAll(() => {
            darkMode.setMode('dark');
        })
        test('should be in dark mode', () => {
            expect(darkMode.getMode()).toBe('dark');
        })
        test('widget should be checked', () => {
            expect(document.querySelector('.dark-mode-widget input[type=checkbox]').checked).toBe(true);
        })
    })

    describe('After calling setMode("light")', () => {
        beforeAll(() => {
            darkMode.setMode('light');
        })
        test('should be in light mode', () => {
            darkMode.setMode('light');
            expect(darkMode.getMode()).toBe('light');
        })
        test('widget should not be checked', () => {
            expect(document.querySelector('.dark-mode-widget input[type=checkbox]').checked).not.toBe(true);
        })
    })

    describe('After calling setMode with invalid value', () => {
        test('should throw error', () => {
            expect(() => darkMode.setMode('invalid value')).toThrow();
        })
    })
});
