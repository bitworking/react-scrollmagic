# react-scrollmagic

> React components for ScrollMagic

[![NPM](https://img.shields.io/npm/v/react-scrollmagic.svg)](https://www.npmjs.com/package/react-scrollmagic)

# Introduction

react-scrollmagic lets you use the [ScrollMagic](http://scrollmagic.io/) library in React in a fully declarative way. It abstracts away the direct use of the ScrollMagic classes [ScrollMagic.Controller](http://scrollmagic.io/docs/ScrollMagic.Controller.html) and [ScrollMagic.Scene](http://scrollmagic.io/docs/ScrollMagic.Scene.html).

From version 2 on the GSAP library in no more included. But react-scrollmagic plays nicely together with [react-gsap](https://github.com/bitworking/react-gsap).

## Install

```bash
npm install --save react-scrollmagic
```

## Usage

```jsx
import React from 'react';
import { Controller, Scene } from 'react-scrollmagic';

const App = () => (
  <div>
    <Controller>
      <Scene duration={600} pin>
        <div>Sticky Example</div>
      </Scene>
    </Controller>
  </div>
);
```

Examples live demo:

https://bitworking.github.io/react-scrollmagic/

Examples source:

https://github.com/bitworking/react-scrollmagic/tree/master/example/src/components/ScrollMagicExamples

# Documentation

These React components use http://scrollmagic.io/ internally. So for an in-depth documentation please visits following sites:

http://scrollmagic.io/docs/ScrollMagic.Controller.html  
http://scrollmagic.io/docs/ScrollMagic.Scene.html  

There are two components available:

## Controller

Props:

name | type | optional | default | more info
--- | --- | --- | --- | ---
container | string or object | yes | window
vertical | boolean | yes | true
globalSceneOptions | object | yes | {} | [link](http://scrollmagic.io/docs/ScrollMagic.Scene.html#constructor)
loglevel | number | yes | 2
refreshInterval | number | yes | 100

## Scene

The Scene component only consumes a single child. If you want to animate multiple children then you have to wrap them in a HTML element.

Scene sets the ref for the child component automatically. This only works for HTML tags, Styled Components or React.forwardRef components. If you use stateless or stateful components then you need to set the triggerElement or pin prop or wrap them in a HTML tag. See [Components.js](https://github.com/bitworking/react-scrollmagic/blob/master/example/src/components/ScrollMagicExamples/Components.js) for an example.

The Scene component also works with a function as child. The function takes an animation progress (0-1) as first parameter and the event object as second parameter. See [ClassToggle.js](https://github.com/bitworking/react-scrollmagic/blob/master/example/src/components/ScrollMagicExamples/ClassToggle.js) for an example.

From version 2 on it also works with a [react-gsap](https://github.com/bitworking/react-gsap) Tween or Timeline component as direct child. See [SectionWipes2.js](https://github.com/bitworking/react-scrollmagic/blob/master/example/src/components/ScrollMagicExamples/SectionWipes2.js) for an example.

Props:

name | type | optional | default | more info
--- | --- | --- | --- | ---
duration | number or string | yes | 0 | Can be changed on-the-fly
offset | number or string | yes | 0 | Can be changed on-the-fly
triggerElement | string, object or null | yes | child element
triggerHook | number or string | yes | "onCenter" | [link](http://scrollmagic.io/docs/ScrollMagic.Scene.html#constructor) (Can be changed on-the-fly)
reverse | boolean | yes | true | Can be changed on-the-fly
loglevel | number | yes | 2
indicators | boolean | yes | false | only boolean in contrast to plugin options: [link](http://scrollmagic.io/docs/debug.addIndicators.html#Scene.addIndicators)
classToggle | string or string[2] | yes | undefined | [link](http://scrollmagic.io/docs/ScrollMagic.Scene.html#setClassToggle)
pin | boolean or string | yes | undefined | [link](http://scrollmagic.io/docs/ScrollMagic.Scene.html#setPin)
pinSettings | PinSettings | yes | undefined | See Types and [link](http://scrollmagic.io/docs/ScrollMagic.Scene.html#setPin)
enabled | boolean | yes | true | Can be changed on-the-fly
progressEvents | boolean | yes | true | Ability to silence progress events reducing redraws
  
## Types

### PinSettings

name | type | optional | default
--- | --- | --- | ---
pushFollowers | boolean | yes | true
spacerClass | string | yes | "scrollmagic-pin-spacer"


This project was bootstrapped with:

https://github.com/transitive-bullshit/create-react-library

## License

MIT © [bitworking](https://github.com/bitworking)
