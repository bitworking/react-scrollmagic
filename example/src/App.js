// @flow
import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './constants/style/global';
import Sticky from './components/ScrollMagicExamples/Sticky';
import Sticky2 from './components/ScrollMagicExamples/Sticky2';
import ClassToggle from './components/ScrollMagicExamples/ClassToggle';
import SectionWipes from './components/ScrollMagicExamples/SectionWipes';
import SectionWipes2 from './components/ScrollMagicExamples/SectionWipes2';
import Tween from './components/ScrollMagicExamples/Tween';
import SplitText from './components/ScrollMagicExamples/SplitText';
import List from './components/ScrollMagicExamples/List';
import Svg from './components/ScrollMagicExamples/Svg';
import Parallax from './components/ScrollMagicExamples/Parallax';
import Components from './components/ScrollMagicExamples/Components';
import MultipleControllers from './components/ScrollMagicExamples/MultipleControllers';

const AppStyled = styled.div`
  nav {
    position: fixed;
    z-index: 2;
  }
`;

const Home = () => (
  <div style={{ marginLeft: '400px' }}>
    Empty home...click on the examples
  </div>
);

const App = () => (
  <AppStyled>
    <Router basename="/react-scrollmagic">
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sticky">Sticky</Link>
            </li>
            <li>
              <Link to="/sticky2">Sticky2</Link>
            </li>
            <li>
              <Link to="/class-toggle">ClassToggle</Link>
            </li>
            <li>
              <Link to="/section-wipes">SectionWipes</Link>
            </li>
            <li>
              <Link to="/section-wipes2">SectionWipes2</Link>
            </li>
            <li>
              <Link to="/tween">Tween</Link>
            </li>
            <li>
              <Link to="/split-text">SplitText</Link>
            </li>
            <li>
              <Link to="/list">List</Link>
            </li>
            <li>
              <Link to="/svg">Svg</Link>
            </li>
            <li>
              <Link to="/parallax">Parallax</Link>
            </li>
            <li>
              <Link to="/components">Components</Link>
            </li>
            <li>
              <Link to="/multiple-controllers">MultipleControllers</Link>
            </li>
          </ul>
        </nav>
        
        <Route exact path="/" component={Home} />
        <Route path="/sticky" component={Sticky} />
        <Route path="/sticky2" component={Sticky2} />
        <Route path="/class-toggle" component={ClassToggle} />
        <Route path="/section-wipes" component={SectionWipes} />
        <Route path="/section-wipes2" component={SectionWipes2} />
        <Route path="/tween" component={Tween} />
        <Route path="/split-text" component={SplitText} />
        <Route path="/list" component={List} />
        <Route path="/svg" component={Svg} />
        <Route path="/parallax" component={Parallax} />
        <Route path="/components" component={Components} />
        <Route path="/multiple-controllers" component={MultipleControllers} />
      </div>
    </Router>
  </AppStyled>
);

export default App;
