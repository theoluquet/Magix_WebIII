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
            <div class="opponent-board">
                <div class="opponent-board-card">
                    <div class="obc-img"></div>
                    <div class="obc-attack"></div>
                    <div class="obc-hp"></div>
                    <div class="obc-cost-mp"></div>
                    <div class="obc-mechanic"></div>
                    <div class="obc-dedicated"></div>
                </div>
            </div>
            <div class="player-board">
                <div class="player-board-card">
                    <div class="pbc-img"></div>
                    <div class="pbc-attack"></div>
                    <div class="pbc-hp"></div>
                    <div class="pbc-cost-mp"></div>
                    <div class="pbc-mechanic"></div>
                    <div class="pbc-dedicated"></div>
                </div>
            </div>
        </div>

        <div class="player-info">
            <div class="hero-power">Hero Power</div>
            <div class="end-turn">End Turn</div>
            <div class="player-hand">
                <div class="player-hand-card">
                    <div class="phc-img"></div>
                    <div class="phc-attack"></div>
                    <div class="phc-hp"></div>
                    <div class="phc-cost-mp"></div>
                    <div class="phc-mechanic"></div>
                    <div class="phc-dedicated"></div>
                </div>
                <div class="player-hand-card">
                    <div class="phc-img"></div>
                    <div class="phc-attack"></div>
                    <div class="phc-hp"></div>
                    <div class="phc-cost-mp"></div>
                    <div class="phc-mechanic"></div>
                    <div class="phc-dedicated"></div>
                </div>
                <div class="player-hand-card">
                    <div class="phc-img"></div>
                    <div class="phc-attack"></div>
                    <div class="phc-hp"></div>
                    <div class="phc-cost-mp"></div>
                    <div class="phc-mechanic"></div>
                    <div class="phc-dedicated"></div>
                </div>
                <div class="player-hand-card">
                    <div class="phc-img"></div>
                    <div class="phc-attack"></div>
                    <div class="phc-hp"></div>
                    <div class="phc-cost-mp"></div>
                    <div class="phc-mechanic"></div>
                    <div class="phc-dedicated"></div>
                </div>
                <div class="player-hand-card">
                    <div class="phc-img"></div>
                    <div class="phc-attack"></div>
                    <div class="phc-hp"></div>
                    <div class="phc-cost-mp"></div>
                    <div class="phc-mechanic"></div>
                    <div class="phc-dedicated"></div>
                </div>                
            </div>
            <div class="player-avatar">IMG</div>
            <div class="player-name"><?= $_SESSION["username"] ?></div>
            <div class="player-hero-class">HeroClass</div>
            <div class="player-hp">30 HP</div>
            <div class="player-mp">10 MP</div>
            <div class="player-deck">30 cards</div>
            <div class="timer">50sec</div>

        </div>
    </div>
</body>

</html>

<?php
require_once("partial/footer.php");
