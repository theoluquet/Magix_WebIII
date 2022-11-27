<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/StatsCardsDAO.php");

    class StatsCardsAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $result = [];
            $params = [];
            $params["key"] = $_SESSION["key"];


            $result["stats"] = StatsCardsDAO::getStats();
            $result["cards"] = parent::callAPI("/cards", $params);
            return $result;
        }
    }