// @flow
import React from 'react';
import styled from 'styled-components';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline, SplitLetters } from 'react-gsap';

const SplitTextStyled = styled.div`
  overflow: hidden;
  text-align: center;
  
  .section {
    height: 100vh;
  }

  .textContainer {
    position: relative;
    display: inline-block;
    transform-origin: center;
  }

  .text, .text2 {
    position: relative;
    font-size: 80px;
    font-weight: bold;
    display: inline-block;
  }
`;

const SplitText = () => (
  <SplitTextStyled>
    <div className="section" />
    <Controller>
      <Scene
        pin={false}
        reverse={true}
        duration={500}
        offset={-300}        
      >
        <Tween 
          wrapper={
            <div className="textContainer" />
          }
          staggerFrom= {{
            left: -2000,
            rotation: -720,
            opacity: 0,
            color: '#ff0000',
            ease: 'Expo.easeOut',
          }}
          stagger={0.15}
          onCompleteAll={() => { console.log('on complete all'); }}
        >
          <SplitLetters>
            <span className="text">AIIIGHT</span>
          </SplitLetters>
        </Tween>
      </Scene>
      <div className="section" />
    </Controller>
    <div className="section" />
  </SplitTextStyled>
);

export default SplitText;
