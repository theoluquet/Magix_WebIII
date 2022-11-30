<?php
    require_once("action/IndexAction.php");

    $action = new IndexAction();
    $data = $action->execute();
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <title>Login Magix</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="css/index.css">
</head>

<body>    
    <div class="index-background"></div>
        <div class="main-frame">
            <h1>Magix</h1>
            <div class="login-form-frame">
                <form action="" method="post">
                    <div class="login-username">
                        <label for="username">Username  </label> <input type="text" name="username" id="usernameInput" placeholder="Username">
                    </div>
                    <div class="login-password">
                        <label for="password">Password</label> <input type="password" name="password" id="passwordInput" placeholder="Password">
                    </div>
                    <div class="login-button">
                        <div class="connnection-error">
                            <?php
                            if ($data["hasConnectionError"]) {
                                ?>
                                Wrong credentials, try again.
                                <?php
                            }
                            ?>
                        </div>
                        <button type="submit">*</button>
                    </div>
                    <div class="logout-link">
                    </div>
                </form>
            </div>
        </div>
</body>