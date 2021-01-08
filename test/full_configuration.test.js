import DarkMode from '../dist/dark-mode';

let darkMode;

describe('Given an instance with custom options of Darkmode', () => {
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
            defaultDarkMode: true,
            darkModeClassName: 'custom-dark-mode-class',
            lightModeClassName: 'custom-light-mode-class',
            widgetClassName: 'custom-dark-mode-widget-class',
            ariaLabelText: 'Custom Aria Label Text',
            widgetBackgroundLight: 'rgb(0, 255, 0)',
            widgetBackgroundDark: 'rgb(255, 0, 0)',
            widgetToggleLight: 'rgb(0, 0, 255)',
            widgetToggleDark: 'rgb(0, 255, 255)',
            widgetSize: 2,
            widgetTransitionDuration: '0.3s',
        });
    })

    describe('After creating an instance', () => {
        test('should be in dark mode', () => {
            expect(darkMode.getMode()).toBe('dark');
        })
        test('container should have dark-mode class', () => {
            expect(document.querySelector('body.custom-dark-mode-class')).not.toBeNull();
        })
        test('container should not have light-mode class', () => {
            expect(document.querySelector('body.custom-light-mode-class')).toBeNull();
        })
        test('widget should be rendered with custom class', () => {
            expect(document.querySelector('.custom-dark-mode-widget-class')).not.toBeNull();
            expect(document.querySelector('.custom-dark-mode-widget-class input[type=checkbox]')).not.toBeNull();
            expect(document.querySelector('.custom-dark-mode-widget-class label')).not.toBeNull();

        })
        test('aria label should have custom text', () => {
      //      expect(document.querySelector('.custom-dark-mode-widget-class label')).to.have.attribute('aria-label', 'Custom Aria Label Text')
       //     expect(document.querySelector('.custom-dark-mode-widget-class label')).to.have.text('Custom Aria Label Text')
        })
        test('custom style options should be applied', () => {
            const labelStyleDark = getComputedStyle(document.querySelector('.custom-dark-mode-widget-class label'));
            expect(labelStyleDark['background-color']).toBe('rgb(255, 0, 0)');

            //const labelAfterStyleDark = getComputedStyle(document.querySelector('.custom-dark-mode-widget-class label'), ':after');
            //expect(labelAfterStyleDark['background-color']).toBe('rgb(0, 255, 255)');
        })
        test('widget should be checked', () => {
            expect(document.querySelector('.custom-dark-mode-widget-class input[type="checkbox"]').checked).toBe(true);
        })
    })

    describe('After one toggle()', () => {
        beforeAll(() => {
            darkMode.toggle();
        })
        test('should be in light mode', () => {
            expect(darkMode.getMode()).toBe('light');
        })
        test('container should not have custom dark-mode class', () => {
            expect(document.querySelector('body.custom-dark-mode-class')).toBeNull();
        })
        test('container should have custom light-mode class', () => {
            expect(document.querySelector('body.custom-light-mode-class')).not.toBeNull();
        })
        test('widget should not be checked', () => {
            expect(document.querySelector('.custom-dark-mode-widget-class input[type="checkbox"]').checked).not.toBe(true);
        })
        test('custom style options should be applied', () => {
            const labelStyleLight = getComputedStyle(document.querySelector('.custom-dark-mode-widget-class label'));
            expect(labelStyleLight['background-color']).toBe('rgb(0, 255, 0)');

            //const labelAfterStyleLight = getComputedStyle(document.querySelector('.custom-dark-mode-widget-class label'), ':after');
            //expect(labelAfterStyleLight['background-color']).toBe('rgb(0, 255, 255)');
        })
    })
});