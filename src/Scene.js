// @flow
import { default as React } from 'react';
import ScrollMagic from './lib/scrollmagic';
import debugAddIndicators from './lib/debug.addIndicators.js';

debugAddIndicators(ScrollMagic);

export type PinSettings = {
  pushFollowers?: boolean,
  spacerClass?: string,
}

export type SceneProps = {
  children: Node | Function,

  // scene parameters
  duration?: number | string,
  offset?: number | string,
  triggerElement?: string | object,
  triggerHook?: number | string,
  reverse?: boolean,
  loglevel?: number,
  indicators?: boolean,
  enabled?: boolean,

  /* setClassToggle */
  classToggle?: string | Array<string>,

  /* setPin */
  pin?: boolean | PinSettings,

}

export type SceneBaseProps = SceneProps & {
  controller: any,
}

export type SceneBaseState = {
  event: string,
  progress: number,
}

const refOrInnerRef = (child: any) => {
  if (child.type.$$typeof && child.type.$$typeof.toString() === 'Symbol(react.forward_ref)') {
    return 'ref';
  }

  // styled-components < 4
  if (child.type.styledComponentId) {
    return 'innerRef';
  }

  return 'ref';
}

class SceneBase extends React.PureComponent<SceneBaseProps, SceneBaseState> {
  ref: HTMLElement;
  scene: any;
  state: SceneBaseState = {
    event: 'init',
    progress: 0,
  }

  componentDidMount() {
    const {
      children,
      controller,
      classToggle,
      pin,
      pinSettings,
      indicators,
      enabled,
      ...sceneParams
    } = this.props;

    //this.check(children, pin, sceneParams);

    const element = this.ref;
    sceneParams.triggerElement = sceneParams.triggerElement === null ? null : sceneParams.triggerElement || element;

    this.scene = new ScrollMagic.Scene(sceneParams);

    this.initEventHandlers();

    if (classToggle) {
      this.setClassToggle(this.scene, element, classToggle);
    }

    if (pin) {
      this.setPin(this.scene, element, pin);
    }

    if (indicators) {
      this.scene.addIndicators({ name: ' ' });
    }

    this.scene.addTo(controller);
  }

  componentWillUnmount() {
    this.scene.destroy();
  }

  check(children, pin, sceneParams) {
    if (!children || (typeof children !== 'function' && children.type.displayName === 'Scene')) {
      if (pin === true) {
        throw new Error('Prop pin cannot be true. Use an element or element selector if children is null or if you nest a Scene in another Scene.');
      }
      if (!sceneParams.triggerElement) {
        throw new Error('You have to define a triggerElement if children is null or if you nest a Scene in another Scene.');
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

  setPin(scene, element, pin) {
    scene.setPin(element, pin);
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

    if (children && typeof children === 'function') {
      children = children(event, progress);
    }

    const child = React.Children.only(children);
    return React.cloneElement(child, { [refOrInnerRef(child)]: ref => this.ref = ref });
  }
}

class Scene extends React.PureComponent<SceneProps, {}> {
  static displayName = 'Scene';

  render() {
    if (!this.props.controller) {
      let { children } = this.props;

      if (children && typeof children === 'function') {
        children = children('init', 0);
      }

      const child = React.Children.only(children);
      return child;
    }

    return (
      <SceneBase {...this.props} />
    );
  }
}

export { Scene };
