/**
 * @author Bas de Ruiter
 */

/**
 * Class to access the images in the spritesheet tiles.jpg using tiles_atlas.json
 */
ExploSpriteSheet = Class.extend({
	
	// the source image
	img: null,
	
	// the source image url
	url: "",
	
	// array of tile objects
	frames: [],
	
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
        for (var i=0; i<atlas.frames.length; i++)
    	{
        	data = atlas.frames[i];
        	tile = {
    			"id": i,
    			"w": w,
    			"h": h,
    			"x": data.x,
    			"y": data.y
        	};
        	g_explosheet.frames.push(tile);
    	}
	},
	
	get_frame: function(id) {
		return this.frames[id];
	},
	
	get_width: function() {
		return this.frames[0].w;
	},
	
	get_height: function() {
		return this.frames[0].h;
	}
	
});

// define the tiles atlas
var atlas = {
	"width": 64,
    "height": 64,
    "frames": []
};
for (var y=0; y<256; y+=64) 
{
	for (var x=0; x<256; x+=64)
	{
		atlas.frames.push({"x":x, "y":y});
	}
}


// create the SpriteSheet object
var g_explosheet = new ExploSpriteSheet();
g_explosheet.load('img/explosprite.png', atlas);

