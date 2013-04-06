/**
 * start the game 
 */

$(document).ready(function() 
{
	// make sure the loading screen is loaded
	var img = new Image();
	img.onload = function()
	{
		var assets_to_load = [
			// images
			"img/enter.png",
			"img/logo.png",
			"img/background.png",
			'img/tetris_tiles_20.png', 
			'img/explosprite.png',
			"img/popup.png",
			"img/popup_bg.png",
			"img/high_score_text.png",
			"img/scores.png",
			    
			  // the actual game scripts
			"js/core.js",
			"js/board.js",
			"js/spritesheet.js",
			"js/blocks_creator.js",
			"js/game_engine.js",
			"js/input_engine.js",
			"js/sound_effects.js",
			"js/explosion_spritesheet.js",
			"js/scores.js"
		];
		              	
	  	// load all assets
	  	loadAssets(assets_to_load, function() {
	  		// here we place the ENTER button
	  		$('#background').drawImage({
	  			source: "img/enter.png",
	  			x: 0, y: 380,
	  			fromCenter: false
	  		});
	  	});
	  	
	  	// for testing.. put bombs down
		/*
		for (var x=0; x<=3; x++) {
			for (var y=0; y<=3; y++) {
				game.grid[x][y] = {"special": 'bomb', 'x':x, 'y':y, 'color':'yellow'};
				board.draw_tile('yellow', 'bomb', x, y);
			}
		}
		*/
	};
	img.src = "img/loading.png";
	
});
