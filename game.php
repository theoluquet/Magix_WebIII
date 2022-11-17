
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
    <script defer src="js/game.js" type="module"></script>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="css/game.css">
</head>

<body>
    <div class="game-container">
        <div class="opponent-info">
            <div class="opponent-deck">30 cards</div>
            <div class="opponent-hp">30 HP</div>
            <div class="opponent-avatar">IMG</div>
            <div class="opponent-name">Name</div>
            <div class="opponent-hero-class">HeroClass</div>
            <div class="opponent-mp">10 MP</div>
        </div>

        <div class="game-board">
            <div class="opponent-board"></div>
            <div class="player-board"></div>
        </div>

        <div class="player-info">
            <div class="player-commands">
                <div class="hero-power">Hero Power</div>
                <div class="timer">50sec</div>
                <div class="end-turn">
                <a href="?end-turn=true">End turn</a>
                </div>
            </div>
            <div class="player-hand-container">
                <div class="player-hand"></div>
            </div>
            <div class="player-data">
                <div class="player-name"><?= $_SESSION["username"] ?></div>
                <div class="player-hero-class">HeroClass</div>
                <div class="player-hp">30 HP</div>
                <div class="player-mp">10 MP</div>
                <div class="player-deck">30 cards</div>
                <div class="player-avatar"></div>
            </div>
        </div>
    </div>
</body>

</html>


<?php
    require_once("partial/footer.php");