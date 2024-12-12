<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    // Here you can process the form data, such as sending an email or storing it in a database
    
    // For example, sending an email using the mail function
    $to = "example@example.com";
    $subject = "New message from your website";
    $body = "Name: $name\nEmail: $email\nMessage:\n$message";
    
    mail($to, $subject, $body);
    
    // Redirect back to the form page or a thank you page
    header("Location: thank_you.html");
    exit;
}
?>
