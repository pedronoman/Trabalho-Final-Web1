/*
  Warnings:

  - You are about to drop the `tb_projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_tasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "tb_projects";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "tb_tasks";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "tb_playlists" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "tb_songs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "album" TEXT,
    "url" TEXT NOT NULL,
    "cover" TEXT,
    "duration" INTEGER,
    "playlist_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "tb_songs_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "tb_playlists" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
