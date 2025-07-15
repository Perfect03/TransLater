import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1752605240650 implements MigrationInterface {
    name = 'Migration1752605240650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "UQ_96e045ab8b0271e5f5a91eae1ee" UNIQUE ("slug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "UQ_96e045ab8b0271e5f5a91eae1ee"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "slug"`);
    }

}
