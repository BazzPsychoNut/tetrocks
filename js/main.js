/**
 * start the game 
 */

$(document).ready(function() 
{
	// make sure the loading screen is loaded first
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
			"img/enter_score.png",
			"img/game_over.png",
			"img/loader.gif",
			"img/game_over_no_button.png",
			
			// the actual game scripts
			"js/board.js",
			"js/blocks_creator.js",
			"js/game_engine.js",
			"js/sound_effects.js",
			"js/explosion_spritesheet.js",
			"js/scores.js",
			"js/input_engine.js",
		];
		
	  	// load all assets
		// first the images, then the scripts, to enforce spritesheet.js and thus blocks_creator will work properly
	  	loadAssets(assets_to_load, function() {
	  		// place the ENTER button when all assets have been loaded
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
