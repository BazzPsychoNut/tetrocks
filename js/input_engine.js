/**
 * class to handle user input
 * For this game it is better to have the action immediately tied to the keypress, 
 * because blocks don't move with a vector, but with steps of a tile length. 
 * The game engine is therefore not requesting this actions status in a continues update loop, 
 * but this input engine will send a request to the game engine on keydown.
 */
InputEngineClass = Class.extend({

	// A dictionary mapping ASCII key codes to string values
	// describing the action we want to take when that key is
	// pressed.
	bindings: {},

	// A dictionary mapping actions that might be taken in our
	// game to a boolean value indicating whether that action
	// is currently being performed.
	actions: {},
	
	//-----------------------------
	setup: function () {
		
		// Default key setup. Someday I will make it possible for users to adjust. :)
		// the arrow keys
		gInputEngine.bind(38, 'move-up');
		gInputEngine.bind(39, 'move-right');
		gInputEngine.bind(40, 'move-down');
		gInputEngine.bind(37, 'move-left');
		
		gInputEngine.bind(65, 'turn-left');  // a
		gInputEngine.bind(68, 'turn-right'); // d
		gInputEngine.bind(32, 'put-down'); // space bar
		
		gInputEngine.bind(80, 'pause'); // p
		gInputEngine.bind(77, 'toggle-sound'); // m
		
		gInputEngine.bind(13, 'enter'); // enter (to start the game)

		
		// Adding the event listeners for the appropriate DOM events.
		$(document).keydown(gInputEngine.onKeyDown);
		$(document).keyup(gInputEngine.onKeyUp);
		
		$("#canvas_container").mousemove(gInputEngine.onMouseMove);
		
		$("#canvas_container").click(gInputEngine.onClick);
	},
	
	onMouseMove: function(event)
	{
		var x = event.offsetX;
		var y = event.offsetY;
		
		if (gInputEngine.button_new_game(x, y) || 
				gInputEngine.button_options(x, y) || 
				gInputEngine.button_resume(x, y) || 
				gInputEngine.button_enter(x, y) ||
				gInputEngine.button_again(x, y) ||
				gInputEngine.button_submit(x, y)
			)
			$(this).css({'cursor':'pointer'});
		else
			$(this).css({'cursor':'auto'});
	},
	
	onClick: function (event) 
	{
		var x = event.offsetX;
		var y = event.offsetY;
		
		// main screen
		if (gInputEngine.button_new_game(x, y))
			game.new_game();
		
		else if (gInputEngine.button_options(x, y))
			game.pause_game();
		
		// paused
		else if (gInputEngine.button_resume(x, y))
			game.resume_game();
		
		// loading & credits screen
		else if (gInputEngine.button_enter(x, y))
			game.start_game();

		// again (= new game) on game over screen
		else if (gInputEngine.button_again(x, y)) 
			game.new_game();

		// submit high score on game over screen
		else if (gInputEngine.button_submit(x, y))
			scores.submit_score();
		
	},
	
	button_new_game: function(x, y) {
		return (x >= 28 && x <= 111 && y >= 56 && y <= 80 && ! game.paused && ! game.loading);
	},

	button_options: function(x, y) {
		return (x >= 124 && x <= 209 && y >= 59 && y <= 82 && ! game.paused && ! game.loading);
	},

	button_resume: function(x, y) {
		return (x >= 115 && x <= 207 && y >= 375 && y <= 397 && game.paused);
	},
	
	button_enter: function(x, y) {
		return (x >= 120 && x <= 208 && y >= 388 && y <= 422 && game.loading);
	},
	
	button_again: function(x, y) {
		return (x >= 208 && x <= 296 && y >= 438 && y <= 463 && ! game.loading && game.game_is_over && ! game.has_high_score);
	},
	
	button_submit: function(x, y) {
		return (x >= 208 && x <= 296 && y >= 438 && y <= 463 && ! game.loading && game.game_is_over && game.has_high_score);
	},

	// add event listeners
	onKeyDown: function (event) {
		
		// execute normal browser action when game has ended
		if (game.game_is_over)
			return true;
		
		// Grab the keyID property of the event object parameter,
		// then set the equivalent element in the 'actions' object
		// to false.
		// 
		// You'll need to use the bindings object you set in 'bind'
		// in order to do this.
		var action = gInputEngine.bindings[event.keyCode];

		if (action) {
			// only have moves executed by the update loop. turns and put-downs have to be executed when user presses the key
			if (action.substr(0, 4) == 'move')
				gInputEngine.actions[action] = true;
			else
				game.execute_input(action);
		}
		
		return false; // do not execute normal browser action for this key
	},

	// add event listeners
	onKeyUp: function (event) {
		
		// execute normal browser action when game has ended
		if (game.game_is_over)
			return true;
		
		// Grab the keyID property of the event object parameter,
		// then set the equivalent element in the 'actions' object
		// to false.
		// 
		// You'll need to use the bindings object you set in 'bind'
		// in order to do this.
		var action = gInputEngine.bindings[event.keyCode];

		if (action && action.substr(0, 4) == 'move') {
			gInputEngine.actions[action] = false;
		}
		
		return false; // do not execute normal browser action for this key
	},

	// The bind function takes an ASCII keycode
	// and a string representing the action to
	// take when that key is pressed.
	// 
	// Fill in the bind function so that it
	// sets the element at the 'key'th value
	// of the 'bindings' object to be the
	// provided 'action'.
	bind: function (key, action) {
		gInputEngine.bindings[key] = action;
	}
	
});

gInputEngine = new InputEngineClass();
gInputEngine.setup();
