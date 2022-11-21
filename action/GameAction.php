<?php
    require_once("action/CommonAction.php");

    class GameAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $result = [];
            $gameParams = [];
            $gameParams["key"] = $_SESSION["key"];

            // if ($_POST["end-turn"] = "true") {
            //     $gameParams["type"] = "END_TURN";
            //     $result = parent::callAPI("games/action", $gameParams);
            // }
            return compact("result");
        }
    }