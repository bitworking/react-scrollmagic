// @flow
import React from 'react';
import styled from 'styled-components';
import { Controller, Scene } from 'react-scrollmagic';

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
        tween={{
          target: '.text',
          staggerFrom: {
            left: -2000,
            rotation: -720,
            opacity: 0,
            color: '#ff0000',
            ease: 'Expo.easeOut',
          },
          stagger: 0.15,
          onCompleteAll: () => { console.log('on complete all'); }
        }}
      >
        <div className="textContainer">
          <span className="text">A</span>
          <span className="text">I</span>
          <span className="text">I</span>
          <span className="text">I</span>
          <span className="text">G</span>
          <span className="text">H</span>
          <span className="text">T</span>
        </div>
      </Scene>
      <div className="section" />
      <Scene
        pin={true}
        reverse={true}
        offset={100}
        duration={800}
        timeline={{
          tweens: [
            {
              target: '.text2',
              staggerFrom: {
                opacity: 0,
                color: '#ff0000',
              },
              stagger: 0.15,
            },
            {
              target: '.textContainer',
              to: {
                scale: 2
              },
            },
            {
              target: '.textContainer',
              to: {
                scaleY: 0,
                ease: 'Bounce.easeOut',
              },
            },
          ]
        }}
      >
        <div className="textContainer">
          <span className="text2">G</span>
          <span className="text2">A</span>
          <span className="text2">N</span>
          <span className="text2">G</span>
          <span className="text2">S</span>
          <span className="text2">T</span>
          <span className="text2">A</span>
        </div>
      </Scene>
      <div className="section" />
      <Scene
        pin={true}
        duration={500}
        tween={{
          to: {
            text: 'Aaalda',
          },
        }}
      >
        <div className="text2">Was geht</div>
      </Scene>
    </Controller>
    <div className="section" />
  </SplitTextStyled>
);

export default SplitText;
