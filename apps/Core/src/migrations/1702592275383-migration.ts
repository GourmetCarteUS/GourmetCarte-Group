import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1702592275383 implements MigrationInterface {
    name = 'Migration1702592275383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`avatarUrl\` varchar(255) NOT NULL, \`displayName\` varchar(255) NOT NULL, \`openId\` varchar(255) NOT NULL, \`unionId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`description\` varchar(255) NOT NULL, \`geoLocation\` point NOT NULL, \`location\` varchar(255) NOT NULL, \`startAt\` datetime NOT NULL, \`title\` varchar(255) NOT NULL, \`maleTicketFee\` int NOT NULL, \`femaleTicketFee\` int NOT NULL, \`creatorId\` varchar(36) NULL, SPATIAL INDEX \`IDX_65d15547939ccd969d9c2e30ae\` (\`geoLocation\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event_participants_user\` (\`eventId\` varchar(36) NOT NULL, \`userId\` varchar(36) NOT NULL, INDEX \`IDX_cb16f471dfa696d2da841aaf21\` (\`eventId\`), INDEX \`IDX_120333cf695db458809e8b29e2\` (\`userId\`), PRIMARY KEY (\`eventId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_7a773352fcf1271324f2e5a3e41\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event_participants_user\` ADD CONSTRAINT \`FK_cb16f471dfa696d2da841aaf21e\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`event_participants_user\` ADD CONSTRAINT \`FK_120333cf695db458809e8b29e22\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_participants_user\` DROP FOREIGN KEY \`FK_120333cf695db458809e8b29e22\``);
        await queryRunner.query(`ALTER TABLE \`event_participants_user\` DROP FOREIGN KEY \`FK_cb16f471dfa696d2da841aaf21e\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_7a773352fcf1271324f2e5a3e41\``);
        await queryRunner.query(`DROP INDEX \`IDX_120333cf695db458809e8b29e2\` ON \`event_participants_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_cb16f471dfa696d2da841aaf21\` ON \`event_participants_user\``);
        await queryRunner.query(`DROP TABLE \`event_participants_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_65d15547939ccd969d9c2e30ae\` ON \`event\``);
        await queryRunner.query(`DROP TABLE \`event\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
