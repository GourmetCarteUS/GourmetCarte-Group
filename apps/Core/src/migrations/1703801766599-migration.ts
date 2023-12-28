import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1703801766599 implements MigrationInterface {
    name = 'Migration1703801766599';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`startAt\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`startAt\` timestamp NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`startAt\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`startAt\` datetime NOT NULL`);
    }
}
