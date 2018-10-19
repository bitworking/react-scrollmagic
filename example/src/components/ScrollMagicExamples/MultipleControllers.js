// @flow
import React from 'react';
import styled from 'styled-components';
import { Controller, Scene } from 'react-scrollmagic';

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
      <Controller container="#container1">
        <div className="section" />
        <Scene duration={600} pin={true}>
          <div className="sticky"><div>Pin Test</div></div>
        </Scene>
        <div className="section" />
      </Controller>
    </div>
    <div id="container2">
      <Controller container="#container2">
        <div className="section" />
        <Scene duration={600} pin={true}>
          <div className="sticky"><div>Pin Test</div></div>
        </Scene>
        <div className="section" />
      </Controller>
    </div>
  </MultipleControllersStyled>
);

export default MultipleControllers;
