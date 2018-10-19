// @flow
import { default as React } from 'react';
import ScrollMagic from './lib/scrollmagic';

export type ControllerProps = {
  children: Node,
  container?: any,
  vertical?: boolean,
  globalSceneOptions?: any,
  loglevel?: number,
  refreshInterval?: number,

}

export type ControllerState = {
  controller: ?any,
}

class Controller extends React.Component<ControllerProps, ControllerState> {
  controller: any;

  state: ControllerState = {
    controller: null,
  }

  componentDidMount() {
    const { children, ...controllerProps } = this.props;
    this.setState({
      controller: new ScrollMagic.Controller(controllerProps)
    });
  }

  componentWillUnmount() {
    this.controller = null;
  }

  render() {
    const { children } = this.props;
    const { controller } = this.state;

    if (!controller) {
      return children;
    }

    return React.Children.map(children, (child) => {
      if (child.type.displayName !== 'Scene') {
        return child;
      }
      const props = {...child.props, controller};
      return <child.type {...props} />;
    });
  }
}

export { Controller };
