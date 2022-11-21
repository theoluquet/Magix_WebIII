<?php
    require_once("action/CommonAction.php");

    class AjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $result = "";
            $gameParams = [];
            $gameParams["key"] = $_SESSION["key"];

            // Update game state
            if (!empty($_POST["game-update"]) && ($_POST["game-update"] = "true")) {
                $result = parent::callAPI("games/state", $gameParams);
            }

            // Put a card on the board
            if (!empty($_POST["PLAY"]) && !empty($_POST["uid"])) {

                $gameParams["type"] = $_POST["PLAY"];
                $gameParams["uid"] = $_POST["uid"];
                $result = parent::callAPI("games/action", $gameParams);
            }

            // Attack
            if (!empty($_POST["ATTACK"]) && !empty($_POST["uid"]) && !empty($_POST["targetuid"])) {

                $gameParams["type"] = $_POST["ATTACK"];
                $gameParams["uid"] = $_POST["uid"];
                $gameParams["targetuid"] = $_POST["targetuid"];
                $result = parent::callAPI("games/action", $gameParams);
            }

            // End Turn
            if (!empty($_POST["END_TURN"])) {
                $gameParams["type"] = "END_TURN";
                $result = parent::callAPI("games/action", $gameParams);
            }

            // Hero Power
            if (!empty($_POST["HERO_POWER"])) {
                $gameParams["type"] = "HERO_POWER";
                $result = parent::callAPI("games/action", $gameParams);
            }

            // if ...

            return compact("result");
        }
    }