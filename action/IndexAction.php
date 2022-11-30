<?php
    require_once("action/CommonAction.php");

    class IndexAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $hasConnectionError = false;
            $key = "PersonalIdentifier";
            $data = [];

            if (!empty($_POST["username"]) && !empty($_POST["password"])) {
                $data["username"] = $_POST["username"];
                $data["password"] = $_POST["password"];
                
                $result = parent::callAPI("signin", $data);

                if ($result == "INVALID_USERNAME_PASSWORD") {
                    $hasConnectionError = true;
                    }
                else {
                    $key = $result->key;
                    $_SESSION["key"] = $key;
                    $_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
                    $_SESSION["username"] = $data["username"];
                    $playerName = $data["username"];
                    header("location:lobby.php");
                    exit;
                }
            }
            return compact("hasConnectionError", "key");
        }
    }
?>