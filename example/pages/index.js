import { default as React } from 'react';
import Link from 'next/link';
import { Tween, Timeline } from 'react-gsap';
import { Controller, Scene } from 'react-scrollmagic';

const Index = () => (
  <div>
    <Link href="/about">
      <button>Go to About Page</button>
    </Link>

    <div style={{ height: '100vh' }} />

    <Controller>
      <Scene duration={600} pin triggerHook="onLeave" indicators>
        <div style={{ height: '100vh', backgroundColor: '#62bbdb', fontSize: '50px' }}>
          Sticky 1
        </div>
      </Scene>
      <div>gdoijgodijgoid</div>
      <Scene duration={700} pin={true} triggerHook="onLeave">
        {(event, progress) => (
          <div style={{ height: '100vh', backgroundColor: '#8be5b1', fontSize: '50px', padding: '50px' }}>
            <Tween from={{ x: '200px', y: '300px', rotation: 180 }} totalProgress={progress} paused>
              <div style={{ display: 'inline-block'}}>Sticky 2</div>
            </Tween>
          </div>
        )}
      </Scene>
    </Controller>

    <div style={{ height: '100vh' }} />

  </div>
);

export default Index;