<?php
    require_once("action/IndexAction.php");

    $action = new IndexAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<div class="login-form-frame">
    <form action="" method="post">
        <div class="login-username">
            <label for="username">Username :</label> <input type="text" name="username" id="usernameInput">            
        </div>
        <div class="login-password">
            <label for="password">Password :</label> <input type="password" name="password" id="passwordInput">
        </div>
        <div class="login-button">
            <button type="submit">Login</button>
        </div>
        <div class="logout-link">
            <a href="?logout=true">Logout</a>
        </div>
    </form>
</div>

<?php
    require_once("partial/footer.php");