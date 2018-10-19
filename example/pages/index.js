import { default as React } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Tween, Timeline } from 'react-gsap';
import { Controller, Scene } from 'react-scrollmagic';

const StickyStyled = styled.div`
  display: inline-block;
`;

const Sticky1 = styled.div`
  height: 100vh;
  background-color: #62bbdb;
  font-size: 50px;
`;

const Index = () => (
  <div>
    <Link href="/about">
      <button>Go to About Page</button>
    </Link>

    <div style={{ height: '100vh' }} />

    <Controller>
      <Scene duration={600} pin triggerHook="onLeave" indicators>
        <Sticky1>
          Sticky 1
        </Sticky1>
      </Scene>
      <div style={{ height: '40vh' }} />
      <Scene duration={700} pin={true} triggerHook="onLeave" indicators>
        {(event, progress) => (
          <div style={{ height: '100vh', backgroundColor: '#8be5b1', fontSize: '50px', padding: '50px' }}>
            <Tween from={{ x: '200px', y: '300px', rotation: 180 }} totalProgress={progress} paused>
              <StickyStyled>Sticky 2</StickyStyled>
            </Tween>
          </div>
        )}
      </Scene>
    </Controller>

    <div style={{ height: '100vh' }} />

  </div>
);

export default Index;
