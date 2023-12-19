import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1702971963059 implements MigrationInterface {
    name = 'Migration1702971963059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`banner\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NULL, \`sort\` int NOT NULL DEFAULT '0', \`imgUrl\` varchar(255) NULL, \`link\` varchar(255) NULL, \`show\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NULL, \`sort\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event_category_category\` (\`eventId\` varchar(36) NOT NULL, \`categoryId\` varchar(36) NOT NULL, INDEX \`IDX_a1e2ae011e5fda89738c28ea1b\` (\`eventId\`), INDEX \`IDX_97d13eec23aae2c4c3b20cb8ed\` (\`categoryId\`), PRIMARY KEY (\`eventId\`, \`categoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`contact\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`imageDescription\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`disable\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`maxParticipants\` int NOT NULL DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`minParticipants\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`viewCount\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`groupQr\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`event_category_category\` ADD CONSTRAINT \`FK_a1e2ae011e5fda89738c28ea1b2\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`event_category_category\` ADD CONSTRAINT \`FK_97d13eec23aae2c4c3b20cb8edc\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_category_category\` DROP FOREIGN KEY \`FK_97d13eec23aae2c4c3b20cb8edc\``);
        await queryRunner.query(`ALTER TABLE \`event_category_category\` DROP FOREIGN KEY \`FK_a1e2ae011e5fda89738c28ea1b2\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`groupQr\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`viewCount\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`minParticipants\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`maxParticipants\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`disable\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`imageDescription\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`contact\``);
        await queryRunner.query(`DROP INDEX \`IDX_97d13eec23aae2c4c3b20cb8ed\` ON \`event_category_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_a1e2ae011e5fda89738c28ea1b\` ON \`event_category_category\``);
        await queryRunner.query(`DROP TABLE \`event_category_category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`banner\``);
    }

}
