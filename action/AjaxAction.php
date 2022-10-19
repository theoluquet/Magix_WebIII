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

            if (!empty($_POST["game-update"]) && ($_POST["game-update"] = "true")) {
                $result = parent::callAPI("games/state", $gameParams);
            }



            // if (heroPower())

            // if ...

            return compact("result");
        }
    }