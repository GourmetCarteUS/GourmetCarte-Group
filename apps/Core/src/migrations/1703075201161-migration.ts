import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1703075201161 implements MigrationInterface {
    name = 'Migration1703075201161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`joinCount\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`joinCount\``);
    }

}
