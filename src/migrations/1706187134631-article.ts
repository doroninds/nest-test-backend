import { MigrationInterface, QueryRunner } from 'typeorm'

export class Article1706187134631 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "articles" (
        id serial NOT NULL,
        "userId" int4 NOT NULL,
        title varchar(255) NOT NULL,
        description text,
        topic varchar(255),
        "publishedAt" timestamp NOT NULL DEFAULT now(),
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT articles_pkey PRIMARY KEY (id),
        CONSTRAINT articles_title_key UNIQUE (title),
        FOREIGN KEY ("userId") REFERENCES "users" (id) ON DELETE CASCADE
                  );`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "articles"')
  }
}
