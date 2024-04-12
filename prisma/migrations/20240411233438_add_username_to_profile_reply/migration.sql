/*
  Warnings:

  - Added the required column `username` to the `ProfileReply` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProfileReply" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profileId" INTEGER NOT NULL,
    "reply" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProfileReply_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProfileReply" ("createdAt", "deleted", "id", "profileId", "reply") SELECT "createdAt", "deleted", "id", "profileId", "reply" FROM "ProfileReply";
DROP TABLE "ProfileReply";
ALTER TABLE "new_ProfileReply" RENAME TO "ProfileReply";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
