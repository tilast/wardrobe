////////////////////////////////////////////////////////////////////////////////
// Robot hand exercise: add a second grabber and have it respond
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, $, document, window, dat*/

var camera, scene, renderer;
var cameraControls, effectController;
var clock = new THREE.Clock();
var gridX = true;
var gridY = false;
var gridZ = false;
var axes = true;
var ground = true;

function part_parameters(w, h, d){
	this.start_width = w;
	this.start_height = h;
	this.start_depth = d;

	this.cur_width = w;
	this.cur_height = h;
	this.cur_depth = d;
}

var back_parameters;
var side_parameters;
var top_parameters;
var bottom_parameters;
var center_parameters;
var shelf_parameters;

var back, center_d, r_side, l_side, top_w, bottom;
var shelf_1, shelf_2, shelf_3, shelf_4;
var number_of_shelves = 4;
var w_height, w_width, w_depth;
var material_thickness = 1;
var wardrobe_material;
var floor_indent=3;
var scale_factor = 0.08;

function createWardrobe(w, h, d){


	var mapUrl = "/udacity-cs291/unit4/wood_texture.png";
    var map1 = THREE.ImageUtils.loadTexture(mapUrl);

	wardrobe_material = new THREE.MeshPhongMaterial( { /*color: 0xA77132,*/ specular: 0xcc8811,shininess: 50, map: map1 } );

	back_parameters = new part_parameters(w, h, 0);
	back = new THREE.Mesh( new THREE.CubeGeometry( w, h, material_thickness ), wardrobe_material );
	back.position.y = h/2;
	scene.add(back);

	side_parameters = new part_parameters(0, h, d);
	l_side = new THREE.Mesh( new THREE.CubeGeometry( material_thickness, h, d ), wardrobe_material );
	l_side.position.y = h/2;
	l_side.position.z = d/2;
	l_side.position.x = -w/2
	scene.add(l_side);

	r_side = new THREE.Mesh( new THREE.CubeGeometry( material_thickness, h, d ), wardrobe_material );
	r_side.position.y = h/2;
	r_side.position.z = d/2;
	r_side.position.x = w/2
	scene.add(r_side);

	top_parameters = new part_parameters(w + material_thickness, 0, d);
	top_w = new THREE.Mesh( new THREE.CubeGeometry( w + material_thickness, material_thickness, d ), wardrobe_material );
	top_w.position.y = h;
	top_w.position.z = d/2;
	scene.add(top_w);

	bottom_parameters = new part_parameters(w, 0, d);
	bottom = new THREE.Mesh( new THREE.CubeGeometry( w, material_thickness, d ), wardrobe_material );
	bottom.position.y = floor_indent;
	bottom.position.z = d/2;
	scene.add(bottom);

	center_parameters = new part_parameters(0, h-floor_indent, d);
	center_d = new THREE.Mesh( new THREE.CubeGeometry( material_thickness, h - floor_indent, d ), wardrobe_material );
	center_d.position.y = h/2 + floor_indent/2;
	center_d.position.z = d/2;
	center_d.position.x = 0;
	scene.add(center_d);

	shelf_parameters = new part_parameters(w/2 - 1, 0, d);
	shelf_1 = new THREE.Mesh( new THREE.CubeGeometry( w/2 - 1, material_thickness, d ), wardrobe_material );
	shelf_1.position.y = floor_indent + h / (number_of_shelves + 1);
	shelf_1.position.z = d/2;
	shelf_1.position.x = - w/4
	scene.add(shelf_1);

	shelf_2 = new THREE.Mesh( new THREE.CubeGeometry( w/2 - 1, material_thickness, d ), wardrobe_material );
	shelf_2.position.y = floor_indent + 2 * h / (number_of_shelves + 1);
	shelf_2.position.z = d/2;
	shelf_2.position.x = - w/4
	scene.add(shelf_2);

	shelf_3 = new THREE.Mesh( new THREE.CubeGeometry( w/2 - 1, material_thickness, d ), wardrobe_material );
	shelf_3.position.y = floor_indent + 3 * h / (number_of_shelves + 1);
	shelf_3.position.z = d/2;
	shelf_3.position.x = - w/4
	scene.add(shelf_3);

	shelf_4 = new THREE.Mesh( new THREE.CubeGeometry( w/2 - 1, material_thickness, d ), wardrobe_material );
	shelf_4.position.y = floor_indent + 4 * h / (number_of_shelves + 1);
	shelf_4.position.z = d/2;
	shelf_4.position.x = - w/4
	scene.add(shelf_4);

}

