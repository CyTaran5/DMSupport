<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body >
    <form action="../actions/login_action.php" method="post">
        <div class="form-group">
            <label>Username</label><br>
            <input type="text" name="username" class="username" required>
            <span class="invalid-feedback"><?php echo $_SESSION["nameerror"]; ?></span> 
        </div>
        <div class="form-group">
            <label>Password</label><br>
            <input type="password" name="password" class="username" required>
            <span class="invalid-feedback"><?php echo $_SESSION["passerror"]; ?></span> 
        </div>
        <div class="form-group"> <br>
            <button type="submit" class="button-85" value="Login">Submit</button>
        </div>
        <p>Don't have an account? <a href="register.php" >Sign up now</a>.</p> <?php $_SESSION["passworderror"] = "";
         $_SESSION["error"] = ""; $_SESSION["usernamerror"] = ""; ?>
    </form>
</body>

</html>
