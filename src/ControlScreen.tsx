import React, { FC } from "react";
import { Fireworks } from '@fireworks-js/react';
import { ControlScreenProps } from "./interfaces";
import './ControlScreen.css';

const titles: { [key: string]: string; } = {
  'start': 'Get Ready',
  'paused': 'Game Paused',
  'end': 'The End?'
}

const buttons: { [key: string]: string; } = {
  'start': 'Start Game',
  'paused': 'Resume Game',
  'end': 'Restart Game'
}

const ControlScreen: FC<ControlScreenProps> = (props) => {
  const {isOpen, state, onClose, topScores} = props;
  return isOpen ? (
    <div className="backdrop">
      {state === 'end' && (
        <Fireworks
          options={{
            rocketsPoint: {
              min: 0,
              max: 100
            },intensity: 50
          }}
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            position: 'fixed',
          }}
        />
      )}
      <div className="modal">
        <div className="modal-title">
          {titles[state]}
        </div>
        <div className="modal-content">
          <button onClick={() => onClose(state)}>{buttons[state]}</button>
          {topScores.length !== 0 ? <h3>Top Scores</h3> : 'Have fun!!!'}
          <div className="scores">
            {topScores.map((score, idx) => {
              return <p key={`${score}-${idx}`} className="score">{score.string}</p>
            })}
          </div>
          
        </div>
      
      </div>
    </div>
  ) : null;
}
 
export default ControlScreen;