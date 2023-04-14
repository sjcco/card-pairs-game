import React, { FC } from "react";
import useTimer from "./hooks/useTimer";
import './Score.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { states } from "./interfaces";

interface ScoreProps {
  pairsFound: number;
  gameRunning: boolean;
  openControl: (state: states) => void;
  timer: {hours: string, minutes: string, seconds: string, totalSeconds: number}
}

const Score: FC<ScoreProps> = ({gameRunning, pairsFound, openControl, timer}) => {
  
  return <section className="top-bar">
    <nav>
      <div>
        <button onClick={()=> openControl('paused')}>Pause <FontAwesomeIcon icon={faPause} /></button>
      </div>
      <div className="pairs-found">
        <p>Pairs found: <span>{pairsFound}</span></p>
      </div>
      <div className="timer">
        <p>{timer.hours}:</p>
        <p>{timer.minutes}:</p>
        <p>{timer.seconds}</p>
      </div>
    </nav>
  </section>
  ;
}
 
export default Score;