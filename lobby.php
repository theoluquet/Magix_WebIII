<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <title>Lobby Magix</title>
    <script defer src="js/lobby.js"></script>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="css/lobby.css">
</head>

<body>
    <iframe class="deck-frame" style="width:1100px;height:85vh;"
        src="https://magix.apps-de-cours.com/server/#/deck/<?= $_SESSION["key"] ?>">
    </iframe>

    <div class="welcome">Welcome, <span class="username"><?= $_SESSION["username"] ?></span> !</div>

    <div class="chat-frame">
        <iframe style="width:700px;height:240px;"
         src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>">
        </iframe>
    </div>

    <div class="deck menu"></div>
    <div class="play menu">
        <a href="?play=true"></a>
    </div>
    <div class="practice menu">
        <a href="?practice=true"></a>
    </div>
    <div class="stats menu">
    <a href="statscards.php"></a>
    </div>
    <div class="logout menu">
        <a href="?logout=true"></a>
    </div>

    <div class="deck-text description">Open<br>Deck</div>
    <div class="play-text description">Play</div>
    <div class="practice-text description">Practice</div>
    <div class="stats-text description">Cards<br>Stats</div>
    <div class="logout-text description">Logout</div>
</body>