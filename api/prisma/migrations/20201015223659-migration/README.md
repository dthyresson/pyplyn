# Migration `20201015223659-migration`

This migration has been generated by A. David Thyresson at 10/15/2020, 6:36:59 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."ArticleSummaries" DROP CONSTRAINT "ArticleSummaries_articleId_fkey"

CREATE TABLE "public"."ArticleSummary" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"articleId" text   NOT NULL ,
"sentenceText" text   NOT NULL ,
"sentenceScore" Decimal(65,30)   NOT NULL DEFAULT 0,
"sentencePosition" integer   NOT NULL DEFAULT 0,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."ArticleSummary" ADD FOREIGN KEY ("articleId")REFERENCES "public"."Article"("id") ON DELETE CASCADE ON UPDATE CASCADE

DROP TABLE "public"."ArticleSummaries"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201015220805-migration..20201015223659-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,9 +1,9 @@
 datasource DS {
   // optionally set multiple providers
   // example: provider = ["sqlite", "postgresql"]
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider        = "prisma-client-js"
@@ -27,28 +27,28 @@
   article      Article?
 }
 model Article {
-  id                String             @id @default(cuid())
-  createdAt         DateTime           @default(now())
-  updatedAt         DateTime           @default(now())
-  publishedAt       DateTime           @default(now())
-  entry             Entry              @relation(fields: [entryId], references: [id])
-  entryId           String             @unique
+  id                String            @id @default(cuid())
+  createdAt         DateTime          @default(now())
+  updatedAt         DateTime          @default(now())
+  publishedAt       DateTime          @default(now())
+  entry             Entry             @relation(fields: [entryId], references: [id])
+  entryId           String            @unique
   author            String
   siteName          String?
   title             String
   description       String?
   articleText       String?
   language          String?
-  sentiment         Float              @default(0)
+  sentiment         Float             @default(0)
   tagLabels         String[]
-  url               String             @unique
+  url               String            @unique
   articleContext    ArticleContext?
   tags              Tag[]
   tweets            Tweet[]
   articleCategories ArticleCategory[]
-  summaries         ArticleSummaries[]
+  summaries         ArticleSummary[]
   ArticlePriority   ArticlePriority[]
 }
 model ArticleCategory {
@@ -90,9 +90,9 @@
   uid               String
   label             String
 }
-model ArticleSummaries {
+model ArticleSummary {
   id               String   @id @default(cuid())
   createdAt        DateTime @default(now())
   updatedAt        DateTime @default(now())
   article          Article  @relation(fields: [articleId], references: [id])
```


