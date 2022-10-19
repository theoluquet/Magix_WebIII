

<?php
    require_once("action/GameAction.php");

    $action = new GameAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <title>GAME OF MAGIX</title>
        <script defer src="js/game.js"></script>
        <meta charset="utf-8"/>
    </head>

    <body>
        <H1>GAME OF MAGIX</H1>
        <div class="opponent-info">
            <h3>Opponent</h3>
            <div class="hp">30 HP</div>
            <div class="mp">10 MP</div>
            <div class="avatar">IMG</div>
            <div class="deck">30 cards</div>
            <div class="timer">50sec</div>
        </div>
        
        <div class="game-board">
            <h2>Game Board</h2>
            <div class="opponent-board">Opponent Cards</div>
            <div class="player-board">Player Cards</div>
        </div>
        
        <div class="player-info">
            <h3>Player</h3>
            <div class="hp">30 HP</div>
            <div class="mp">10 MP</div>
            <div class="hand">Cards</div>
            <div class="deck">30 cards</div>
            <div class="timer">50sec</div>
            <div class="avatar">IMG</div>
            <div class="hero-power">Hero Power</div>
            <div class="end-turn">End Turn</div>
        </div>
    </body>
</html>

<?php
    require_once("partial/footer.php");