import { TableColumnOptions } from 'typeorm';

export class CommonColumns {
  static getId(): TableColumnOptions {
    return {
      name: 'id',
      type: 'uuid',
      isPrimary: true,
      isGenerated: true,
      generationStrategy: 'uuid',
    };
  }

  static getCreatedAt(): TableColumnOptions {
    return {
      name: 'created_at',
      type: 'timestamp',
      isNullable: false,
      default: 'CURRENT_TIMESTAMP',
    };
  }

  static getUpdatedAt(): TableColumnOptions {
    return {
      name: 'updated_at',
      type: 'timestamp',
      isNullable: false,
      default: 'CURRENT_TIMESTAMP',
    };
  }

  static getAll(): TableColumnOptions[] {
    return [this.getId(), this.getCreatedAt(), this.getUpdatedAt()];
  }
}
