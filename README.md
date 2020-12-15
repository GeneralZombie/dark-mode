# dark-mode

[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

Here is what the world needs right now: another dark mode module!

Why, oh God why, you ask? Because I figured that this is perfect for my first npm package.

## Features

- adds a (kind of) customizable dark mode switch to your website
- adds a class of your choice to an element (or even multiple elements) of your choice
- you can then add all the required styling yourself by using this class
- yep, you have to do the styling yourself, this just adds a class

## Install

You're still here? Okay, cool.

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
import darkMode from "@twohundredcouches/dark-mode";

darkMode(document.getElementById('dark-mode-toggle'));
```

Import the darkMode function from the module and pass it the element into which you want to inject the darkMode toggle.

As a second parameter you can pass a configuration object with the following options:

```js
{
    target: 'body', // where to apply the dark (and optional light) mode class. Can be element, class or id 
    darkModeClassName: 'dark', // the class that is applied to target when you enter dark mode
    lightModeClassName: '', // the class that is applied to target when you enter light mode
    initialState: 'light', // or 'dark'. In which mode you start when you load the page
}
```