import { User } from './User';
import { Deck } from './Deck';

export interface Folder {
  id: string;
  name: string;
  owner: User['login'];
  createdAt: number;
  children?: Folder[];
  decks: Array<Deck['id']>;
}
