<?php
    require_once("action/StatsCardsAction.php");

    $action = new StatsCardsAction();
    $data = $action->execute();
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <title>Cards Statistics</title>
    <script defer src="js/statscards.js" type="module"></script>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="css/statscards.css">
</head>

<body>
    <div class="stats-container"></div>
        <button>Reset statistics</button>
</body>