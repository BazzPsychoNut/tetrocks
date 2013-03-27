/**
 * start the game 
 */
$(document).ready(function() {

	// TODO Make sure all images are loaded before we start the game...
//	var img = new Image();
//	img.src = 'img/tetris_tiles_20.png';
//	
//	var img2 = new Image();
////	img2.onLoad = function() {
////		game.new_game();
////	};
//	img2.src = 'img/explosprite.png';
	
	// start new game
	game.new_game();
	
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
