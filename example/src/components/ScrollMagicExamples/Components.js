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

const Stateless = () => <div>Stateless Component</div>;

const StatelessFragment = () => <React.Fragment><div>StatelessFragment Component</div></React.Fragment>;

const StatelessRef = React.forwardRef((props, ref) => (
  <div ref={ref}>StatelessRef Component</div>
));

class Stateful extends React.Component {
  render() {
    return (
      <div>Stateful Component</div>
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
    </SMController>
    <div className="section" />
  </ComponentsStyled>
);

export default Components;
