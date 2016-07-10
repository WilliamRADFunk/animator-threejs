var renderer;				// Object containing elements to auto-update.
var scene;					// Object that contains all Three.js objects.
var camera;					// Player's view point.
var WIDTH;					// Width of screen at time of page load.
var HEIGHT;					// Height of screen at time of page load.
var counter = 0;
var frame = 1;
var mesh;
var geometry;
var material;
var textures = [];
var maxTime = 42;
var oldTime;

function init()
{

	WIDTH = (window.innerWidth) * 0.97;
	HEIGHT = window.innerHeight;
	
	scene = new THREE.Scene();
	
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(WIDTH, HEIGHT);
	document.body.appendChild(renderer.domElement);
	renderer.domElement.id = "context";

	camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
	camera.position.set(0,2,0);
	camera.lookAt(scene.position);
	scene.add(camera);

	var light = new THREE.AmbientLight(0xFFFFFF);
	scene.add(light);

	for(var i = 1; i < 25; i++)
	{
		if(i < 10) textures.push( THREE.ImageUtils.loadTexture('./images/character_0' + i + '.png') );
		else  textures.push( THREE.ImageUtils.loadTexture('./images/character_' + i + '.png') );
	}
	geometry = new THREE.BoxGeometry( 1, 1, 1 );
	material = new THREE.MeshBasicMaterial({map:textures[frame - 1]});
	frame++;
	mesh = new THREE.Mesh( geometry, material);
	scene.add(mesh);

	oldTime = new Date().getTime();
	render();
}

function render()
{
	var newTime = new Date().getTime();
	if( (newTime - oldTime) > maxTime )
	{
		oldTime = newTime;
		scene.remove(mesh);
		material.map = textures[frame - 1];
		frame++;
		var mesh = new THREE.Mesh( geometry, material);
		scene.add(mesh);
	}
	if(frame >= 24) frame = 1;
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}