/*
* @author Stefano Ballerini
*
*/

var mapImg; 

var baseURL = 'https://api.mapbox.com';
var mapBoxVersion = 'v4';
var mapType = 'light';

var clat = 0;
var clon = 0;

var zoom = 2;

var imgWidth = 1024;
var imgHeight = 512;

var privateKey = 'pk.eyJ1IjoiYWRhbWFudGlubyIsImEiOiJjajI1eDIxaW0wMDY1MzNwY29oeDEzc2lmIn0.8OaNlBhGRgUZQqnxTuuYyg';

var population;

function preload(){

	baseURL = "" + baseURL + '/' + mapBoxVersion +'/mapbox.' + mapType + '/' + clon + ',' + clat + ',' + zoom + '/' + imgWidth + 'x' + imgHeight + '.png?access_token=' + privateKey;

	mapImg = loadImage(baseURL);
	population = loadStrings('/population/simplemaps-worldcities-basic.csv');
}

function setup() {

	createCanvas(1024, 512);
	translate(width/2, height/2);
	imageMode(CENTER);
	image(mapImg, 0, 0);

	for(var i = 0; i < population.length; i++){
		var data = population[i].split(/,/);
		var lat = data[2];
		var lon = data[3];
		var pop = data[4];

		pop = map(pop, 0, 30000000, 0, 30);

		var cx = mercX(clon);
		var cy = mercY(clat);

		var x  = mercX(lon) - cx;
		var y  = mercY(lat) - cy;

		fill(150, 20, 205, 100);
		stroke(150, 20, 205);
		ellipse(x, y, pop, pop); 
	}

	
}

function mercX(lon){
	lon = radians(lon);
	var a = (128 / PI) * pow(2, zoom);
	var b = lon + PI;
	return a * b;
}

function mercY(lat){
	lat = radians(lat);
	var a = (128 / PI) * pow(2, zoom);
	var b = tan(PI / 4 + lat / 2);
	var c = PI - log(b);
	return a * c;
}

function draw(){

}






