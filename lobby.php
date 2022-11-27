<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Lobby Magix</title>
    <!-- <script defer src=""></script> -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="css/lobby.css">
</head>

<body>
    <h1>LOBBY</h1>
    <h2>Bienvenue <?= $_SESSION["username"] ?></h2>
    
    <div class="play">
        <a href="?play=true">Play</a>
    </div>
    
    <div class="practice">
        <a href="?practice=true">Practice</a>
    </div>
    
    <div class="logout">
        <a href="?logout=true">Logout</a>
    </div>
    
    <div class="chat-frame">
        <iframe style="width:700px;height:240px;"
         src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>">
        </iframe>
    </div>
</body>

<!-- <div class="deck-frame">
<iframe style="width:800px;height:600px;"
    src="https://magix.apps-de-cours.com/server/#/deck/<?= $_SESSION["key"] ?>">
</iframe>
</div> -->

<?php
    require_once("partial/footer.php");