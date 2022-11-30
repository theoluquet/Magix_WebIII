<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/StatsCardsDAO.php");

    class AjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $result = [];
            $gameParams = [];
            $gameParams["key"] = $_SESSION["key"];


            // Update game state
            if (isset($_POST["game-update"]) && ($_POST["game-update"] = "true")) {
                $result = parent::callAPI("games/state", $gameParams);
            }


            // Put a card on the board
            if (isset($_POST["PLAY"]) && isset($_POST["uid"])) {

                $gameParams["type"] = $_POST["PLAY"];
                $gameParams["uid"] = $_POST["uid"];
                $result = parent::callAPI("games/action", $gameParams);
            }


            // Register played card in the database
            if (isset($_POST["cardPlayed"])) {
                $result = StatsCardsDAO::cardPlayed($_POST["cardPlayed"]);                
            }


            // Attack
            if (isset($_POST["ATTACK"]) && isset($_POST["uid"])) {

                $gameParams["type"] = $_POST["ATTACK"];
                $gameParams["uid"] = $_POST["uid"];
                $gameParams["targetuid"] = $_POST["targetuid"];
                $result = parent::callAPI("games/action", $gameParams);
            }


            // End Turn
            if (isset($_POST["END_TURN"])) {
                $gameParams["type"] = "END_TURN";
                $result = parent::callAPI("games/action", $gameParams);
            }


            // Hero Power
            if (isset($_POST["HERO_POWER"])) {
                $gameParams["type"] = "HERO_POWER";
                $result = parent::callAPI("games/action", $gameParams);
            }



            // Get the cards and their statistics
            if (isset($_POST["getStats"])) {
                $result["stats"] = StatsCardsDAO::getStats();
                $result["cards"] = parent::callAPI("/cards", $gameParams);
            }

            
            // Reset the cards statistis in the database
            if (isset($_POST["resetStats"])) {
                $result = StatsCardsDAO::resetStats();                
            }            

            return compact("result");
        }
    }