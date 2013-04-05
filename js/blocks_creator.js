/**
 * @author Bas de Ruiter
 * 
 * This file contains the class that will create the blocks
 */

/**
 * class for accessing a (random) block
 */
Blocks_creator = Class.extend({
	
	// create array with the xy objects for easier defining the block tiles
	// top left is 0, top middle is 1, etc.
	tiles: [{"id":0, "x":0, "y":0, "special":false}, 
	        {"id":1, "x":1, "y":0, "special":false}, 
	        {"id":2, "x":2, "y":0, "special":false}, 
	        {"id":3, "x":0, "y":1, "special":false}, 
	        {"id":4, "x":1, "y":1, "special":false}, 
	        {"id":5, "x":2, "y":1, "special":false}, 
	        {"id":6, "x":0, "y":2, "special":false}, 
	        {"id":7, "x":1, "y":2, "special":false}, 
	        {"id":8, "x":2, "y":2, "special":false}],
    
	//this is an array with the definition of all blocks to generate. For pictures see all_blocks.xlsx in the docs.
	// an option someday might be to use the "matrix" 2-dimensional array: [[0,1,2], [3,4,5], [6,7,8]]
	blocks_definitions : [
	                      [0, 1, 3, 4], // 0
	                      [0, 1, 3, 6], // 1
	                      [0, 3, 6, 7], // 2
	                      [0, 3, 4, 6], // 3
	                      [0, 3, 4, 7], // 4
	                      [1, 3, 4, 6], // 5
	                      [0, 1, 2, 3, 6], // 6
	                      [0, 1, 3, 4, 6], // 7
	                      [0, 3, 4, 6, 7], // 8
	                      [0, 3, 4, 5, 6], // 9
	                      [1, 2, 3, 4, 6], // 10
	                      [0, 1, 3, 6, 7], // 11
	                      [1, 2, 3, 4, 7], // 12
	                      [1, 3, 4, 7, 8], // 13
	                      [0, 3, 5, 6, 7, 8], // 14
	                      [0, 1, 2, 3, 5, 6], // 15
	                      [0, 2, 3, 4, 5, 6], // 16
	                      [0, 3, 4, 5, 6, 8], // 17
	                      [0, 1, 3, 4, 6, 7], // 18
	                      [0, 1, 2, 3, 4, 6], // 19
	                      [0, 1, 3, 4, 7, 8], // 20
	                      [1, 2, 3, 4, 6, 7], // 21
	                      [1, 2, 3, 4, 7, 8], // 22
	                      [0, 1, 3, 5, 6, 7, 8], // 23
	                      [0, 2, 3, 4, 5, 6, 8], // 24
	                      [0, 1, 2, 3, 4, 6, 7], // 25
	                      [0, 1, 3, 4, 5, 6, 7], // 26
	                      [0, 1, 3, 4, 6, 7, 8], // 27
	                      [0, 1, 3, 4, 5, 7, 8], // 28
	                      [0, 1, 3, 4, 5, 6, 8], // 29
	                      [1, 2, 3, 4, 5, 6, 8], // 30
	                      [0, 1, 2, 3, 6, 7, 8], // 31
	                      [0, 1, 2, 3, 5, 6, 7, 8], // 32
	                      [0, 1, 3, 4, 5, 6, 7, 8], // 33
	                      [0, 1, 2, 3, 4, 6, 7, 8], // 34
	                      [0, 1, 2, 3, 4, 5, 6, 7, 8] // 35
	                     ],
	                     
	blocks_colors: [],
	
	specials: [],
	
	chance_on_special: 0.1,  // might be a variable later.
	
	load: function() 
	{
		// fill the blocks_colors based on the colors defined in the spritesheet
		for (var i=0; i<g_spritesheet.tiles.length; i++)
			this.blocks_colors.push(g_spritesheet.tiles[i].color);
		
		// fill the special tiles based on the specials defined in the spritesheet
		for (var i=0; i<g_spritesheet.specials.length; i++)
			this.specials.push(g_spritesheet.specials[i].type);
	},
	
	// return object with tiles array and color of block
	// direction is int between 0 and 3. 0 is normal 1,2,3 is 1,2 or 3 rotations
	get_block: function(id, color, direction) 
	{
		if (id == undefined)
			throw "id is required for getting a block";
		
		color = ! color ? "red" : color;
		direction = ! direction ? 0 : direction;
		
		// create array of tile objects (x, y)
		var tiles = [];
		for (var i=0, tile=null; i<this.blocks_definitions[id].length; i++) {
			tile = copy(this.tiles[this.blocks_definitions[id][i]]);
			tiles.push(tile);
		}
		
		// rotate the tiles if required
		for (var i=0; i<direction; i++) {
			tiles = this.rotate_block(tiles);
		}
		
		// add special to tile sometimes
		for (var i=0; i<tiles.length; i++) {
			if (Math.random() < this.chance_on_special) {
				tiles[i].special = this.specials[Math.floor(Math.random() * this.specials.length)];
			}
		}
		
		return {"tiles": tiles, "color": color};
	},
	
	// create and return a random block
	get_random_block: function() 
	{
		var random_id = Math.floor(Math.random() * this.blocks_definitions.length);
		var random_color_id = Math.floor(Math.random() * this.blocks_colors.length);
		var random_direction = Math.floor(Math.random() * 4);
		
		return this.get_block(random_id, this.blocks_colors[random_color_id], random_direction);
	},
	
	// rotate a block 90 degrees
	rotate_block: function(tiles) 
	{
		var new_tiles = [];
		var topleft = {'x':9, 'y':9};
		for (var i=0, new_tile=null; i<tiles.length; i++) {
			var tid = tiles[i].id;
			tid = (3*tid + 2) % 10; // f(x) = (3x + 2) % 10  <-- this will convert all indexes as if they rotated 90 degrees
			new_tile = copy(this.tiles[tid]);
			// save lowest x and y, so we can move the turned tile to the topleft at the end
			topleft.x = new_tile.x < topleft.x ? new_tile.x : topleft.x;
			topleft.y = new_tile.y < topleft.y ? new_tile.y : topleft.y;
			
			// copy special
			if (tiles[i].special)
				new_tile.special = tiles[i].special;
			
			new_tiles.push(new_tile);
		}
		
		// move to topleft if the tile is not there yet. This will make the blocks turn more natural. Especially when they are smaller.
		if (topleft.x > 0) {
			for (var i=0; i<new_tiles.length; i++)
				new_tiles[i].x -= topleft.x;
		}
		if (topleft.y > 0) {
			for (var i=0; i<new_tiles.length; i++)
				new_tiles[i].y -= topleft.y;
		}
		
		return new_tiles;
	}
	
});

var g_blocks_creator = new Blocks_creator();
g_blocks_creator.load();
