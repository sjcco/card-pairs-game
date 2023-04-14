
export interface CardProps {
  id: number;
  clicked: string;
  pairFound: string;
  background: string;
}

export type states = 'start' | 'running' | 'paused' | 'end'

export interface ControlScreenProps {
  isOpen: boolean;
  state: states;
  onClose: (state: states) => void;
  topScores: scores;
}

export type scores = {string: string, seconds: number}[]