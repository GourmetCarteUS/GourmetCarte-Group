import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1702954484342 implements MigrationInterface {
    name = 'Migration1702954484342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`categoryId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_d44e52c4ca04619ef9b61a11982\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_d44e52c4ca04619ef9b61a11982\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`categoryId\``);
    }

}
