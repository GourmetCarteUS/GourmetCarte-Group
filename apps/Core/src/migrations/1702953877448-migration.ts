import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1702953877448 implements MigrationInterface {
    name = 'Migration1702953877448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`banner\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NULL, \`sort\` int NOT NULL DEFAULT '0', \`imgUrl\` varchar(255) NULL, \`link\` varchar(255) NULL, \`show\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NULL, \`sort\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phoneNumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`imageDescription\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`maxParticipants\` int NOT NULL DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`minParticipants\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`viewCount\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`viewCount\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`minParticipants\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`maxParticipants\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`imageDescription\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`banner\``);
    }

}
