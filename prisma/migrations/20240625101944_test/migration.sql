/*
  Warnings:

  - A unique constraint covering the columns `[playerId,teamId]` on the table `player_team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `player_team_playerId_teamId_key` ON `player_team`(`playerId`, `teamId`);
