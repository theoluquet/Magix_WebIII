<?php
    require_once("action/DAO/ConnectionDAO.php");

    class StatsCardsDAO {     

        public static function cardPlayed($cardUID) {
            $connection = Connection::getConnection();

            $statementCardExistence = $connection->prepare("SELECT * FROM played_cards WHERE cardID = ?");
            $statementCardExistence->bindParam(1, $cardUID);
            $statementCardExistence->execute();
            $resultCardExistence = $statementCardExistence->fetchAll();

            if ($resultCardExistence == null) {
                $statementCardInsert = $connection->prepare("INSERT INTO played_cards(cardID, times_played) VALUES (?,1)");
                $statementCardInsert->bindParam(1, $cardUID);
                $statementCardInsert->execute();
            }
            else {
                $statementCardUpdate = $connection->prepare("UPDATE played_cards SET times_played = ? WHERE cardID = ?");
                $updatedTimesPlayed = $resultCardExistence[0]["times_played"];
                $updatedTimesPlayed += 1;
                $statementCardUpdate->bindParam(1, $updatedTimesPlayed);
                $statementCardUpdate->bindParam(2, $cardUID);
                $statementCardUpdate->execute();
            }
        }


        public static function getStats() {
            $connection = Connection::getConnection();

            $statementGetStats = $connection->prepare
            ("SELECT
            (
                cardID,
                times_played,
                ((times_played / SUM(times_played)) * 100) AS 'popularity'
            )
            FROM played_cards");

            $statementGetStats->setFetchMode(PDO::FETCH_ASSOC);
            $statementGetStats->execute();
            $cardStats = $statementGetStats->fetchAll();
            return $cardStats;
        }


        public static function resetStats() {
            $connection = Connection::getConnection();

            $statementResetStats = $connection->prepare("TRUNCATE played_cards");
            $statementResetStats->execute();
        }
    }