function changeWardrobe(w, h, d){
	wardrobe_material = new THREE.MeshPhongMaterial( { color: 0xA77132, specular: 0xCC3399, shininess: 20 } );

	var scale_koef_1 = back_parameters.start_width / back_parameters.cur_width;
	var scale_koef_2 = w / back_parameters.start_width;
	back.scale.x = scale_koef_1 * scale_koef_2;

	scale_koef_1 = back_parameters.start_height / back_parameters.cur_height;
	scale_koef_2 = h / back_parameters.start_height;
	back.scale.y = scale_koef_1 * scale_koef_2;

	back.position.y = h/2;




	scale_koef_1 = side_parameters.start_height / side_parameters.cur_height;
	scale_koef_2 = h / side_parameters.start_height;

	l_side.scale.y = scale_koef_1 * scale_koef_2;
	r_side.scale.y = scale_koef_1 * scale_koef_2;

	scale_koef_1 = side_parameters.start_depth / side_parameters.cur_depth;
	scale_koef_2 = d / side_parameters.start_depth;

	l_side.scale.z = scale_koef_1 * scale_koef_2;
	r_side.scale.z = scale_koef_1 * scale_koef_2;
	
	l_side.position.y = h/2;
	l_side.position.z = d/2;
	l_side.position.x = -w/2

	r_side.position.y = h/2;
	r_side.position.z = d/2;
	r_side.position.x = w/2




	scale_koef_1 = top_parameters.start_width / top_parameters.cur_width;
	scale_koef_2 = (w + material_thickness) / top_parameters.start_width;
	top_w.scale.x = scale_koef_1 * scale_koef_2;

	scale_koef_1 = top_parameters.start_depth / top_parameters.cur_depth;
	scale_koef_2 = d / top_parameters.start_depth;

	top_w.scale.z = scale_koef_1 * scale_koef_2;

	top_w.position.y = h;
	top_w.position.z = d/2;

	

	scale_koef_1 = bottom_parameters.start_width / bottom_parameters.cur_width;
	scale_koef_2 = w / bottom_parameters.start_width;
	bottom.scale.x = scale_koef_1 * scale_koef_2;

	scale_koef_1 = bottom_parameters.start_depth / bottom_parameters.cur_depth;
	scale_koef_2 = d / bottom_parameters.start_depth;

	bottom.scale.z = scale_koef_1 * scale_koef_2;

	bottom.position.y = floor_indent;
	bottom.position.z = d/2;




	scale_koef_1 = center_parameters.start_height / center_parameters.cur_height;
	scale_koef_2 = (h - floor_indent) / center_parameters.start_height;

	center_d.scale.y = scale_koef_1 * scale_koef_2;

	scale_koef_1 = center_parameters.start_depth / center_parameters.cur_depth;
	scale_koef_2 = d / center_parameters.start_depth;

	center_d.scale.z = scale_koef_1 * scale_koef_2;

	center_d.position.y = h/2 + floor_indent/2;
	center_d.position.z = d/2;
	center_d.position.x = 0;





	scale_koef_1 = shelf_parameters.start_width / shelf_parameters.cur_width;
	scale_koef_2 = (w/2 - 1) / shelf_parameters.start_width;

	shelf_1.scale.x = scale_koef_1 * scale_koef_2;
	shelf_2.scale.x = scale_koef_1 * scale_koef_2;
	shelf_3.scale.x = scale_koef_1 * scale_koef_2;
	shelf_4.scale.x = scale_koef_1 * scale_koef_2;

	scale_koef_1 = shelf_parameters.start_depth / shelf_parameters.cur_depth;
	scale_koef_2 = d / shelf_parameters.start_depth;

	shelf_1.scale.z = scale_koef_1 * scale_koef_2;
	shelf_2.scale.z = scale_koef_1 * scale_koef_2;
	shelf_3.scale.z = scale_koef_1 * scale_koef_2;
	shelf_4.scale.z = scale_koef_1 * scale_koef_2;

	shelf_1.position.y = floor_indent + h / (number_of_shelves + 1);
	shelf_1.position.z = d/2;
	shelf_1.position.x = - w/4

	shelf_2.position.y = floor_indent + 2 * h / (number_of_shelves + 1);
	shelf_2.position.z = d/2;
	shelf_2.position.x = - w/4

	shelf_3.position.y = floor_indent + 3 * h / (number_of_shelves + 1);
	shelf_3.position.z = d/2;
	shelf_3.position.x = - w/4

	shelf_4.position.y = floor_indent + 4 * h / (number_of_shelves + 1);
	shelf_4.position.z = d/2;
	shelf_4.position.x = - w/4
}









