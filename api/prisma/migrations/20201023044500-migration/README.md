# Migration `20201023044500-migration`

This migration has been generated by A. David Thyresson at 10/23/2020, 12:45:00 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "ArticlePriority.articleId_uid_label_unique" ON "public"."ArticlePriority"("articleId", "uid", "label")

CREATE UNIQUE INDEX "ArticlePriorityTerm.articlePriorityId_uid_label_unique" ON "public"."ArticlePriorityTerm"("articlePriorityId", "uid", "label")

CREATE UNIQUE INDEX "TweetCategory.tweetId_uid_label_unique" ON "public"."TweetCategory"("tweetId", "uid", "label")

CREATE UNIQUE INDEX "TweetPriority.tweetId_uid_label_unique" ON "public"."TweetPriority"("tweetId", "uid", "label")

CREATE UNIQUE INDEX "TweetPriorityTerm.tweetPriorityId_uid_label_unique" ON "public"."TweetPriorityTerm"("tweetPriorityId", "uid", "label")

ALTER INDEX "public"."ArticleContext_articleId_unique" RENAME TO "ArticleContext.articleId_unique"

ALTER INDEX "public"."TweetContext_tweetId_unique" RENAME TO "TweetContext.tweetId_unique"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201023044341-migration..20201023044500-migration
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
@@ -243,7 +243,6 @@
   tweetPriorityId String?
   uid             String
   label           String
-
   @@unique([tweetPriorityId, uid, label])
 }
```

