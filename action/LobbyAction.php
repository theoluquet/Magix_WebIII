<?php
    require_once("action/CommonAction.php");

    class LobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $gameParams = [];
            $gameParams["key"] = $_SESSION["key"];

            if (!empty($_GET["play"])) {
                $gameParams["type"] = "PVP";
                parent::callAPI("games/auto-match", $gameParams);
            }
            if (!empty($_GET["practice"])) {
                $gameParams["type"] = "TRAINING";
                parent::callAPI("games/auto-match", $gameParams);
            }
            
            return [];
        }
    }