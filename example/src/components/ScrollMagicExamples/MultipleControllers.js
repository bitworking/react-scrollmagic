// @flow
import React from 'react';
import styled from 'styled-components';
import { SMController, SMScene } from 'react-scrollmagic';

const MultipleControllersStyled = styled.div`
  .section {
    height: 100vh;
  }

  #container1, #container2 {
    width: 600px;
    height: 400px;
    overflow: auto;
  }
  
  .sticky {
    background-color: red;
    width: 100%;

    & div {
      padding: 30px;
    }
  }
  
  .blue {
    background-color: blue;
  }
`;

const MultipleControllers = () => (
  <MultipleControllersStyled>
    <div id="container1">
      <SMController container="#container1">
        <div className="section" />
        <SMScene duration={600} pin={true}>
          <div className="sticky"><div>Pin Test</div></div>
        </SMScene>
        <div className="section" />
      </SMController>
    </div>
    <div id="container2">
      <SMController container="#container2">
        <div className="section" />
        <SMScene duration={600} pin={true}>
          <div className="sticky"><div>Pin Test</div></div>
        </SMScene>
        <div className="section" />
      </SMController>
    </div>
  </MultipleControllersStyled>
);

export default MultipleControllers;
