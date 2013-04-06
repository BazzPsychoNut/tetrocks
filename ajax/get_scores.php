<?php
/**
 * ajax script to fetch the top 9 scores
 */
try
{
    // get ip first for logging
    $ip = $_SERVER['REMOTE_ADDR'];
    
    $player_score = ! empty($_GET['player_score']) ? (int) $_GET['player_score'] : 0;
    
    // connect to db
    $db = new mysqli();
    include_once 'connect.php';
    
    $result = $db->query("select name, score from scores order by score desc, create_date limit 9")->fetch_all(MYSQLI_ASSOC);
    $json = array();
    $rank = 1;
    foreach ($result as $row)
    {
        // add player's score if it is in the top 9
        if ($player_score > $row['score'])
            $json[] = array('rank' => $rank++, 'name' => 'YOU', 'score' => $player_score, 'player_score' => 1);
        
        $json[] = array('rank' => $rank++, 'name' => $row['name'], 'score' => $row['score']);
        
        if ($rank == 10) // we always return 9 rows
            break;
    }
    
    echo '{"result":'.json_encode($json).'}';
}
catch (Exception $e)
{
    // TODO log errors
    
    echo '{"error":1}';
}