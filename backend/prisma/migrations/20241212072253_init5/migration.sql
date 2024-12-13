/*
  Warnings:

  - You are about to drop the `ProjectMembers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProjectMembers";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_UserPorjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserPorjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserPorjects_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserPorjects_AB_unique" ON "_UserPorjects"("A", "B");

-- CreateIndex
CREATE INDEX "_UserPorjects_B_index" ON "_UserPorjects"("B");
