import { Card } from './Card';

export enum CardAnswerType {
  Fail = 'fail',
  Hard = 'hard',
  Good = 'good',
  Easy = 'easy',
}

export interface CardResponse {
  card: Card['id'];
  answer: CardAnswerType;
  createdAt: number;
  duration: number;
}
