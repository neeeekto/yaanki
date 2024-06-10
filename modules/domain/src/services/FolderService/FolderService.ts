import { CreateFolderData, UpdateFolderData } from './FolderService.types';
import { Folder } from '../../models/Folder';
import { v4 as uuidV4 } from 'uuid';
import { IFolderRepository } from '../../contracts/IFolderRepository';

export class FolderService {
  constructor(public readonly folderRepository: IFolderRepository) {}

  public async create({ tags, owner, name }: CreateFolderData) {
    const folder: Folder = {
      id: uuidV4(),
      tags,
      owner,
      name,
      createdAt: Date.now(),
      children: [],
    };

    await this.folderRepository.save(folder);
  }

  public async update(id: Folder['id'], data: UpdateFolderData) {
    await this.folderRepository.update(id, data);
  }

  public async includeFolder(parent: Folder, child: Folder) {
    const newChildren = [...(parent.children ?? []), child];
    await this.folderRepository.update(parent.id, { children: newChildren });
  }
}
