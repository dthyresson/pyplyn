# Migration `20201023044551-migration`

This migration has been generated by A. David Thyresson at 10/23/2020, 12:45:51 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "ArticleSummary.articleId_sentenceText_unique" ON "public"."ArticleSummary"("articleId", "sentenceText")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201023044500-migration..20201023044551-migration
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
@@ -117,8 +117,10 @@
   articleId        String
   sentenceText     String
   sentenceScore    Float    @default(0)
   sentencePosition Int      @default(0)
+
+  @@unique([articleId, sentenceText])
 }
 enum StreamSource {
   FEEDLY
```


