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

export const SMContext = React.createContext('scrollMagic');

class SMController extends React.Component<Props> {
  controller: any;
  
  constructor(props: Props) {
    super(props);

    const { children, ...controllerProps } = props;
    this.controller = new ScrollMagic.Controller(controllerProps);
  }

  componentWillUnmount() {
    this.controller = null;
  }

  render() {
    const { children } = this.props;

    const context = {
      controller: this.controller,
    };

    return (
      <SMContext.Provider value={context}>
        {children}
      </SMContext.Provider>
    );
  }
}

export { SMController };
