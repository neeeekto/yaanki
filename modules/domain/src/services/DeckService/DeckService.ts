import { IDeckRepository } from '../../contracts/IDeckRepository';
import { SaveDeckData } from './DeckService.types';
import { Deck } from '../../models/Deck';
import { v4 as uuidV4 } from 'uuid';
import { Card } from '../../models/Card';
import { NotFoundException } from '../../errors/NotFound';

export class DeckService {
  constructor(public readonly repository: IDeckRepository) {}

  async create(data: SaveDeckData) {
    const deck: Deck = {
      ...data,
      id: uuidV4(),
      createdAt: Date.now(),
      cards: [],
    };
    await this.repository.save(deck);
    return deck;
  }

  async update(deckID: Deck['id'], data: SaveDeckData) {
    const deck = await this.findOrThrow(deckID);
    deck.name = data.name ?? deck.name;
    deck.tags = data.tags ?? deck.tags;
    await this.repository.save(deck);
    return deck;
  }

  async addCards(deckID: Deck['id'], cards: Array<Card['id']>) {
    const deck = await this.findOrThrow(deckID);
    deck.cards = [...new Set([...(deck.cards ?? []), ...cards])];
    await this.repository.save(deck);
    return deck;
  }

  private async findOrThrow(deckID: Deck['id']) {
    const deck = await this.repository.getOne(deckID);
    if (!deck) {
      throw new NotFoundException(deckID);
    }
    return deck;
  }
}
