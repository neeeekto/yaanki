import { Folder } from '../../models/Folder';

export type CreateFolderData = Pick<Folder, 'name' | 'owner' | 'tags'>;
export type UpdateFolderData = Pick<Folder, 'name' | 'tags'>;
