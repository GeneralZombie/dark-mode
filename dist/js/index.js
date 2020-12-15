const DARK_MODE = 'dark'
const LIGHT_MODE = 'light'

const Default = {
    target: 'body',
    darkModeClassName: 'dark',
    lightModeClassName: '',
    initialState: 'light', // or 'dark'
    inputId: 'dark-mode-input',
    labelText: 'Dark Mode'
}

function darkMode(element, config = {}) {
    config = {
        ...Default,
        ...config
    }

    const targetElement = _getTargetElement();

    _createToggle();
    _addEventListener();
    _setMode(config.initialState);

    function _createToggle() {
        const inputElement = document.createElement('input');
        inputElement.type = 'checkbox';
        inputElement.id = config.inputId;
        if (config.initialState === DARK_MODE) {
            inputElement.checked = true;
        }
        const labelElement = document.createElement('label');
        labelElement.setAttribute('for', config.inputId);
        labelElement.innerHTML = config.labelText;
        element.append(inputElement);
        element.append(labelElement);
    }

    function _getTargetElement() {
        switch (config.target.charAt(0)) {
            case '#':
                return document.getElementById(config.target.substring(1));
            case '.':
                return document.getElementsByClassName(config.target.substring(1));
            default:
                return document.getElementsByTagName(config.target);
        }
    }

    function _addEventListener() {
        const inputElement = document.getElementById(config.inputId);
        inputElement.addEventListener('change', (event) => {
            _setMode(event.target.checked? DARK_MODE : LIGHT_MODE);
        })
    }

    function _setMode(mode) {
        if (mode === DARK_MODE) {
            if (config.lightModeClassName) {
                if (targetElement instanceof HTMLCollection) {
                    for (let i = 0; i < targetElement.length; i++) {
                        targetElement[i].classList.remove(config.lightModeClassName);
                    }
                } else {
                    targetElement.classList.remove(config.lightModeClassName);
                }
            }
            if (config.darkModeClassName) {
                if (targetElement instanceof HTMLCollection) {
                    for (let i = 0; i < targetElement.length; i++) {
                        targetElement[i].classList.add(config.darkModeClassName);
                    }
                } else {
                    targetElement.classList.add(config.darkModeClassName);
                }
            }
        }

        if (mode === LIGHT_MODE) {
            if (config.darkModeClassName) {
                if (targetElement instanceof HTMLCollection) {
                    for (let i = 0; i < targetElement.length; i++) {
                        targetElement[i].classList.remove(config.darkModeClassName);
                    }
                } else {
                    targetElement.classList.remove(config.darkModeClassName);
                }
            }
            if (config.lightModeClassName) {
                if (targetElement instanceof HTMLCollection) {
                    for (let i = 0; i < targetElement.length; i++) {
                        targetElement[i].classList.add(config.lightModeClassName);
                    }
                } else {
                    targetElement.classList.add(config.lightModeClassName);
                }
            }
        }
    }
}

module.exports = darkMode;