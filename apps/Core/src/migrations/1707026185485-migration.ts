import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1707026185485 implements MigrationInterface {
    name = 'Migration1707026185485';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`isCancel\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`isCancel\``);
    }
}
