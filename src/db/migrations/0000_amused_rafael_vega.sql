DO $$ BEGIN
 CREATE TYPE "nonogram_type" AS ENUM('black_and_white');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "accounts" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"userId" varchar(191) NOT NULL,
	"type" varchar(191) NOT NULL,
	"provider" varchar(191) NOT NULL,
	"providerAccountId" varchar(191) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(191),
	"scope" varchar(191),
	"id_token" text,
	"session_state" text
);

CREATE TABLE IF NOT EXISTS "sessions" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"sessionToken" varchar(191) NOT NULL,
	"userId" varchar(191) NOT NULL,
	"expires" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(191),
	"email" varchar(191) NOT NULL,
	"emailVerified" timestamp,
	"image" varchar(191)
);

CREATE TABLE IF NOT EXISTS "verificationTokens" (
	"identifier" varchar(191) PRIMARY KEY NOT NULL,
	"token" varchar(191) NOT NULL,
	"expires" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "nonograms" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(191) NOT NULL,
	"type" nonogram_type NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"solution" boolean[] NOT NULL,
	"row_clues" json NOT NULL,
	"col_clues" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar(191) NOT NULL
);

DO $$ BEGIN
 ALTER TABLE nonograms ADD CONSTRAINT nonograms_created_by_users_id_fk FOREIGN KEY ("created_by") REFERENCES users("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS accounts__provider__providerAccountId__idx ON accounts ("provider","providerAccountId");
CREATE INDEX IF NOT EXISTS accounts__userId__idx ON accounts ("userId");
CREATE UNIQUE INDEX IF NOT EXISTS sessions__sessionToken__idx ON sessions ("sessionToken");
CREATE INDEX IF NOT EXISTS sessions__userId__idx ON sessions ("userId");
CREATE UNIQUE INDEX IF NOT EXISTS users__email__idx ON users ("email");
CREATE UNIQUE INDEX IF NOT EXISTS verification_tokens__token__idx ON verificationTokens ("token");