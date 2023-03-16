<?php
session_start();
if (!$_SESSION["loggedin"]) {
  header("Location: views\login.php");
} else {
  // Read variables and create connection
  $mysql_servername = getenv("MYSQL_SERVERNAME");
  $mysql_user = getenv("MYSQL_USER");
  $mysql_password = getenv("MYSQL_PASSWORD");
  $mysql_database = getenv("MYSQL_DATABASE");

  // This section for DEBUGGING ONLY! COMMENT-OUT WHEN FINISHED
  // echo "<p>mysql_servername: $mysql_servername</p>";
  // echo "<p>mysql_user: $mysql_user</p>";
  // echo "<p>mysql_password: $mysql_password</p>";
  // echo "<p>mysql_database: $mysql_database</p>";

  $conn = new mysqli($mysql_servername, $mysql_user, $mysql_password, $mysql_database);
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  } else {
      //echo "Database Connection Success";
  }
  $stmt = $conn->prepare("SELECT * FROM `task` WHERE `user_id` = ?");
  $stmt->bind_param('i', $_SESSION["id"]);
  $stmt->execute();
}
?>
<html lang="en">


<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- Add an appropriate title in this tag -->
  <title>DM Support 3b</title>
  <link rel="stylesheet" href="css/style.css">
  
</head>

<body>
  <!-- Your visible elements -->
  <h1> DM Support</h1>
  <nav> 
    <h2>You are capable. You can get it done.</h2>
    <a href="https://www.youtube.com/watch?v=FDEYHxtimKk">Focus Music</a> |
    <a href="https://www.youtube.com/watch?v=wnHW6o8WMas">Focus Motivation</a> |
    <a href="https://learningsuite.byu.edu/">Learning Suite</a>
    <form action="actions/logout_action.php" method="post">
            <input type="submit" class="button-49 logOut" value="logout" action="actions/logout_action.php" method="post">
        </form>
</nav>
<input type="checkbox" class="toggle-switch"/> <label for="id">Sort by date</label>
<input type="checkbox" class="toggle-switch"/> <label for="id">Filter completed tasks</label>

<ul class="tasklist" id="tasklist">
<?php
        $stmt->bind_result($taskid, $useridfortask, $tasktext, $taskdate, $taskdone);
        while ($row = $stmt->fetch()) {
        ?>
            <li class="task" task-id="<?php echo $taskid ?>">
                <form action="actions/updatetask.php" style="display: inline;" method="post">
                    <button style="background: green;"type="submit" class="button-85" id="<?php echo $taskid ?>">
                        <?php if ($taskdone == 1) {
                        ?> Done!<?php
                                } else {
                                    ?>
                            Done?
                        <?php
                                }  ?> </button>
                    <input type="hidden" value="<?php echo $taskid ?>" name="task_id">
                    <input type="hidden" value="<?php echo $taskdone ?>" name="task_done">
                </form>
                <span style="display: inline; margin-right: 38em; margin-left: auto;" class="task-description <?php if ($taskdone == 1) {?>  alldone" <?php
                                                                }  ?> for="<?php echo $taskid ?>" task-id="<?php echo $taskid ?>"><?php echo $tasktext ?></span>
                <span class="task-date"><?php echo $taskdate ?></span>
                <form action="actions/delete_task.php" style="display: inline;" method="post">
                    <button type="submit" class="button-49 task-delete material-icon">Delete</button>
                    <input type="hidden" value="<?php echo $taskid ?>" name="task_id">
                </form>
            </li>
            </li>

        <?php
        }
        ?>
    </ul>
  <form name="form" class="form-create-task" action="actions/create_action.php" method="post">
    <input type="text" name="Description" id="description" required class="task-description-input" placeholder="Enter a task"/>
    <br/>
    <br/>
    <input type="date" name="Date" id="date"  required/>
    <br/>
    <br/>
    <button class="button-85" type="submit" name="create" >Create Task</button>


    <br/>


  </form>
</body>

</html>





