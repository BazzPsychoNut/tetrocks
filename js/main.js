/**
 * start the game 
 */
$(document).ready(function() 
{
	// TODO start with loading screen

	
	var assets_to_load = [
        // the actual game scripts
	    "js/init.js",
	    "js/core.js",
	    "js/sound_effects.js",
	    "js/spritesheet.js",
	    "js/explosion_spritesheet.js",
	    "js/blocks_creator.js",
	    "js/board.js",
	    "js/game_engine.js",
	    "js/input_engine.js",
	    
	    // images
	    "img/logo.png",
	    "img/background.png",
	    'img/tetris_tiles_20.png', 
	    'img/explosprite.png',
	    "img/popup.png",
	    "img/popup_bg.png"
    ];
	
	// load all assets
	loadAssets(assets_to_load, function() {
		// then start the game
		game.new_game();
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
	
});
