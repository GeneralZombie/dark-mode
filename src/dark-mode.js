const DARK_MODE = 'dark'
const LIGHT_MODE = 'light'

const LOCAL_STORAGE_KEY = 'dark-mode';

const DefaultOptions = {
    container: 'body',
    darkModeClassName: 'dark-mode-active',
    lightModeClassName: null,
    defaultDarkMode: false,
    remember: true,
    usePrefersColorScheme: true,
    widgetContainer: 'body',
    widgetClassName: 'dark-mode-widget',
    useStyle: true,
    widgetBackgroundLight: '#aaa',
    widgetBackgroundDark: '#000',
    widgetToggleLight: '#fff',
    widgetToggleDark: '#fff',
    widgetSize: 3,
    widgetTransitionDuration: '0.1s',
    hideWidget: false,
    ariaLabelText: 'Toggle Dark Mode'
}

class DarkMode {
    constructor(options = {}) {
        this.options = {
            ...DefaultOptions,
            ...options
        }
        this.id = this._uniqid();

        this.containerElement = document.querySelector(this.options.container);
        if (!this.containerElement) {
            this.containerElement = document.getElementsByTagName('body');
        }

        this.mode = this._getInitialMode();

        if (!this.options.hideWidget) {
            if (this.options.useStyle) {
                this._addStyle();
            }

            this._createWidget(document.querySelector(this.options.widgetContainer));

            this._addEventListener();
        }

        this.setMode(this.mode);
    }

    on() {
        this.setMode(DARK_MODE);
    }

    off() {
        this.setMode(LIGHT_MODE);
    }

    setMode(mode) {
        if (!this._modeIsValid(mode)) {
            throw new Error('Invalid mode provided! Must be either "' + LIGHT_MODE + '" or "' + DARK_MODE + '"')
        }

        if (!this.options.hideWidget) {
            this.inputElement.checked = (mode === DARK_MODE);
        }

        this._handleModeChange(mode);
    }

    getMode() {
        return this.mode;
    }

    toggle() {
        if (!this.options.hideWidget) {
            this.inputElement.checked = !this.inputElement.checked;

            const event = document.createEvent("HTMLEvents");
            event.initEvent('change', false, true);
            this.inputElement.dispatchEvent(event);

        } else {
            if (this.mode === LIGHT_MODE) {
                this._handleModeChange(DARK_MODE);
            } else {
                this._handleModeChange(LIGHT_MODE)
            }
        }
    }

    _handleModeChange(mode) {
        this.mode = mode;

        if (mode === DARK_MODE) {
            if (this.options.lightModeClassName) {
                this.containerElement.classList.remove(this.options.lightModeClassName);
            }
            if (this.options.darkModeClassName) {
                this.containerElement.classList.add(this.options.darkModeClassName);
            }
        }

        if (mode === LIGHT_MODE) {
            if (this.options.darkModeClassName) {
                this.containerElement.classList.remove(this.options.darkModeClassName);
            }
            if (this.options.lightModeClassName) {
                this.containerElement.classList.add(this.options.lightModeClassName);
            }
        }

        if (this.options.remember) {
            this._saveModeToLocalStorage(mode);
        }

        this._triggerModeChangedEvent(mode);
    }

    _triggerModeChangedEvent(mode) {
        const event = new CustomEvent('darkModeChanged', {detail: {darkMode: mode === DARK_MODE}})
        this.containerElement.dispatchEvent(event);
    }

    _getInitialMode() {
        const mode = this._loadModeFromLocalStorage();

        if (this._modeIsValid(mode)) {
            return mode;
        }

        if (this.options.usePrefersColorScheme) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return DARK_MODE;
            }
            if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                return LIGHT_MODE;
            }
        }

        if (this.options.defaultDarkMode) {
            return DARK_MODE;
        }

        return LIGHT_MODE;
    }

    _modeIsValid(mode) {
        return mode === LIGHT_MODE || mode === DARK_MODE;
    }

    _addEventListener() {
        this.inputElement.addEventListener('change', (event) => {
            this._handleModeChange(event.target.checked ? DARK_MODE : LIGHT_MODE);
        })
    }

    _createWidget(element) {
        if (!element) {
            element = document.getElementsByTagName('body');
        }

        const wrapperElement = document.createElement('span');
        wrapperElement.classList.add(this.options.widgetClassName);

        this.inputElement = document.createElement('input');
        this.inputElement.type = 'checkbox';
        const inputId = this._uniqid('dark-mode-widget-input-');
        this.inputElement.id = inputId;
        this.inputElement.checked = (this.mode === DARK_MODE);

        const labelElement = document.createElement('label');
        labelElement.setAttribute('for', inputId);
        labelElement.setAttribute('aria-label', this.options.ariaLabelText);
        labelElement.innerHTML = this.options.ariaLabelText;

        wrapperElement.append(this.inputElement);
        wrapperElement.append(labelElement);

        element.prepend(wrapperElement);
    }

    _saveModeToLocalStorage(mode) {
        if (!this.options.remember) {
            return;
        }

        if (this._modeIsValid(mode) && mode !== window.localStorage.getItem(LOCAL_STORAGE_KEY)) {
            window.localStorage.setItem(LOCAL_STORAGE_KEY, mode);
        }
    }

    _loadModeFromLocalStorage() {
        if (!this.options.remember) {
            return null;
        }

        return window.localStorage.getItem(LOCAL_STORAGE_KEY);
    }

    _addStyle() {
        const width = this.options.widgetSize;
        const height = this.options.widgetSize / 2;

        const css = `
            .${this.options.widgetClassName} input[type=checkbox] {
                height: 0;
                width: 0;
                display: none;
            }
            .${this.options.widgetClassName} input[type=checkbox] + label {
                background: ${this.options.widgetBackgroundLight};
                transition: ${this.options.widgetTransitionDuration};
                cursor: pointer;
                text-indent: -9999px;
                width: ${width + 'rem'};
                height: ${height + 'rem'};
                border-radius: ${width + 'rem'};
                display: block;
                position: relative;
            }
            .${this.options.widgetClassName} input[type=checkbox] + label:after {
                background: ${this.options.widgetToggleLight};
                transition: ${this.options.widgetTransitionDuration};
                content: '';
                position: absolute;
                top: ${(height * 0.05) + 'rem'};
                left: ${(height * 0.05) + 'rem'};
                width: ${(height * 0.9) + 'rem'};
                height: ${(height * 0.9) + 'rem'};
                border-radius: ${(height * 0.9) + 'rem'}
            }
            .${this.options.widgetClassName} input[type=checkbox] + label:after:active {
                width:  ${(width * 0.65) + 'rem'}
            }
            .${this.options.widgetClassName} input[type=checkbox]:checked + label {
                background: ${this.options.widgetBackgroundDark};
            }
            .${this.options.widgetClassName} input[type=checkbox]:checked + label:after {
                background: ${this.options.widgetToggleDark};
                left: calc(100% - 0.075rem);
                transform: translateX(-100%);
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = css;

        document.head.appendChild(styleElement);
    }

    _uniqid(a = '', b = false) {
        const c = Date.now() / 1000;
        let d = c.toString(16).split(".").join("");
        while (d.length < 14) d += "0";
        let e = "";
        if (b) {
            e = ".";
            e += Math.round(Math.random() * 100000000);
        }
        return a + d + e;
    }
}

export default DarkMode;