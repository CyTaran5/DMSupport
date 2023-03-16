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
<body>
<form action="../actions/register_action.php" method="post">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" class="username" required>
                <span class="invalid-feedback"></span> <?php echo $_SESSION["usernamerror"]; ?>
            </div>    
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" class="username" required>
                <span class="invalid-feedback"></span> <?php echo $_SESSION["passworderror"]; ?>
            </div>
            <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" name="confirm_password" class="username"  required>
                <span class="invalid-feedback"></span> <?php echo $_SESSION["error"]; ?>
            </div>
            <div class="form-group">
                <button type="submit" class="button-85" value="Submit">Submit</button>
            </div>
            <p>Already have an account? <a href="login.php">Login here</a>.</p> <?php $_SESSION["nameerror"] = "";
         $_SESSION["passerror"] = "";?>
        </form>
</body>
</html>
