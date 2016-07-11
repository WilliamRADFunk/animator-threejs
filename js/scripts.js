var renderer;				// Object containing elements to auto-update.
var scene;					// Object that contains all Three.js objects.
var camera;					// Player's view point.
var WIDTH;					// Width of screen at time of page load.
var HEIGHT;					// Height of screen at time of page load.
var counter = 0;
var frame = 1;
var frameB = 1;
var mesh;
var meshB;
var mesh2;
var mesh2B;
var geometry;
var material;
var materialB;
var material2;
var material2B;
var textures = [];
var textures2 = [];
var maxTime = 50;
var maxTimeB = 33;
var oldTime, oldTimeB;

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
	camera.position.set(0,4,0);
	camera.lookAt(scene.position);
	scene.add(camera);

	var light = new THREE.AmbientLight(0xFFFFFF);
	scene.add(light);

	for(var i = 1; i < 25; i++)
	{
		if(i < 10)
		{
			textures.push( THREE.ImageUtils.loadTexture('./images/character_0' + i + '.png') );
			textures2.push( THREE.ImageUtils.loadTexture('./images/others/character_0' + i + '.png') );
		}
		else
		{
			textures.push( THREE.ImageUtils.loadTexture('./images/character_' + i + '.png') );
			textures2.push( THREE.ImageUtils.loadTexture('./images/others/character_' + i + '.png') );
		}
	}
	geometry = new THREE.PlaneGeometry( 1, 1 );
	material = new THREE.MeshBasicMaterial({map:textures[frame - 1], transparent: true, side: THREE.BackSide});
	materialB = new THREE.MeshBasicMaterial({map:textures[frameB - 1], transparent: true, side: THREE.BackSide});
	material2 = new THREE.MeshBasicMaterial({map:textures2[frame - 1], transparent: true, side: THREE.BackSide});
	material2B = new THREE.MeshBasicMaterial({map:textures2[frameB - 1], transparent: true, side: THREE.BackSide});
	frame++;
	frameB++;
	mesh = new THREE.Mesh( geometry, material);
	meshB = new THREE.Mesh( geometry, materialB);
	mesh2 = new THREE.Mesh( geometry, material2);
	mesh2B = new THREE.Mesh( geometry, material2B);
	mesh.position.x = 0.5;
	mesh.position.z = 0.5;
	mesh.rotation.x = 3.14/2.0;
	mesh.rotation.z = 3.14;
	meshB.position.x = 0.5;
	meshB.position.z = -0.5;
	meshB.rotation.x = 3.14/2.0;
	meshB.rotation.z = 3.14;
	mesh2.position.x = -0.5;
	mesh2.position.z = 0.5;
	mesh2.rotation.x = 3.14/2.0;
	mesh2.rotation.z = 3.14;
	mesh2B.position.x = -0.5;
	mesh2B.position.z = -0.5;
	mesh2B.rotation.x = 3.14/2.0;
	mesh2B.rotation.z = 3.14;
	scene.add(mesh);
	scene.add(meshB);
	scene.add(mesh2);
	scene.add(mesh2B);

	oldTime = new Date().getTime();
	oldTimeB = new Date().getTime();
	render();
}

function render()
{
	counter++;
	if(counter <= 1800)
	{
		var newTime = new Date().getTime();
		if( (newTime - oldTime) > maxTime )
		{
			oldTime = newTime;
			scene.remove(mesh);
			scene.remove(mesh2);
			material.map = textures[frame - 1];
			material2.map = textures2[frame - 1];
			frame++;
			var mesh = new THREE.Mesh( geometry, material);
			var mesh2 = new THREE.Mesh( geometry, material2);
			mesh.position.x = 0.5;
			mesh.position.z = 0.5;
			mesh.rotation.x = 3.14/2.0;
			mesh.rotation.z = 3.14;
			mesh2.position.x = -0.5;
			mesh2.position.z = 0.5;
			mesh2.rotation.x = 3.14/2.0;
			mesh2.rotation.z = 3.14;
			scene.add(mesh);
			scene.add(mesh2);
		}
		if( (newTime - oldTimeB) > maxTimeB )
		{
			oldTimeB = newTime;
			scene.remove(meshB);
			scene.remove(mesh2B);
			materialB.map = textures[frameB - 1];
			material2B.map = textures2[frameB - 1];
			frameB++;
			var meshB = new THREE.Mesh( geometry, materialB);
			var mesh2B = new THREE.Mesh( geometry, material2B);
			meshB.position.x = 0.5;
			meshB.position.z = -0.5;
			meshB.rotation.x = 3.14/2.0;
			meshB.rotation.z = 3.14;
			mesh2B.position.x = -0.5;
			mesh2B.position.z = -0.5;
			mesh2B.rotation.x = 3.14/2.0;
			mesh2B.rotation.z = 3.14;
			scene.add(meshB);
			scene.add(mesh2B);
		}
		if(frame >= 24) frame = 1;
		if(frameB >= 24) frameB = 1;
		requestAnimationFrame( render );
		renderer.render( scene, camera );
	}
}