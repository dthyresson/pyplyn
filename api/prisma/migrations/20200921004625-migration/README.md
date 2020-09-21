# Migration `20200921004625-migration`

This migration has been generated by A. David Thyresson at 9/20/2020, 8:46:25 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Article" DROP COLUMN "tags",
ADD COLUMN "tagLabels" text []  
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200921004047-migration..20200921004625-migration
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
@@ -40,9 +40,9 @@
   description    String?
   articleText    String?
   language       String?
   sentiment      Float           @default(0)
-  tags           String[]
+  tagLabels      String[]
   url            String          @unique
   articleContext ArticleContext?
   articleTags    ArticleTag[]
 }
```

