-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tb_songs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "album" TEXT,
    "url" TEXT NOT NULL,
    "cover" TEXT,
    "duration" INTEGER,
    "playlist_id" INTEGER NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "tb_songs_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "tb_playlists" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_tb_songs" ("album", "artist", "cover", "created_at", "duration", "id", "playlist_id", "title", "updated_at", "url") SELECT "album", "artist", "cover", "created_at", "duration", "id", "playlist_id", "title", "updated_at", "url" FROM "tb_songs";
DROP TABLE "tb_songs";
ALTER TABLE "new_tb_songs" RENAME TO "tb_songs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
