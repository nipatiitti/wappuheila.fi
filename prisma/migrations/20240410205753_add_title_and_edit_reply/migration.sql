/*
  Warnings:

  - You are about to drop the column `image` on the `ProfileReply` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN "title" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProfileReply" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profileId" INTEGER NOT NULL,
    "reply" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProfileReply_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProfileReply" ("deleted", "id", "profileId", "reply") SELECT "deleted", "id", "profileId", "reply" FROM "ProfileReply";
DROP TABLE "ProfileReply";
ALTER TABLE "new_ProfileReply" RENAME TO "ProfileReply";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
