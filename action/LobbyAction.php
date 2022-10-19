<?php
    require_once("action/CommonAction.php");

    class LobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $result = "";
            $gameParams = [];
            $gameParams["key"] = $_SESSION["key"];

            if (!empty($_GET["play"])) {
                $gameParams["type"] = "PVP";
                $result = parent::callAPI("games/auto-match", $gameParams);
                header("location:game.php");
                exit;
            }
            if (!empty($_GET["practice"])) {
                $gameParams["type"] = "TRAINING";
                $result = parent::callAPI("games/auto-match", $gameParams);
                header("location:game.php");
                exit;
            }
            
            return compact("result");
        }
    }