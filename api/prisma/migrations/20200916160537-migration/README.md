# Migration `20200916160537-migration`

This migration has been generated by A. David Thyresson at 9/16/2020, 12:05:37 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Tweet" ADD COLUMN "sentiment" Decimal(65,30)   NOT NULL DEFAULT 0
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200916011414-migration..20200916160537-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,14 +1,15 @@
 datasource DS {
   // optionally set multiple providers
   // example: provider = ["sqlite", "postgresql"]
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
-  provider      = "prisma-client-js"
-  binaryTargets = "native"
+  provider        = "prisma-client-js"
+  binaryTargets   = ["native", "rhel-openssl-1.0.x"]
+  previewFeatures = ["connectOrCreate"]
 }
 enum DocumentType {
   ARTICLE
@@ -58,8 +59,9 @@
   author          String
   title           String
   content         String
   url             String          @unique
+  sentiment       Float           @default(0)
   tweetContext    TweetContext?
   tweetCategories TweetCategory[]
   tweetPriorities TweetPriority[]
 }
```


