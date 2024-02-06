import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei'
import { Perf } from 'r3f-perf';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <KeyboardControls
    map={[
      {name : 'forward', keys:['ArrowUp', 'KeyW']},
      {name : 'backward', keys:['ArrowDown', 'KeyS']},
      {name : 'leftward', keys:['ArrowLeft', 'KeyA']},
      {name : 'rightward', keys:['ArrowRight', 'KeyD']},
      {name : 'jump', keys:['Space']},
      {name : 'reset', keys:['KeyR']}
    ]}
  >
    <Canvas shadows>
      <Perf position = 'bottom-right' />
      <App/>
    </Canvas>
  </KeyboardControls>
);