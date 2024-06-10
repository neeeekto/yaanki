export interface IBaseRepository<T extends { id: string }> {
  getOne(id: T['id']): Promise<T>;
  getList(): Promise<T[]>;
  save(data: T): Promise<void>;
}
