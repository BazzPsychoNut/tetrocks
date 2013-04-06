/**
 * @author Bas
 * The Scores class is used for submitting scores and fetching and drawing high scores
 */
ScoresClass = Class.extend({
	
	
	
	draw_high_scores: function()
	{
		// draw scores screen
		$("#popup").drawImage({
  			source: "img/scores.png",
  			fromCenter: false
  		});
		
		$.getJSON("ajax/get_scores.php?player_score="+game.total_score, function(high_scores) 
		{
			// exit if there was an error fetching the scores
			if (high_scores.error)
				return;
			
			for (var i=0; i<high_scores.result.length; i++) {
				scores.draw_row(high_scores.result[i]);
			}
		});
		
	},
	
	
	draw_row: function(row)
	{
		// TODO build
	}
	
});

var scores = new ScoresClass();

