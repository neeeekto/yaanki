import { Deck } from '../../models/Deck';

export type SaveDeckData = Pick<Deck, 'name' | 'tags'>;
