import { DBError } from "../common/errors/general.error";
import { TablesDto } from "./tables.dto";
import { TablesEntity } from "./tables.entity";
import { TablesRepository } from "./tables.repository";

export class TablesService {
  tablesRepository: TablesRepository;

  constructor() {
    this.tablesRepository = new TablesRepository();
  }

  public async create(userId: string, eventId: string, TablesDto: TablesDto): Promise<TablesDto> {
    try {
      const TablesEntity: TablesEntity = TablesDto.toEntity();

      await this.tablesRepository.createOrUpdate(userId, eventId, TablesEntity);

      return TablesDto;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async update(userId: string, eventId: string, TablesDto: TablesDto): Promise<TablesDto> {
    try {
      const TablesEntity: TablesEntity = TablesDto.toEntity();

      await this.tablesRepository.createOrUpdate(userId, eventId, TablesEntity);

      return TablesDto;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async get(userId: string, eventId: string, TableId: string): Promise<TablesDto> {
    try {
      const TablesEntity: TablesEntity = await this.tablesRepository.get(userId, eventId, TableId);

      return { ...TablesEntity } as unknown as TablesDto;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async getAll(userId: string, eventId: string): Promise<TablesDto[]> {
    try {
      const TablesEntity: TablesEntity[] = await this.tablesRepository.getAll(userId, eventId);

      return TablesEntity.map((Table) => {
        return Table as unknown as TablesDto;
      });
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async delete(userId: string, eventId: string, TableId: string): Promise<void> {
    try {
      await this.tablesRepository.delete(userId, eventId, TableId);
    } catch (error) {
      throw new DBError(error.message);
    }
  }
}
