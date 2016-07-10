var renderer;				// Object containing elements to auto-update.
var scene;					// Object that contains all Three.js objects.
var camera;					// Player's view point.
var WIDTH;					// Width of screen at time of page load.
var HEIGHT;					// Height of screen at time of page load.

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
	camera.position.set(0,5,0);
	camera.lookAt(scene.position);
	scene.add(camera);

	var light = new THREE.AmbientLight(0xFFFFFF);
	scene.add(light);

	var texture = THREE.ImageUtils.loadTexture('./images/character3_01.png');
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial({map:texture});
	var mesh = new THREE.Mesh( geometry, material);
	scene.add(mesh);

	render();
}

function render()
{
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}