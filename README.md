# react-scrollmagic

> React declarative component for ScrollMagic

[![NPM](https://img.shields.io/npm/v/react-scrollmagic.svg)](https://www.npmjs.com/package/react-scrollmagic)

## Install

```bash
npm install --save react-scrollmagic
```

## Usage

```jsx
import React from 'react';
import { SMController, SMScene } from 'react-scrollmagic';

const App = () => (
  <div>
    <SMController>
      <SMScene duration={600} pin={true}>
        <div>Sticky Example</div>
      </SMScene>
    </SMController>
  </div>
);
```

Examples live demo:

https://bitworking.github.io/react-scrollmagic/

Examples source:

https://github.com/bitworking/react-scrollmagic/tree/master/example/src/components/ScrollMagicExamples

## Documentation

These React components use http://scrollmagic.io/ and https://greensock.com/ internally. So for an in-depth documentation please visits following sites:

http://scrollmagic.io/docs/ScrollMagic.Controller.html  
http://scrollmagic.io/docs/ScrollMagic.Scene.html  
https://greensock.com/docs/TweenMax  
https://greensock.com/docs/TimelineMax

There are two components available:

## SMController

Props:

name | type | optional | default | more info
--- | --- | --- | --- | ---
container | string or object | yes | window
vertical | boolean | yes | true
globalSceneOptions | object | yes | {} | [link](http://scrollmagic.io/docs/ScrollMagic.Scene.html#constructor)
loglevel | number | yes | 2
refreshInterval | number | yes | 100

## SMScene

The SMScene component only consumes a single child. If you want to animate multiple children then you have to wrap them in a HTML element.

SMScene sets the ref for the child component automatically. This only works for HTML tags, Styled Components or React.forwardRef components. If you use stateless or stateful components then you need to set the triggerElement prop, pin and target selector or wrap them in a HTML tag. See [Components.js](https://github.com/bitworking/react-scrollmagic/blob/master/example/src/components/ScrollMagicExamples/Components.js) code  for an example.

Props:

name | type | optional | default | more info
--- | --- | --- | --- | ---
duration | number or string | yes | 0 
offset | number or string | yes | 0
triggerElement | string, object or null | yes | child element
triggerHook | number or string | yes | "onCenter" | [link](http://scrollmagic.io/docs/ScrollMagic.Scene.html#constructor)
reverse | boolean | yes | true
loglevel | number | yes | 2
indicators | boolean | yes | false | only boolean in contrast to plugin options: [link](http://scrollmagic.io/docs/debug.addIndicators.html#Scene.addIndicators)
classToggle | string or string[2] | yes | undefined | [link](http://scrollmagic.io/docs/ScrollMagic.Scene.html#setClassToggle)
pin | boolean or string | yes | undefined | [link](http://scrollmagic.io/docs/ScrollMagic.Scene.html#setPin)
pinSettings | PinSettings | yes | undefined | See Types and [link](http://scrollmagic.io/docs/ScrollMagic.Scene.html#setPin)
tween | Tween | yes | undefined | See Types and [link](https://greensock.com/docs/TweenMax)
timeline | Timeline | yes | undefined | See Types and [link](https://greensock.com/docs/TimelineMax)
  
## Types

### PinSettings

name | type | optional | default
--- | --- | --- | ---
pushFollowers | boolean | yes | true
spacerClass | string | yes | "scrollmagic-pin-spacer"

### Tween

name | type | optional | default | more info
--- | --- | --- | --- | ---
target | any | yes | child element
duration | number | yes | 1
from | any | yes | undefined | [link](https://greensock.com/docs/TimelineMax/from())
to | any | yes | undefined | [link](https://greensock.com/docs/TimelineMax/to())
staggerFrom | any | yes | undefined | [link](https://greensock.com/docs/TimelineMax/staggerFrom())
staggerTo | any | yes | undefined | [link](https://greensock.com/docs/TimelineMax/staggerTo())
stagger | number | yes | 0
onCompleteAll | Function | yes | null
position | number or string | yes | "+=0" | only used if tween is part of timeline

If from and to are set, then [TimelineMax.fromTo()](https://greensock.com/docs/TimelineMax/fromTo()) is used.  
If staggerFrom and staggerTo are set, then [TimelineMax.staggerFromTo()](https://greensock.com/docs/TimelineMax/staggerFromTo()) is used.

Examples:

```jsx
// from, to, staggerFrom and staggerTo are not set, so TimelineMax.to() is used
const App = () => (
  <div>
    <SMController>
      <SMScene
        duration={300}
        tween={{
          css: {
            left: '0px',
            rotation: -360,
          },
          ease: 'Strong.easeOut',
        }}>
        <div>Tween.to Test</div>
      </SMScene>
    </SMController>
  </div>
);
```

```jsx
// from and to are set, so TimelineMax.fromTo() is used
const App = () => (
  <div>
    <SMController>
      <SMScene
        duration={200}
        tween={{
          from: {
            css: {
              left: '0px',
              rotation: -360,
            },
            ease: 'Strong.easeOut',
          },
          to: {
            css: {
              left: '100px',
              rotation: -180,
            },
            ease: 'Strong.easeOut',
          },
        }}>
        <div>Tween.fromTo Test</div>
      </SMScene>
    </SMController>
  </div>
);
```

### Timeline

name | type | optional | default
--- | --- | --- | ---
tweens | Tween[] | yes | undefined
delay | number | yes | 0
stagger | number | yes | 0
align | "sequence", "start" or "normal" | yes | "normal"
repeat | number | yes | 0
repeatDelay | number | yes | 0
yoyo | boolean | yes | false

Examples:

```jsx
// The use of the "css" property (like in the Tween examples) would be more efficient but it also works without.
// The GreenSock TweenMax function figures it out by itself which are css properties
// and which are Tween properties.
const App = () => (
  <div>
    <SMController>
      <SMScene
        pin={true}
        reverse={true}
        offset={100}
        duration={800}
        timeline={{
          tweens: [
            {
              target: '.text',
              staggerFrom: {
                opacity: 0,
                color: '#ff0000',
              },
              stagger: 0.15,
            },
            {
              target: '.textContainer',
              to: {
                scale: 2
              },
            },
            {
              target: '.textContainer',
              to: {
                scaleY: 0,
                ease: 'Bounce.easeOut',
              },
            },
          ]
        }}
      >
        <div className="textContainer">
          <span className="text">G</span>
          <span className="text">A</span>
          <span className="text">N</span>
          <span className="text">G</span>
          <span className="text">S</span>
          <span className="text">T</span>
          <span className="text">A</span>
        </div>
      </SMScene>
    </SMController>
  </div>
);
```

This project was bootstrapped with:

https://github.com/transitive-bullshit/create-react-library

## License

MIT © [bitworking](https://github.com/bitworking)
