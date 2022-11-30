
<?php
    require_once("action/GameAction.php");

    $action = new GameAction();
    $data = $action->execute();
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <title>GAME OF MAGIX</title>
    <script defer src="js/game.js" type="module"></script>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="css/game.css">
</head>

<body>
    <div class="splash">
        <div class="splash-text">Waiting for the opponent ...</div>
    </div>
    <div class="game-container">
        <div class="opponent-info">
            <div class="opponent-avatar clickable"></div>
            <div class="opponent-data clickable">
                <div class="opponent-data1">
                    <div class="opponent-hp"></div>
                    <div class="opponent-mp"></div>
                    <div class="opponent-deck"></div>
                </div>
                <div class="opponent-data2">
                    <div class="opponent-name"></div>
                    <div class="opponent-hero-class"></div>
                </div>
            </div>
            <div class="message-area">
                <div class="message"></div>
            </div>
            <div class="player-commands">
                <div class="timer"></div>
                <div class="end-turn clickable">End Turn</div>
                <div class="hero-power clickable">Hero Power</div>
            </div>
        </div>

        <div class="game-board">
            <div class="opponent-board"></div>
            <div class="player-board"></div>
        </div>

        <div class="player-info">            
            <div class="player-hand-container">
                <div class="player-hand"></div>
            </div>
            <div class="player-data">   
            <div class="player-data1">
                    <div class="player-deck"></div>
                    <div class="player-mp"></div>
                    <div class="player-hp"></div>
                </div>             
                <div class="player-data2">
                </div>                
            </div>
        </div>
    </div>
</body>