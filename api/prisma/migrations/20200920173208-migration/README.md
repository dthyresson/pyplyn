# Migration `20200920173208-migration`

This migration has been generated by A. David Thyresson at 9/20/2020, 1:32:08 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Article" ADD COLUMN "description" text   
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200917144352-migration..20200920173208-migration
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
@@ -35,8 +35,9 @@
   entry          Entry           @relation(fields: [entryId], references: [id])
   entryId        String          @unique
   author         String
   title          String
+  description    String?
   url            String          @unique
   articleContext ArticleContext?
 }
```


