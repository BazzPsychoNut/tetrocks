/**
 * Board class to represent the play board
 * board is responsible for drawing on the board.
 * @author Bas de Ruiter
 */
BoardClass = Class.extend({

	// set up the board
	'width': 260,
	'height': 260,
	'tilesize': 20, // width and height of a tile in the grid
	'x': 0, // top left pixel - to be set by init()
	'y': 0,
	'start_x': 0, // top left of the starting area
	'start_y': 0,

	// array to store all the generated blocks in
	blocks: [],

	// timer pattern
	timer_pattern: null,

	// init
	init: function ()
	{
		// set starting point of the board so that the bottom right will be 20px from the right canvas border
		// have 8px margin at the top and at the bottom, and 6px between next block and startarea
		this.x = Math.floor((canvas.width - this.width) / 2);
		this.y = 8 * this.tilesize;

		// setup starting area
		var startsize = 3 * this.tilesize;
		this.start_x = this.x + this.width - startsize;
		this.start_y = this.y - startsize;

		// create timer pattern
		this.timer_pattern = $("#canvas").createPattern({
			// Define width/height of pattern (before repeating)
			width:  this.tilesize,
			height: this.tilesize,
			source: function(context) {
				// Draw striped background (which will repeat)
				$(this).drawRect({
				    fillStyle: "#F5001C",
				    x: 0,
				    y: 0,
				    width:20,
				    height:20,
				    fromCenter: false
			    }).drawVector({
			        strokeStyle: "#F18518",
			        strokeWidth: 8,
			        x:4, y:24,
			        a1:24, l1:30
			    });
			}
		});
	},

	/**
	 * function to draw a tile on the canvas
	 * @param color
	 * @param special
	 * @param nx - number of squares in x direction
	 * @param ny - number of squares in y direction
	 */
	draw_tile: function(color, special, nx, ny)
	{
		var pos_x = this.x + (this.tilesize * nx);
		var pos_y = this.y + (this.tilesize * ny);

		// fetch the tile object to draw with details on where it is on the spritesheet
		var tile = g_spritesheet.get_tile_img(color);
		ctx.drawImage(g_spritesheet.img, tile.x, tile.y, tile.w, tile.h, pos_x, pos_y, tile.w, tile.h);

		// if tile has a special
		if (special)
		{
			var spec = g_spritesheet.get_special_img(special);
			ctx.drawImage(g_spritesheet.img, spec.x, spec.y, spec.w, spec.h, pos_x, pos_y, spec.w, spec.h);
		}
	},

	/**
	 * draw a block on the canvas
	 * @param block - block object
	 * @param nx - number of squares in x direction of the top left tile of the 3x3 area of the block
	 * @param ny - number of squares in y direction of the top left tile of the 3x3 area of the block
	 */
	draw_block: function(block, nx, ny)
	{
		var tile = null;
		for (var i=0; i<block.tiles.length; i++)
		{
			tile = block.tiles[i];
			this.draw_tile(block.color, tile.special, tile.x + nx, tile.y + ny);
		}
	},

	/**
	 * draw given block at the start area (currently not used)
	 * @param block
	 */
	draw_block_at_start: function(block)
	{
		var nx = (board.width / this.tilesize) - 3;
		var ny = -3;
		board.draw_block(block, nx, ny);
	},

	/**
	 * draw given block at the next area
	 * @param block
	 */
	draw_block_at_next: function(block)
	{
		// clear next block area
		var nx = (board.width / this.tilesize) - 3;
		var ny = -7;

		var cx = this.x + (nx * this.tilesize);
		var cy = this.y + (ny * this.tilesize);
		var cw = 3 * this.tilesize;
		var ch = 3 * this.tilesize;
		board.draw_empty(cx, cy, cw, ch);

		// draw new block
		board.draw_block(block, nx, ny);
	},

	/**
	 * draw area empty with only grid
	 */
	draw_empty: function(x, y, w, h)
	{
		ctx.clearRect(x, y, w, h);
	},

	/**
	 * remove a tile from the board
	 * @param nx - number of tiles in x direction
	 * @param ny - number of tiles in y direction
	 */
	clear_tile: function(nx, ny)
	{
		var x = board.x + (nx * this.tilesize);
		var y = board.y + (ny * this.tilesize);
		this.draw_empty(x, y, this.tilesize, this.tilesize);
	},

	/**
	 * draw a blob on an open play field after the user played away a tile with a blob
	 * @param nx
	 * @param ny
	 */
	draw_blob: function(nx, ny)
	{
		var pos_x = this.x + (this.tilesize * nx);
		var pos_y = this.y + (this.tilesize * ny);

		// fetch the tile object to draw with details on where it is on the spritesheet
		var spec = g_spritesheet.get_special_img("blob");
		ctx.drawImage(g_spritesheet.img, spec.x, spec.y, spec.w, spec.h, pos_x, pos_y, spec.w, spec.h);
	},

	/**
	 * draw explosion with given tile as it's center
	 * @param tile
	 */
	draw_explosions: function(bombs)
	{
		// get width and height of explosion frames
		var w = g_explosheet.get_width();
		var h = g_explosheet.get_height();

		// loop through frames with setInterval.
		var i = 0;
		var frame = null;
		var interval = setInterval(function() {
			// first clear explosion canvas
			$("#explosion").clearCanvas();
			// then place frame image
			frame = g_explosheet.frames[i];

			// draw all explosions at the same time
			for (var j=0; j<bombs.length; j++) {
				$("#explosion").drawImage({
					source: g_explosheet.img,
					x: board.x + (board.tilesize * (bombs[j].x + 0.5)),
					y: board.y + (board.tilesize * (bombs[j].y + 0.5)),
					sx: frame.x,
					sy: frame.y,
					sWidth: w,
					sHeight: h,
					cropFromCenter: false
				});
			}

			if (++i == g_explosheet.frames.length) {
				for (var j=0; j<bombs.length; j++) {
					// remove the exploded adjacent tiles ( = draw the empty grid over those fields )
					cx = board.x + (this.tilesize * (bombs[j].x-2));
					cy = board.y + (this.tilesize * (bombs[j].y-2));
					cw = 3 * this.tilesize;
					ch = 3 * this.tilesize;

					board.draw_empty(cx, cy, cw, ch);

					$("#explosion").clearCanvas(); // remove last frame
				}

				clearInterval(interval); // stop interval
			}
		}, 80);
	},

	/**
	 * draw floating score
	 * @param int score
	 */
	draw_score: function(score, nx, ny)
	{
		var x = board.x + (nx * this.tilesize) - 10;
		var y = board.y + (ny * this.tilesize) - 30;

		// draw floating score with setInterval.
		var i=0;
		var interval = setInterval(function() {
			// first clear score canvas
			$("#score").clearCanvas();
			ctxs = document.getElementById('score').getContext('2d');

		    // draw score
			ctxs.font = "bold 40px control_freak";
			ctxs.fillStyle = "red";
			ctxs.strokeStyle = "black";
			ctxs.strokeWidth = 1;
			ctxs.fillText(score, x, y+50-(3*i));
			ctxs.strokeText(score, x, y+50-(3*i));

			// after a few iterations remove the score
			if (++i == 10) {
				$("#score").clearCanvas();
				clearInterval(interval); // stop interval
			}
		}, 100);
	},

	/**
	 * draw total score in score area
	 */
	draw_total_score: function(score)
	{
		var x = this.x;
		var y = this.y - (3 * this.tilesize);
		var w = 175;
		var h = 40;

		ctx.clearRect(x, y, w, h);

		ctx.font = "bold 40px control_freak";
		ctx.textAlign = "right";
		ctx.textBaseline = "top";
		ctx.fillStyle = "red";
		ctx.strokeStyle = "black";
		ctx.strokeWidth = 1;
		ctx.fillText(score, x+w, y);
		ctx.strokeText(score, x+w, y);
	},

	/**
	 * draw the timer at the given percentage
	 * @param int percentage
	 */
	draw_timer: function(percentage)
	{
		//ctx.fillRect(this.x, (this.y + this.height + this.tilesize), this.width, this.tilesize);
		var x = this.x;
		var y = (this.y + this.height + this.tilesize);
		var w = Math.floor(this.width * percentage);
		var h = this.tilesize;

		ctx.clearRect(x, y, this.width, h);

		$("#canvas").drawRect({
			fillStyle: this.timer_pattern,
			x: x,
			y: y,
			width: w,
			height: h,
			cornerRadius: 2,
			fromCenter: false
		});
	}

});

var board = new BoardClass();


