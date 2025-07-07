import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1751873824500 implements MigrationInterface {
    name = 'Migration1751873824500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "logo" character varying, CONSTRAINT "UQ_2187088ab5ef2a918473cb99007" UNIQUE ("name"), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_bb7d685810f5cba57e9ff6756fb" UNIQUE ("value"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-project-role" ("id" SERIAL NOT NULL, "userId" integer, "projectId" integer, "roleId" integer, CONSTRAINT "UQ_fe640c9f57c929ef70706444213" UNIQUE ("userId", "projectId"), CONSTRAINT "PK_d0b7b1151024dca6f16df6acf5a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user-project-role" ADD CONSTRAINT "FK_9fa0aadc27bf9322aa0e063fd13" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-project-role" ADD CONSTRAINT "FK_5d3e4419e58e1289edfa04e31c0" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-project-role" ADD CONSTRAINT "FK_d949ce8344fc319bd2369c71611" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-project-role" DROP CONSTRAINT "FK_d949ce8344fc319bd2369c71611"`);
        await queryRunner.query(`ALTER TABLE "user-project-role" DROP CONSTRAINT "FK_5d3e4419e58e1289edfa04e31c0"`);
        await queryRunner.query(`ALTER TABLE "user-project-role" DROP CONSTRAINT "FK_9fa0aadc27bf9322aa0e063fd13"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user-project-role"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
