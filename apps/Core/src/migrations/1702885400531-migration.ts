import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1702885400531 implements MigrationInterface {
    name = 'Migration1702885400531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`imageDescription\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`maxParticipants\` int NOT NULL DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`viewCount\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`maleTicketFee\` \`maleTicketFee\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`femaleTicketFee\` \`femaleTicketFee\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`femaleTicketFee\` \`femaleTicketFee\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`maleTicketFee\` \`maleTicketFee\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`viewCount\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`maxParticipants\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`imageDescription\``);
    }

}
