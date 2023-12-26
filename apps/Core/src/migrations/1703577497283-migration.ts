import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1703577497283 implements MigrationInterface {
    name = 'Migration1703577497283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`joinCount\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`isPublic\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`city\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`city\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`isPublic\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`joinCount\``);
    }

}
