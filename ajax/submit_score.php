<?php
/**
 * ajax script to fetch the top 9 scores
 */
try
{
    // get ip first for logging
    $ip = $_SERVER['REMOTE_ADDR'];
    
    // apparently the player didn't want to save a score
    if (empty($_GET['name']))
        die;
    
    if (empty($_GET['score']))
        throw new Exception('No score submitted.');
    if (! is_numeric($_GET['score']))
        throw new Exception('Invalid score: '.$_GET['score']);

    // connect to db
    $db = new mysqli();
    include_once 'connect.php';
    
    // store score
    $query = $db->prepare("INSERT INTO scores (name, score, create_date, ip) VALUES (?, ?, now(), ?)");
    $query->bind_param('sis', $_GET['name'], (int) $_GET['score'], $ip);
    if (! $query->execute())
        throw new Exception('Error inserting into scores - '.$query->error);
    
    echo '{"success":1}';
}
catch (Exception $e)
{
    // TODO log errors
    
    echo '{"error":1}';
}