import { default as React } from 'react';
import { default as ScrollMagic } from 'scrollmagic';

export const SMContext = React.createContext();

class SMController extends React.Component<SMControllerProps, SMControllerState> {
  controller: any;

  state: SMControllerState = {
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
