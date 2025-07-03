import { TableColumnOptions } from 'typeorm';

export const COMMON_COLUMNS: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'uuid',
    isPrimary: true,
    isUnique: true,
  },
  {
    name: 'createdAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  },
];
