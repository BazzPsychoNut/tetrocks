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
    
    // insert score
    if (! $db->query("insert into scores (name, score, create_date, ip) values ('".$db->real_escape_string($_GET['name'])."', ".$db->real_escape_string($_GET['score']).", now(), '".$db->real_escape_string($ip)."')"))
        throw new Exception('Error inserting into scores - '.$db->error);
    
    echo '{"success":1}';
}
catch (Exception $e)
{
    // TODO log errors
    //echo $e->getMessage();
    
    echo '{"error":1}';
}