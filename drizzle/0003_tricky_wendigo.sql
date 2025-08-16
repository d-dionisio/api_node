CREATE TABLE "courses_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT "courses_table_title_unique" UNIQUE("title")
);
