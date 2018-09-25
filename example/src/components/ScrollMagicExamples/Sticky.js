// @flow
import React from 'react';
import styled from 'styled-components';
import { SMController, SMScene } from 'react-scrollmagic';

const StickyStyled = styled.div`
  .section {
    height: 100vh;
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

const Sticky = () => (
  <StickyStyled>
    <div className="section" />
    <SMController>
      <SMScene duration={600} pin={true}>
        <div className="sticky"><div>Pin Test</div></div>
      </SMScene>
      <SMScene duration={200} pin={true} pinSettings={{ pushFollowers: false }}>
        <div className="sticky"><div>Pin Test</div></div>
      </SMScene>
      <SMScene duration={300} pin={true} offset={100}>
        <div className="sticky blue"><div>Pin Test</div></div>
      </SMScene>
    </SMController>
    <div className="section" />
  </StickyStyled>
);

export default Sticky;
