import { v4 as uuidV4 } from 'uuid';
import { ICardRepository } from '../../contracts/ICardRepository';
import { SaveCardData } from './CardService.types';
import { Card } from '../../models/Card';
import { NotFoundException } from '../../errors/NotFound';

export class CardService {
  constructor(public readonly repository: ICardRepository) {}

  async create(owner: string, data: SaveCardData) {
    const card: Card = {
      ...data,
      id: uuidV4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      owner,
      tags: [],
    };
    await this.repository.save(card);
    return card;
  }

  async update(cardID: Card['id'], data: SaveCardData) {
    const card = await this.findOrThrow(cardID);
    card.content = data.content;
    await this.repository.save(card);
    return card;
  }

  private async findOrThrow(cardID: Card['id']) {
    const deck = await this.repository.getOne(cardID);
    if (!deck) {
      throw new NotFoundException(cardID);
    }
    return deck;
  }
}
