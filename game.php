
<?php
require_once("action/GameAction.php");

$action = new GameAction();
$data = $action->execute();

require_once("partial/header.php");
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <title>GAME OF MAGIX</title>
    <script defer src="js/game.js" type="module"></script>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="css/game.css">
</head>

<body>
    <div class="game-container">
        <div class="opponent-info">
            <div class="opponent-avatar">IMG</div>
            <div class="opponent-data">
                <div class="opponent-data1">
                    <div class="opponent-hp">30 HP</div>
                    <div class="opponent-mp">10 MP</div>
                    <div class="opponent-deck">30 cards</div>
                </div>
                <div class="opponent-data2">
                    <div class="opponent-name">Name</div>
                    <div class="opponent-hero-class">HeroClass</div>
                </div>
            </div>
            <div class="message-area">

            </div>
            <div class="player-commands">
                <div class="timer">50sec</div>
                <div class="end-turn">End Turn</div>
                <div class="hero-power">Hero Power</div>
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
                    <div class="player-deck">30 cards</div>
                    <div class="player-mp">10 MP</div>
                    <div class="player-hp">30 HP</div>
                </div>             
                <div class="player-data2">
                    <div class="player-name"><?= $_SESSION["username"] ?></div>
                    <div class="player-hero-class">HeroClass</div>
                </div>                
            </div>
        </div>
    </div>
</body>

</html>


<?php
    require_once("partial/footer.php");