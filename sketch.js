/*
* @author Stefano Ballerini
*
*/

var mapImg; 

var baseURL = 'https://api.mapbox.com';
var mapBoxVersion = 'v4';
var mapType = 'light';

var clat = 41.8719;
var clon = 12.5674;

var zoom = 6;

var imgWidth = 1024;
var imgHeight = 1024;

var privateKey = 'pk.eyJ1IjoiYWRhbWFudGlubyIsImEiOiJjajI1eDIxaW0wMDY1MzNwY29oeDEzc2lmIn0.8OaNlBhGRgUZQqnxTuuYyg';

var population;

function preload(){

	baseURL = "" + baseURL + '/' + mapBoxVersion +'/mapbox.' + mapType + '/' + clon + ',' + clat + ',' + zoom + '/' + imgWidth + 'x' + imgHeight + '.png?access_token=' + privateKey;

	mapImg = loadImage(baseURL);
	population = loadJSON('json.json');
}

function setup() {

	createCanvas(600, 800);
	translate(width/2, height/2);
	imageMode(CENTER);
	image(mapImg, 0, 0);

	var size = Object.keys(population).length;

	for(var i = 0; i < size; i++){
		var data = population[i]
		var lat = population[i]['latitudine'];
		var lon = population[i]['longitudine'];
		var pop = population[i]['Maschi']+population[i]['Femmine'];

		pop = map(pop, 0, 500000, 0.1, 7);

		var cx = mercX(clon);
		var cy = mercY(clat);

		var x  = mercX(lon) - cx;
		var y  = mercY(lat) - cy;

		fill(12, 20, 205, 100);
		stroke(12, 20, 205);
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






