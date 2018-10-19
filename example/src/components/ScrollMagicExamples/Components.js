// @flow
import React from 'react';
import styled from 'styled-components';
import { Controller, Scene } from 'react-scrollmagic';

const ComponentsStyled = styled.div`
  .section {
    height: 70vh;
  }
`;

const StyledDiv = styled.div`
  background-color: red;
`;

const Stateless = ({children}) => <div id="stateless">{children}</div>;

const StatelessFragment = () => <React.Fragment><div id="statelessFragment">StatelessFragment Component</div></React.Fragment>;

const StatelessRef = React.forwardRef((props, ref) => (
  <div ref={ref}>StatelessRef Component</div>
));

class Stateful extends React.Component {
  render() {
    return (
      <div id="stateful">Stateful Component</div>
    );
  }
}

const Components = () => (
  <ComponentsStyled>
    <div className="section" />
    <Controller>
      <Scene duration={600} pin={true}>
        <div>HTML tag</div>
      </Scene>
      <Scene duration={600} pin={true}>
        <StatelessRef />
      </Scene>
      <Scene duration={600} pin={true}>
        <StyledDiv>Styled Component</StyledDiv>
      </Scene>
      <Scene duration={600} pin="#stateless" triggerElement="#stateless">
        <Stateless>Stateless Component</Stateless>
      </Scene>
      <Scene duration={600} pin={true}>
        <div>
          <Stateless>Stateless Component wrapped</Stateless>
        </div>
      </Scene>
      <Scene duration={600} pin="#statelessFragment" triggerElement="#statelessFragment">
        <StatelessFragment />
      </Scene>
      <Scene duration={600} pin="#stateful" triggerElement="#stateful">
        <Stateful />
      </Scene>
    </Controller>
    <div className="section" />
  </ComponentsStyled>
);

export default Components;
