import { User } from './User';

export interface Settings {
  user: User['login'];
  cardsPreSessions: number;
}