function fillScene() {
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );

	// LIGHTS
	var ambientLight = new THREE.AmbientLight( 0x222222 );
	var light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light.position.set( 200, 400, 500 );
	var light2 = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light2.position.set( -500, 250, -200 );
	scene.add(ambientLight);
	scene.add(light);
	scene.add(light2);



	createWardrobe(100, 175, 35);

	
}

function init() {
	var canvasWidth = 846;
	var canvasHeight = 494;
	// For grading the window is fixed in size; here's general code:
	//var canvasWidth = window.innerWidth;
	//var canvasHeight = window.innerHeight;
	var canvasRatio = canvasWidth / canvasHeight;

	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColorHex( 0xAAAAAA, 1.0 );

	// CAMERA
	camera = new THREE.PerspectiveCamera( 38, canvasRatio, 1, 10000 );
	// CONTROLS
	cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
	camera.position.set(-49, 242,54);
	cameraControls.target.set(54, 106, 33);
	fillScene();

}

function addToDOM() {
	var container = document.getElementById('container');
	var canvas = container.getElementsByTagName('canvas');
	if (canvas.length>0) {
		container.removeChild(canvas[0]);
	}
	container.appendChild( renderer.domElement );
}

function drawHelpers() {
	if (ground) {
		Coordinates.drawGround({size:10000});
	}
	if (gridX) {
		Coordinates.drawGrid({size:10000,scale:0.01});
	}
	if (gridY) {
		Coordinates.drawGrid({size:10000,scale:0.01, orientation:"y"});
	}
	if (gridZ) {
		Coordinates.drawGrid({size:10000,scale:0.01, orientation:"z"});
	}
	if (axes) {
		Coordinates.drawAllAxes({axisLength:200,axisRadius:1,axisTess:50});
	}
}

function animate() {
	window.requestAnimationFrame(animate);
	render();
}

function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);

	if ( effectController.newGridX !== gridX || effectController.newGridY !== gridY || effectController.newGridZ !== gridZ || effectController.newGround !== ground || effectController.newAxes !== axes)
	{
		gridX = effectController.newGridX;
		gridY = effectController.newGridY;
		gridZ = effectController.newGridZ;
		ground = effectController.newGround;
		axes = effectController.newAxes;

		fillScene();
		drawHelpers();
	}
	
	w_width = effectController.width * scale_factor;
	w_height = effectController.height * scale_factor;
	w_depth = effectController.depth * scale_factor;
	changeWardrobe(w_width, w_height, w_depth);

	renderer.render(scene, camera);
}

function setupGui() {

	effectController = {

		newGridX: gridX,
		newGridY: gridY,
		newGridZ: gridZ,
		newGround: ground,
		newAxes: axes,

		width: 1200,
		height: 2000,
		depth: 500
	};

	var gui = new dat.GUI();
	
	h =gui.addFolder("Wardrobe Parameters");
	h.add(effectController, "width", 500, 2000, 1).name("width");
	h.add(effectController, "height", 1500, 3000, 1).name("height");
	h.add(effectController, "depth", 200, 1000, 1).name("depth");

}

try {
	init();
	fillScene();
	drawHelpers();
	addToDOM();
	setupGui();
	animate();
} catch(e) {
	var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
	$('#container').append(errorReport+e);
}
