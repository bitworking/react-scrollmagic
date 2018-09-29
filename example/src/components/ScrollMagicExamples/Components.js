// @flow
import React from 'react';
import styled from 'styled-components';
import { SMController, SMScene } from 'react-scrollmagic';

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
    <SMController>
      <SMScene duration={600} pin={true}>
        <div>HTML tag</div>
      </SMScene>
      <SMScene duration={600} pin={true}>
        <StatelessRef />
      </SMScene>
      <SMScene duration={600} pin={true}>
        <StyledDiv>Styled Component</StyledDiv>
      </SMScene>
      <SMScene duration={600} pin="#stateless" triggerElement="#stateless">
        <Stateless>Stateless Component</Stateless>
      </SMScene>
      <SMScene duration={600} pin={true}>
        <div>
        <Stateless>Stateless Component wrapped</Stateless>
        </div>
      </SMScene>
      <SMScene duration={600} pin="#statelessFragment" triggerElement="#statelessFragment">
        <StatelessFragment />
      </SMScene>
      <SMScene duration={600} pin="#stateful" triggerElement="#stateful">
        <Stateful />
      </SMScene>
    </SMController>
    <div className="section" />
  </ComponentsStyled>
);

export default Components;
