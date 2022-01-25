/***********
 * geometry021.js
 * A polygon
 * M. Laszlo
 * September 2019
 ***********/

let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();


function createScene() {
	let red = new THREE.Color(1, 0, 0);
    let blue = new THREE.Color(0, 0, 1);
    let polygon = regularPolygonGeometry(6, red, blue);
    let axes = new THREE.AxesHelper(10);
    scene.add(polygon);
    scene.add(axes);
}


function regularPolygonGeometry(s, innerColor, outerColor) {
  var geometry = new THREE.CircleGeometry( 10, s );
  let face1 = new THREE.Face3(1, 2, 3);
  geometry.faces.push(face1);
  face1.vertexColors.push(innerColor, outerColor, outerColor);
  let face2 = new THREE.Face3(2, 3, 4);
  geometry.faces.push(face2);
  face2.vertexColors.push(innerColor, outerColor, outerColor);
  let face3 = new THREE.Face3(3, 4, 5);
  geometry.faces.push(face3);
  face3.vertexColors.push(innerColor, outerColor, outerColor);
  let args = {vertexColors: THREE.VertexColors, side: THREE.DoubleSide};
  var material = new THREE.MeshBasicMaterial(args);
  var mesh = new THREE.Mesh( geometry, material );
  return mesh;
}


function animate() {
	window.requestAnimationFrame(animate);
	render();
}


function render() {
    let delta = clock.getDelta();
    cameraControls.update(delta);
	renderer.render(scene, camera);
}


function init() {
	let canvasWidth = window.innerWidth;
	let canvasHeight = window.innerHeight;
	let canvasRatio = canvasWidth / canvasHeight;

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer({antialias : true, preserveDrawingBuffer: true});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor(0x000000, 1.0);

	camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 1000);
	camera.position.set(0, 0, 30);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
}


function addToDOM() {
	let container = document.getElementById('container');
	let canvas = container.getElementsByTagName('canvas');
	if (canvas.length>0) {
		container.removeChild(canvas[0]);
	}
	container.appendChild( renderer.domElement );
}


init();
createScene();
addToDOM();
render();
animate();

