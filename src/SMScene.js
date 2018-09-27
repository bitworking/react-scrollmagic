// @flow
import { default as React, Fragment } from 'react';
import type { Node } from 'react';
import { SMContext } from './SMController';
import { default as ScrollMagic } from 'scrollmagic';
import { TimelineMax as Timeline, TweenMax as Tween } from 'gsap/TweenMax';
import 'gsap/TextPlugin';
import animationGsap from './animation.gsap.js';
import debugAddIndicators from './debug.addIndicators.js';

animationGsap(ScrollMagic, Timeline, Tween);
debugAddIndicators(ScrollMagic);

type TweenType = {
  target?: any,
  duration?: number,
  from?: any,
  to?: any,
  staggerFrom?: any,
  staggerTo?: any,
  stagger?: number,
  onCompleteAll?: Function,
  position?: number | string,
}

type Props = {
  children: Node | Function,

  // scene parameters
  duration?: number | string,
  enabled?: boolean,
  loglevel?: number,
  offset?: number | string,
  reverse?: boolean,
  triggerElement?: any,
  triggerHook?: any,
  indicators?: boolean,

  /* setClassToggle */
  classToggle?: string | Array<string>,

  /* setPin */
  pin?: boolean | string,
  pinSettings?: {
    pushFollowers?: boolean,
    spacerClass?: string
  },

  /* setTween */
  tween?: TweenType,

  timeline?: {
    tweens: Array<TweenType>,
    delay?: number,
    stagger?: number,
    align?: 'sequence' | 'start' | 'normal',
    repeat?: number,
    repeatDelay?: number,
    yoyo?: boolean,

  },

}

type PropsBase = Props & {
  context: any,
}

type State = {
  event: string,
  progress: number,
}

const getTweenFunction = (element, tween) => {
  const {
    target,
    duration,
    from,
    to,
    staggerFrom,
    staggerTo,
    stagger,
    onCompleteAll,
    position,
    ...vars
  } = tween;

  let tweenFunction;
  const target$ = target || element;
  const duration$ = duration || 1;
  const stagger$ = stagger || 0;
  const onCompleteAll$ = onCompleteAll || null;

  if (from && to) {
    tweenFunction = Tween.fromTo(target$, duration$, from, to);
  }
  else if (from) {
    tweenFunction = Tween.from(target$, duration$, from);
  }
  else if (staggerFrom && staggerTo) {
    tweenFunction = Tween.staggerFromTo(target$, duration$, staggerFrom, staggerTo, stagger$, onCompleteAll$);
  }
  else if (staggerFrom) {
    tweenFunction = Tween.staggerFrom(target$, duration$, staggerFrom, stagger$, onCompleteAll$);
  }
  else if (staggerTo) {
    tweenFunction = Tween.staggerTo(target$, duration$, staggerTo, stagger$, onCompleteAll$);
  }
  else {
    tweenFunction = Tween.to(target$, duration$, to || vars);
  }
  return tweenFunction;
};

class SMSceneBase extends React.PureComponent<PropsBase, State> {
  ref: HTMLElement;
  scene: any;
  state = {
    event: 'init',
    progress: 0,
  }

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    const {
      children,
      classToggle,
      pin,
      pinSettings,
      tween,
      timeline,
      context,
      indicators,
      ...sceneParams
    } = this.props;

    this.check(children, pin, sceneParams);

    const element = this.ref.current;
    sceneParams.triggerElement = sceneParams.triggerElement === null ? null : sceneParams.triggerElement || element;

    this.scene = new ScrollMagic.Scene(sceneParams);

    this.initEventHandlers();

    if (classToggle) {
      this.setClassToggle(this.scene, element, classToggle);
    }

    if (pin || pinSettings) {
      this.setPin(this.scene, element, pin, pinSettings);
    }

    if (indicators) {
      this.scene.addIndicators({ name: ' ' });
    }

    if (tween) {
      this.scene.setTween(getTweenFunction(element, tween));
    }
    else if (timeline) {
      this.setTimeline(this.scene, element, timeline);
    }

    this.scene.addTo(context.controller);
  }

  componentWillUnmount() {
    this.scene.destroy();
  }

  check(children, pin, sceneParams) {
    if (!children || (typeof children !== 'function' && children.type.displayName === 'SMScene')) {
      if (pin === true) {
        throw new Error('Prop pin cannot be true. Use an element or element selector if children is null or if you nest a SMScene in another SMScene.');
      }
      if (!sceneParams.triggerElement) {
        throw new Error('You have to define a triggerElement if children is null or if you nest a SMScene in another SMScene.');
      }
    }
  }

  setClassToggle(scene, element, classToggle) {
    if (Array.isArray(classToggle) && classToggle.length === 2) {
      scene.setClassToggle(classToggle[0], classToggle[1]);
    }
    else {
      scene.setClassToggle(element, classToggle);
    }
  }

  setPin(scene, element, pin, pinSettings) {
    scene.setPin(pin === true ? element : pin, pinSettings);
  }

  setTimeline(scene, element, timeline) {
    const { tweens, ...vars } = timeline;
    const timelineObject = new Timeline(vars);
    if (tweens && Array.isArray(tweens)) {
      tweens.forEach(tween => {
        const { position } = tween;
        timelineObject.add(getTweenFunction(element, tween), position || '+=0');
      });
      scene.setTween(timelineObject);
    }
  }

  initEventHandlers() {
    let { children } = this.props;
    if (typeof children !== 'function') {
      return;
    }

    this.scene.on('start', (event) => {
      this.setState({
        event: 'start'
      });
    });

    this.scene.on('end', (event) => {
      this.setState({
        event: 'end'
      });
    });

    this.scene.on('enter', (event) => {
      this.setState({
        event: 'enter'
      });
    });

    this.scene.on('leave', (event) => {
      this.setState({
        event: 'leave'
      });
    });

    this.scene.on('progress', (event) => {
      this.setState({
        progress: event.progress
      });
    });
  }

  render() {
    let { children } = this.props;
    const { event, progress } = this.state;

    let childrenCloned = null;

    if (children) {
      if (typeof children === 'function') {
        children = children(event, progress);
      }

      // only one root child component
      children = React.Children.only(children);

      // console.log(children, children.props.children);

      let ref = null;

      // HTML tag
      if (typeof children.type === 'string') {
        ref = { ref: this.ref };
      }
      // Forwarding Refs
      else if (children.type.$$typeof && children.type.$$typeof.toString() === 'Symbol(react.forward_ref)') {
        ref = { ref: this.ref };
      }
      // StyledComponent
      else if (children.type.styledComponentId) {
        ref = { innerRef: this.ref };
      }
      // SMScene
      else if (children.type.displayName && children.type.displayName === 'SMScene') {
        ref = { ref: this.ref };
      }
      // Stateful Component
      else if (children.type.prototype && children.type.prototype.isReactComponent) {
        // https://github.com/facebook/react/issues/11401#issuecomment-340543801
        throw new Error('Stateful components not yet supported by SMScene. Use a HTML wrapper.');
      }
      else {
        throw new Error('Stateless components not yet supported by SMScene. Use a HTML wrapper.');
      }

      childrenCloned = React.cloneElement(children, ref);
    }

    return (
      <Fragment>
        {childrenCloned}
      </Fragment>
    );
  }
}

class SMScene extends React.PureComponent<Props, {}> {
  static displayName = 'SMScene';

  render() {
    return (
      <SMContext.Consumer>
        {(context) => (
          <SMSceneBase context={context} {...this.props} />
        )}
      </SMContext.Consumer>
    );
  }
}

export { SMScene };
