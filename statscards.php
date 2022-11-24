<?php
    require_once("action/StatsCardsAction.php");

    $action = new StatsCardsAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <title>Cards Statistics</title>
    <!-- <script defer src="js/game.js" type="module"></script> -->
    <meta charset="utf-8" />
    <link rel="stylesheet" href="css/statscards.css">
</head>

<body>
    <?php
        foreach ($data as $card) {
            ?>
            <div><?= $card["cardid"] ?> / <?= $card["times_played"] ?> / <?= $card["popularity"] ?></div>
            <?php
        }
    ?>
</body>