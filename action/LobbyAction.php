<?php
    require_once("action/CommonAction.php");

    class LobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {

            if (!empty($_GET["play"])) {
                var_dump("Play");
            }
            if (!empty($_GET["practice"])) {
                var_dump("practice");
            }
            
            return [];
        }
    }