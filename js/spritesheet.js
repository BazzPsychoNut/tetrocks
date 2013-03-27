/**
 * @author Bas de Ruiter
 */

/**
 * Class to access the images in the spritesheet tiles.jpg using tiles_atlas.json
 */
SpriteSheet = Class.extend({
	
	// the source image
	img: null,
	
	// the source image url
	url: "",
	
	// array of tile objects
	tiles: [],
	
	// array of special tile objects
	specials: [],
	
	// init
	init: function () {},
	
	// Load the atlas at the path 'imgName' into
    // memory. This is similar to how we've
    // loaded images in previous units.
	load: function(img_url, atlas) 
	{
		// Store the URL of the spritesheet we want.
        this.url = img_url;
        
        // Create a new image whose source is at 'imgName'.
		var img = new Image();
		img.src = img_url;
		this.img = img;
		
        // width and height are equal for each tile and therefore defined only once
        var w = atlas.width;
        var h = atlas.height;
        
        var data, tile;
        
        // loop through each tile and create a Tile object to store in the tiles array
        for (var key in atlas.tiles)
    	{
        	data = atlas.tiles[key];
        	tile = {
    			"color": key,
    			"w": w,
    			"h": h,
    			"x": data.x,
    			"y": data.y
        	};
        	this.tiles.push(tile);
    	}
        
        // loop through each special tile and create a Tile object to store in the tiles array
        for (var key in atlas.specials)
    	{
        	data = atlas.specials[key];
        	tile = {
    			"type": key,
    			"w": w,
    			"h": h,
    			"x": data.x,
    			"y": data.y
        	};
        	this.specials.push(tile);
    	}
	},
	
	// get a tile object by color
	get_tile_img: function(color) 
	{
		// loop through the tiles and return the one with the matching color
		for (var i=0; i<this.tiles.length; i++) {
			
			var tile = this.tiles[i];
			if (tile.color == color)
				return tile;
		}
		
		// return null when nothing found
		return null;
	},
	
	// get a special object by type
	get_special_img: function(type) 
	{
		// loop through the tiles and return the one with the matching color
		for (var i=0; i<this.specials.length; i++) {
			
			var special = this.specials[i];
			if (special.type == type)
				return special;
		}
		
		// return null when nothing found
		return null;
	}
	
});

// define the tiles atlas
var atlas = {
	"width": 20,
    "height": 20,
    "tiles": {
    	"blue": 	{"x": 0, "y": 0},
    	"green": 	{"x": 20, "y": 0},
        "red": 		{"x": 40, "y": 0},
        "maya": 	{"x": 60, "y": 0},
        "orange": 	{"x": 20, "y": 20},
        "purple": 	{"x": 40, "y": 20},
        "yellow": 	{"x": 60, "y": 20}
    },
    "specials" : {
    	/*
    	"clover":	{"x": 0, "y": 20},
    	"bullet_1":	{"x": 20, "y": 40}, // north
    	"bullet_2":	{"x": 40, "y": 40}, // east
    	"bullet_3":	{"x": 80, "y": 40}, // south
    	"bullet_4":	{"x": 60, "y": 40}, // west
    	*/
    	"shield":	{"x": 80, "y": 0},
    	"brick":	{"x": 80, "y": 20},
    	"bomb":		{"x": 0, "y": 40},
    	"blob":		{"x": 100, "y": 0}
    }
};

// create the SpriteSheet object
var g_spritesheet = new SpriteSheet();
g_spritesheet.load('img/tetris_tiles_20.png', atlas);

