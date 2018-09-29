// @flow
import { default as React } from 'react';
import type { Node } from 'react';
import { default as ScrollMagic } from 'scrollmagic';

type Props = {
  children: Node,
  container?: any,
  vertical?: boolean,
  globalSceneOptions?: any,
  loglevel?: number,
  refreshInterval?: number,

}

type State = {
  controller: ?any,
}

export const SMContext = React.createContext('scrollMagic');

class SMController extends React.Component<Props, State> {
  controller: any;

  state: State = {
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

    if (controller === null) {
      return null;
    }

    const context = {
      controller,
    };

    return (
      <SMContext.Provider value={context}>
        {children}
      </SMContext.Provider>
    );
  }
}

export { SMController };
