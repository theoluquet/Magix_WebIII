<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/StatsCardsDAO.php");

    class StatsCardsAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {

            return [];
        }
    }