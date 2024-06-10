import { User } from './User';

export enum CardContentType {
  Simple = 'simple',
}

export interface CardContentBase<T extends CardContentType> {
  type: T;
}

export interface SimpleCardContent
  extends CardContentBase<CardContentType.Simple> {
  front: string;
  back: string;
}

export type CardContent = SimpleCardContent;

export interface Card {
  id: string;
  createdAt: number;
  updatedAt: number;
  owner: User['login'];
  content: CardContent;
  tags: string[];
}
