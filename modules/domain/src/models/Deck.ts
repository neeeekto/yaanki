import { Card } from './Card';

export interface Deck {
  id: string;
  createdAt: number;
  name: string;
  tags?: string[];
  cards: Array<Card['id']>;
}
