/*
  Warnings:

  - Added the required column `type` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "creatorId" INTEGER NOT NULL,
    "deadline" DATETIME NOT NULL,
    "type" TEXT NOT NULL
);
INSERT INTO "new_Project" ("creatorId", "deadline", "description", "id", "priority", "status", "title") SELECT "creatorId", "deadline", "description", "id", "priority", "status", "title" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
