-- CreateTable
CREATE TABLE "GrandPrix" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "circuit" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL DEFAULT 'race',
    "position" TEXT NOT NULL DEFAULT 'NC',
    "number" INTEGER NOT NULL,
    "driver" TEXT NOT NULL,
    "driverSlug" TEXT NOT NULL,
    "car" TEXT NOT NULL,
    "carSlug" TEXT NOT NULL,
    "laps" TEXT NOT NULL,
    "time" TEXT NOT NULL DEFAULT 'DNF',
    "points" REAL NOT NULL DEFAULT 0,
    "grandPrixId" INTEGER NOT NULL,
    CONSTRAINT "Record_grandPrixId_fkey" FOREIGN KEY ("grandPrixId") REFERENCES "GrandPrix" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
