// @flow
import React from 'react';
import styled from 'styled-components';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';

const TweenStyled = styled.div`
  .section {
    height: 100vh;
  }
  
  .tween {
	  width: 100px;
    height: 100px;
    background-color: red;
    margin: 0 !important;
    position: relative;
    left: calc(50% - 50px);
  }
  
  .stagger {
    width: 50px;
    height: 50px;
    left: 700px;
    background-color: green;
    position: relative;
  }
`;

const TweenComponent = () => (
  <TweenStyled>
    <div className="section" />
    <div id="trigger" />
    <Controller>
      <Scene
        triggerElement="#trigger"
        duration={300}
      >
        {(progress) => (
          <Tween            
            to={{
              left: '0px',
              rotation: -360,
              width: '200px',
              height: '200px',
            }}       
            ease="Strong.easeOut"
            totalProgress={progress}
            paused
          >
            <div className="tween">Pin Test</div>
          </Tween>    
        )}
      </Scene>
      <Scene
        triggerElement="#trigger"
        duration={600}
        pin={false}
      >
      {(progress) => (
        <Tween
          from={{
            css: {
              left: '0px',
              rotation: -360,
              width: '200px',
              height: '200px',
            },
            ease: 'Strong.easeOut',
          }}
          to={{
            css: {
              left: '100px',
              rotation: -180,
              width: '50px',
              height: '50px',
            },
            ease: 'Strong.easeOut',
          }}
          totalProgress={progress}
          paused
        >
          <div className="tween">Pin Test</div>
        </Tween>
      )}        
      </Scene>
      <Scene
        duration={500}
      >
        {(progress) => (
          <div>
            <Tween        
              staggerFrom={{
                left: 700,
              }}
              staggerTo={{
                left: 0,
                ease: 'Back.easeOut',
              }}
              stagger={0.15}
              totalProgress={progress}
              paused
            >
              <div className="stagger" />
              <div className="stagger" />
              <div className="stagger" />
              <div className="stagger" />
              <div className="stagger" />
            </Tween>
          </div>
        )}
      </Scene>
    </Controller>
    <div className="section" />
  </TweenStyled>
);

export default TweenComponent;
