import { MigrationInterface, QueryRunner } from 'typeorm'

export class User1706014995552 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
        id serial NOT NULL,
        username varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT users_pkey PRIMARY KEY (id),
        CONSTRAINT users_username_key UNIQUE (username)
            );`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"')
  }
}
