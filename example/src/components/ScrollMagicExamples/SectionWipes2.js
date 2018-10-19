// @flow
import React from 'react';
import styled from 'styled-components';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';

const SectionWipes2Styled = styled.div`
  overflow: hidden;

  #pinContainer {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  #pinContainer .panel {
    height: 100vh;
    width: 100vw;
    position: absolute;
    text-align: center;
  }

  .panel span {
    position: relative;
    display: block;
    top: 50%;
    font-size: 80px;
  }
  
  .panel.blue {
    background-color: #3883d8;
  }
  
  .panel.turqoise {
    background-color: #38ced7;
  }
  
  .panel.green {
    background-color: #22d659;
  }
  
  .panel.bordeaux {
    background-color: #953543;
  }

`;

const SectionWipes2 = () => (
  <SectionWipes2Styled>
    <Controller>
      <Scene
        triggerHook="onLeave"
        duration="300%"
        pin
      >
        {(event, progress) => (
          <div id="pinContainer">
            <section className="panel blue"><span>Panel</span></section>
            <Timeline totalProgress={progress} paused>
              <Tween
                from={{ x: '-100%' }}
                to={{ x: '0%', ease: 'Linear.easeNone' }}
              >
                <section className="panel turqoise"><span>Panel</span></section>
              </Tween>
              <Tween
                from={{ x: '100%' }}
                to={{ x: '0%', ease: 'Linear.easeNone' }}
              >
                <section className="panel green"><span>Panel</span></section>
              </Tween>
              <Tween
                from={{ y: '-100%' }}
                to={{ y: '0%', ease: 'Linear.easeNone' }}
              >
                <section className="panel bordeaux"><span>Panel</span></section>
              </Tween>
            </Timeline>
          </div>
        )}
      </Scene>
    </Controller>
  </SectionWipes2Styled>
);

export default SectionWipes2;
