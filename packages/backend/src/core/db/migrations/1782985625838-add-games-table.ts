import { CommonColumns } from 'src/core/db/common-columns';
import { GameStateEnum } from 'src/features/game/model/game-state.model';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddGames1782985625838 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'games',
        columns: [
          ...CommonColumns.getAll(),
          { name: 'title', type: 'varchar', length: '255' },
          { name: 'description', type: 'text', isNullable: true },
          {
            name: 'state',
            type: 'enum',
            enum: Object.values(GameStateEnum),
            default: `'${GameStateEnum.DRAFT}'`,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('games');
  }
}
