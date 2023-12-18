import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1702867301828 implements MigrationInterface {
    name = 'Migration1702867301828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phoneNumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`joinNumber\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`postNumber\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`postNumber\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`joinNumber\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phoneNumber\``);
    }

}
