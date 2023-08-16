// @flow
import React, { forwardRef, useRef, useCallback } from 'react';
import { ControllerContext } from './Controller';
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
  progressEvents?: boolean,

  /* setClassToggle */
  classToggle?: string | Array<string>,

  /* setPin */
  pin?: boolean | PinSettings,

}

export type SceneBaseProps = SceneProps & {
  controller: any,
}

export type SceneBaseState = {
  progress: number,
  event: any,
}

const refOrInnerRef = (child: any) => {
  if (
    child.type && 
    child.type.$$typeof && 
    child.type.$$typeof.toString() === 'Symbol(react.forward_ref)')
  {
    return 'ref';
  }

  // styled-components < 4
  if (child.type && child.type.styledComponentId) {
    return 'innerRef';
  }

  return 'ref';
}

const isGSAP = (child) => {
  if (
    React.Children.count(child) === 1 && 
    child.type && 
    (child.type.displayName === 'Tween' || child.type.displayName === 'Timeline')
  ) {
    return true;
  }
  return false;
}

const controlGSAP = (child, progress, event) => {
  if (isGSAP(child)) {
    const props = {...child.props, totalProgress: progress, paused: true };
    return <div><child.type {...props} /></div>;
  }
  return child;
}

const callChildFunction = (children, progress, event) => {
  if (children && typeof children === 'function') {
    return children(progress, event);
  }
  return children;
}

const getChild = (children, progress, event) => {
  children = controlGSAP(children, progress, event);
  children = callChildFunction(children, progress, event);
  return React.Children.only(children);
}

const isString = (element) => {
  if (typeof element === 'string' || element instanceof String) {
    return true;
  }
  return false;
}

class SceneBase extends React.PureComponent<SceneBaseProps, SceneBaseState> {
  ref: HTMLElement;
  scene: any;
  child: any;
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

    const element = this.ref;
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

    if (enabled !== undefined) {
      this.scene.enabled(enabled);
    }

    this.scene.addTo(controller);
  }

  componentDidUpdate(prevProps: SceneBaseProps) {
    const {
      duration,
      offset,
      triggerElement,
      triggerHook,
      reverse,
      enabled,
    } = this.props;

    if (duration !== undefined && duration !== prevProps.duration) {
      this.scene.duration(duration);
    }

    if (offset !== undefined && offset !== prevProps.offset) {
      this.scene.offset(offset);
    }

    if (triggerElement !== undefined && triggerElement !== prevProps.triggerElement) {
      // this.scene.triggerElement(triggerElement);
    }

    if (triggerHook !== undefined && triggerHook !== prevProps.triggerHook) {
      this.scene.triggerHook(triggerHook);
    }

    if (reverse !== undefined && reverse !== prevProps.reverse) {
      this.scene.reverse(reverse);
    }

    if (enabled !== undefined && enabled !== prevProps.enabled) {
      this.scene.enabled(enabled);
    }
  }

  componentWillUnmount() {
    this.scene.destroy();
  }

  refreshScene() {
    if (this.scene) {
      this.scene.refresh();
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
    element = isString(pin) ? pin : element;
    scene.setPin(element, pinSettings);
  }

  initEventHandlers() {
    let { children, progressEvents = true } = this.props;

    if (typeof children !== 'function' && !isGSAP(callChildFunction(children, 0, 'init'))) {
      return;
    }

    this.scene.on('start end enter leave', (event) => {
      this.setState({
        event
      });
    });

    if(progressEvents){
      this.scene.on('progress', (event) => {
        this.setState({
          progress: event.progress
        });
      });
    }
  }

  render() {
    let { children } = this.props;
    const { progress, event } = this.state;

    const child = getChild(children, progress, event);

    // Don't add ref to class components, only to functional components
    if (typeof child.type !== 'function') {
      return child;
    }

    return React.cloneElement(child, { [refOrInnerRef(child)]: ref => ref = this.ref, refresh: this.refreshScene });
  }
}

const SceneWrapper = React.forwardRef(({ controller, refresh, ...props }, ref) => {
  console.log('SceneWrapper', ref);

  useImperativeHandle(ref, () => {
    return {
      refresh() {
        console.log("here");
        refresh();
      }
    };
  }, []);
  
  return (
    <SceneBase {...props} ref={ref} controller={controller} /> // Simply forward the ref here
  );
});

export const Scene = React.forwardRef(({ children, ...props }, ref) => (
  <ControllerContext.Consumer>
    {controller => (
      <SceneWrapper controller={controller} {...props} ref={ref}>
        {children}
      </SceneWrapper>
    )}
  </ControllerContext.Consumer>
));
