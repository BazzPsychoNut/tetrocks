/**
 * @author Bas de Ruiter
 * 
 * set all init values and stuff ;)
 */

// background canvas
$('#background').drawImage({
	source: "img/loading.png",
	fromCenter: false
});

// main canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

