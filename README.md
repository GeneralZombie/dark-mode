# dark-mode

## Table of Contents
- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Options](#options)
- [Methods](#methods)
- [Events](#events)
- [Thanks](#thanks)


## Features

- automatically adds a dark mode widget
- detects OS 
- can be used programmatically without widget
- remembers selection

## Install

### npm
```sh
npm install @twohundredcouches/dark-mode
```

### yarn

```sh
yarn add @twohundredcouches/dark-mode
```

## Usage

```js
import DarkMode from "@twohundredcouches/dark-mode";

new DarkMode();
```

or

```html
<script src="path/to/dark-mode.js"></script>
<script>
    new DarkMode();
</script>
```

## Options

```js
const DefaultOptions = {
    container: 'body',
    darkModeClassName: 'dark-mode-active',
    lightModeClassName: null,
    defaultDarkMode: false,
    remember: true,
    usePrefersColorScheme: true,
    widgetContainer: 'body',
    widgetClassName: 'dark-mode-widget',
    widgetBackgroundLight: '#aaa',
    widgetBackgroundDark: '#000',
    widgetToggleLight: '#fff',
    widgetToggleDark: '#fff',
    widgetSize: 3,
    widgetTransitionDuration: '0.1s',
    hideWidget: false,
    ariaLabelText: 'Toggle Dark Mode',
}
```

### `container`

*Type:* `String` *Default*: `'body'`

Query Selector for the element that dark mode will be applied to.

### `darkModeClassName`

*Type:* `String` *Default*: `'dark-mode-active'`

The name of the class that will be applied to the container element when dark mode is activated.

### `lightModeClassName`

*Type:* `String` *Default*: `null`

The name of the class that will be applied to the container element when light mode is activated.

### `defaultDarkMode`

*Type:* `Boolean` *Default*: `false`

If `true` start in dark mode by default. 

This setting will only be applied when no active mode was stored to localstorage and no preferred color is set. 

### `remember`

*Type:* `Boolean` *Default*: `true`

If `true` the selected mode will be stored in localstorage.

### `usePrefersColorScheme`

*Type:* `Boolean` *Default*: `true`

If `true` the `prefers-color-scheme` media feature will be used to set the default mode.

This setting will only be applied when no active mode was stored to localstorage.

### `widgetClassName`

*Type:* `String` *Default*: `'dark-mode-widget'`

Name of the class, that is given to the container element of the widget. Useful when the default class name conflicts with your naming conventions (or when you just like naming thinkgs).

### `useStyle`

*Type:* `Boolean` *Default*: `true`

If `false` no styling for the widget will be added. You will get a plain old checkbox. Useful if you want to do all styling yourself. If `hideWidget` is `true` styles won't be added regardless of this option. 

### `widgetBackgroundLight`

*Type:* `String` *Default*: `'#aaa'`

The background color of the widget in light mode.

### `widgetBackgroundDark`

*Type:* `String` *Default*: `'#000'`

The background color of the widget in dark mode.

### `widgetToggleLight`

*Type:* `String` *Default*: `'#fff'`

The color of the widget toggle in light mode.

### `widgetToggleDark`

*Type:* `String` *Default*: `'#fff'`

The color of the widget toggle in dark mode.

### `widgetSize`

*Type:* `Number` *Default*: `3`

The width of the widget in `rem`. The height is calculated in relation to this value. 

### `widgetTransitionDuration`

*Type:* `String` *Default*: `0.1s`

The duration for the widget transition. Takes any valid value for `transition-duration` CSS property. 

### `hideWidget`

*Type:* `Boolean` *Default*: `false`

If true the widget will not be rendered. 

Use this option, when you want to fully customize a dark mode toggle and/or set the active mode programmatically.

### `ariaLabelText`

*Type:* `String` *Default*: `Toggle Dark Mode`

Aria label for screen readers and accessibility. Won't be visible unless you have `useStyle` set to `false`.

## Methods

### `toggle()`

*Return:* `none`

Toggles dark mode.

### `on()`

*Return:* `none`

Enables dark mode.

### `off()`

*Return:* `none`

Disables dark mode.

### `setMode(mode)`

*Return:* `none`

Set mode to `light` or `dark`.

#### `mode`

*Type:* 'String' *Default:* `null` 

Required. Must be either `light` or `dark`

### `getMode()`

*Return:* `String`

Returns active mode (`light` or `dark`).

## Events

### `darkModeChanged`

Dispatched from container element when dark mode is manually or programmatically enabled or disabled.

Has active mode in default property of the event object.

## Testing

Run tests with ```npm test```.

## Thanks

I took inspiration from two other javascript dark mode modules: 

- https://www.npmjs.com/package/darkmode-js
- https://www.npmjs.com/package/darken

Check them out, they're great!
