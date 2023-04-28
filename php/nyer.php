
        <?php
 

        $conn = mysqli_connect("localhost", "root", "", "barbershop");



        if($conn === false){
            die("ERROR: Could not connect. "
                . mysqli_connect_error());
        }
         
        $email =  $_POST['email'];
        $valasz1 =  $_POST['valasz1'];
        $valasz2 =  $_POST['valasz2'];
        $valasz3 = $_POST['valasz3'];
        $valasz4 =  $_POST['valasz4'];
         

        $sql = "INSERT INTO nyeremeny  VALUES (nyeremenyid,'$email','$valasz1','$valasz2','$valasz3','$valasz4')";

        if(mysqli_query($conn, $sql)){
            echo "<h3>data stored in a database successfully."
                . " Please browse your localhost php my admin"
                . " to view the updated data</h3>";
 
            echo nl2br("\n$email\n$valasz1\n$valasz2\n $valasz3\n $valasz4\n");
        } else{
            echo "ERROR: Hush! Sorry $sql. "
                . mysqli_error($conn);
        }
        mysqli_close($conn);
        ?>
