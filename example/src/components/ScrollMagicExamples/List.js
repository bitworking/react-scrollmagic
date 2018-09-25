// @flow
import React from 'react';
import styled from 'styled-components';
import { SMController, SMScene } from 'react-scrollmagic';
import { Back } from 'gsap/EasePack';

const ListStyled = styled.div`
  overflow: hidden;

  .section {
    height: 50vh;
  }

  .devs, .devs2 {
    perspective: 4000px;
    left: 400px;

    & li {
      font-size: 30px;
    }
  }

`;

const List = () => (
  <ListStyled>
    <div className="section" />
    <SMController>
      <SMScene
        duration={300}
        pin={true}
        tween={{
          target: '.devs li',
          staggerFrom: {
            opacity: 0,
            cycle: {
              rotationX: [-90, 90],
              transformOrigin: ['50% top -100', '50% bottom 100']
            }
          },
          stagger: 0.1,
        }}
      >
        <ul className="devs">
          <li>Rich Harris</li>
          <li>Dan Abramov</li>
          <li>Kyle Simpson</li>
          <li>Gregory Brown</li>
          <li>Addy Osmani</li>
          <li>Evan You</li>
          <li>Axel Rauschmayer</li>
          <li>Sarah Drasner</li>
          <li>André Staltz</li>
        </ul>
      </SMScene>
      <div className="section" />
      <SMScene
        duration={300}
        pin={true}
        tween={{
          target: '.devs2 li',
          staggerFrom: {
            opacity: 0,
            cycle: {
              x: i => (i+1) * 50,
            },
            ease: Back.easeOut,
          },
          stagger: 0.1,
        }}
      >
        <ul className="devs2">
          <li>Rich Harris</li>
          <li>Dan Abramov</li>
          <li>Kyle Simpson</li>
          <li>Gregory Brown</li>
          <li>Addy Osmani</li>
          <li>Evan You</li>
          <li>Axel Rauschmayer</li>
          <li>Sarah Drasner</li>
          <li>André Staltz</li>
        </ul>
      </SMScene>
    </SMController>
    <div className="section" />
  </ListStyled>
);

export default List;
