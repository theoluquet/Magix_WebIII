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
            <div class="opponent-name">Name</div>
            <div class="opponent-hero-class">HeroClass</div>
            <div class="opponent-avatar">IMG</div>
            <div class="opponent-hp">30 HP</div>
            <div class="opponent-mp">10 MP</div>
            <div class="opponent-deck">30 cards</div>
            <div class="timer">50sec</div>
        </div>
        
        <div class="game-board">
            <h2>Game Board</h2>
            <div class="opponent-board">Opponent Cards</div>
            <div class="player-board">Player Cards</div>
        </div>
        
        <div class="player-info">
            <h3>Player</h3>
            <div class="player-name"><?= $_SESSION["username"] ?></div>
            <div class="player-hero-class">HeroClass</div>
            <div class="player-avatar">IMG</div>
            <div class="player-hp">30 HP</div>
            <div class="player-mp">10 MP</div>
            <div class="player-deck">30 cards</div>
            <div class="timer">50sec</div>
            <div class="player-hand">Cards</div>
            <div class="hero-power">Hero Power</div>
            <div class="end-turn">End Turn</div>
        </div>
    </body>
</html>

<?php
    require_once("partial/footer.php");