import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r113/build/three.module.js';




// VARIABLES
var cubes = []
var moveLeft = false;
var moveRight = false;
var moveForward = false;
var moveBackward = false;
var moveUp = false;
var moveDown = false;
var rotateLeft = false;
var rotateRight = false
var rotateUp = false;
var rotateDown = false;

// Textures
var cobblestone = 'img/stonebrick.png'
var cloth = 'img/cloth_0.png'
var dirt = 'img/dirt.png'
var sand = 'img/sand.png'
var wood = 'img/wood.png'
var grass = 'img/grass.png'
var woodPlanks = 'img/planks.png'
var leaves = 'img/leaves.png'


var selectedBlock = 0;

let blocks = [cobblestone, cloth, dirt, sand, wood, grass, woodPlanks, leaves]
var selectedTexture = blocks[selectedBlock]

var character = {
	"rotation" : 3.14,
	"rotationVert" : 0,
	"lookX" : 0,
	"lookY" : 0,
	"lookZ" : 0,
	"upVelocityOrig": .28,
	"upVelocity": 0,
	"upAcceleration": 0.01,
	"moveSpeed": .03,
	"falling": false
}

// ----------------------------------------------------------------------
// S E T   U P
// ----------------------------------------------------------------------

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas});

const fov = 75;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 15; // Sets The Render Distance
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.y = 2;

const scene = new THREE.Scene();


{
	const skyColor = 0xFFFFFF////0xDDDDFF;  // light blue
	const groundColor = 0xFFFFFF//0xB97A20;  // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
}


// ----------------------------------------------------------------------
// C O O K I E S
// ----------------------------------------------------------------------	

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var userCookie = getCookie("username");
function checkCookie() {
  var userCookie=getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
     user = prompt("Please enter your name:","");
     if (user != "" && user != null) {
       setCookie("username", user, 30);
     }
  }
}




// ----------------------------------------------------------------------
// C U B E   O B J E C T
// ----------------------------------------------------------------------	
	
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

	
function makeInstance(geometry, textured, color, x, y, z) {
	let material = new THREE.MeshLambertMaterial();
	if (textured !== "") {
		const loader = new THREE.TextureLoader();
		//material = new THREE.MeshLambertMaterial({
		material = new THREE.MeshBasicMaterial({
			map: loader.load(textured),
		});
		material.map.magFilter = THREE.NearestFilter;
	}
	if (textured === false) {
		console.log(textured)
		material = new THREE.MeshBasicMaterial({
			color: 0xFF8844,
		});
	}
	
	

	const cube = new THREE.Mesh(geometry, material);	
	scene.add(cube);
	cube.position.x = x;
	cube.position.y = y;
	cube.position.z = z;
	return cube;
}

var firstCube = makeInstance(geometry, false, 0xaa8800,  2, 0, 0)
cubes.push(firstCube)

//Make A Tree
function makeTree(x, y, z) {
	cubes.push(makeInstance(geometry, wood, 0x44aa88,  x, y, z))
	cubes.push(makeInstance(geometry, wood, 0x44aa88,  x, y+1, z))

	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x+1, y+2, z))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x-1, y+2, z))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x, y+2, z+1))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x, y+2, z-1))

	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x+2, y+4, z))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x-2, y+4, z))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x, y+4, z+2))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x, y+4, z-2))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x+1, y+4, z+1))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x+1, y+4, z-1))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x-1, y+4, z+1))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x-1, y+4, z-1))

	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x+2, y+3, z))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x-2, y+3, z))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x, y+3, z+2))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x, y+3, z-2))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x+1, y+3, z+1))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x+1, y+3, z-1))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x-1, y+3, z+1))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x-1, y+3, z-1))

	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x+1, y+5, z))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x-1, y+5, z))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x, y+5, z+1))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x, y+5, z-1))
	cubes.push(makeInstance(geometry, leaves, 0x44aa88,  x, y+5, z))
}

//Make The Ground
for (let a = -50; a < 50; a++) {
	for (let b = -50; b < 50; b++) {
		cubes.push(makeInstance(geometry, grass, 0x44aa88,  a, 0, b))
	}
}

//Make The Walkway
makeTree(12,1,0)

// ----------------------------------------------------------------------
// L O A D   S A V E D   D A T A
// ----------------------------------------------------------------------	



function loadData(theData) {
	console.log(theData)
	let cursVal = 0;
	console.log(theData);
	let cookieValues = theData.split("B");
	while (cursVal < cookieValues.length) {
		let a = parseInt(cookieValues[cursVal],10);
		let b = parseInt(cookieValues[cursVal+1],10);
		let c = parseInt(cookieValues[cursVal+2],10);
		let d = parseInt(cookieValues[cursVal+3],10);
		console.log(a,b,c,d)
		makeInstance(geometry, blocks[a], 0x44aa88, b, c, d)
		cursVal += 4;
	}
}
loadData("0B0B0B-3B0B0B0B-3B0B0B0B-3B0B0B0B-2B0B0B0B-1B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B2B0B0B0B3B0B0B0B3B0B0B0B5B0B0B0B5B0B0B0B4B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B1B0B0B0B-3B0B0B0B-2B0B1B0B-2B0B1B0B-2B0B1B0B-3B0B1B0B-2B0B1B0B-1B0B1B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B1B0B0B0B2B0B1B0B0B0B1B0B0B0B1B0B1B0B1B0B2B0B1B0B2B0B1B0B3B0B1B0B4B0B1B0B5B0B-1B0B-3B0B-1B0B-2B0B-1B0B-1B0B-1B0B-1B0B-1B0B0B0B0B0B0B0B0B0B0B0B-1B0B1B0B-1B0B1B0B-1B0B2B0B-1B0B2B0B-1B0B3B0B-1B0B4B0B-1B0B4B0B-1B0B5B0B-1B0B6B0B-1B0B7B0B-1B0B7B0B-1B0B8B0B-1B0B9B0B-1B0B9B0B-1B0B10B0B-1B0B11B0B-1B0B11B0B-1B0B12B0B0B0B4B0B0B0B5B0B0B0B6B0B0B0B6B0B0B0B7B0B0B0B8B0B0B0B8B0B0B0B9B0B0B0B10B0B0B0B11B0B0B0B11B0B0B0B12B0B0B0B4B0B0B0B4B0B0B0B5B0B0B0B6B0B0B0B6B0B0B0B7B0B1B0B5B0B1B0B6B0B1B0B7B0B0B0B8B0B0B0B8B0B1B0B8B0B1B0B8B0B1B0B9B0B1B0B9B0B0B0B10B0B1B0B9B0B1B0B9B0B1B0B10B0B1B0B10B0B1B0B11B0B1B0B12B0B2B0B0B0B4B0B0B0B3B0B0B0B5B0B0B1B4B0B0B1B5B0B0B1B5B0B0B1B5B0B0B1B6B0B0B1B6B0B-1B1B5B0B-1B6B4B1B-1B6B4B1B-2B6B5B1B-2B6B6B1B-2B6B7B1B-2B6B4B1B1B6B4B1B2B6B5B1B2B6B6B1B2B6B7B1B2B6B8B1B2B6B8B1B1B6B8B1B0B6B8B1B-1B6B8B1B-2B6B4B2B1B6B4B2B2B6B5B2B2B6B6B2B2B6B7B2B2B6B8B2B2B6B8B2B1B6B8B2B0B6B8B2B-1B6B8B2B-2B6B7B2B-2B6B6B2B-2B6B5B2B-2B6B4B2B-2B6B4B2B-1B6B4B3B-1B6B4B3B-2B6B5B3B-2B6B6B3B-2B6B8B3B-2B6B7B3B-2B6B8B3B-1B6B8B3B0B6B8B3B1B6B7B3B2B6B6B3B2B6B5B3B2B6B4B3B2B6B4B3B1B6B4B3B0B4B4B4B-2B4B3B4B-2B4B4B3B-3B4B3B3B-3B4B5B3B-3B4B6B3B-3B4B7B3B-3B4B8B3B-3B4B9B3B-3B6B4B4B-1B6B4B4B0B6B4B4B1B4B3B5B-1B4B3B5B0B4B3B5B1B4B3B4B2B4B3B3B3B4B4B3B3B4B5B3B3B4B6B3B3B4B7B3B3B4B8B3B3B4B9B3B3B4B4B4B2B4B5B4B2B4B6B4B2B4B7B4B2B4B8B4B2B4B9B4B2B6B8B3B2B6B8B4B1B6B9B4B0B6B9B3B0B6B9B2B0B6B9B1B0B0B9B2B0B0B9B1B0B0B9B2B0B0B9B3B0B0B9B3B0B0B9B3B0B0B9B3B0B0B9B3B0B0B9B3B0B0B9B3B0B0B9B4B0B4B4B5B1B4B5B5B1B4B6B5B1B4B7B5B1B4B9B5B1B4B8B5B1B4B5B4B-2B4B6B4B-2B4B7B4B-2B4B8B4B-2B4B9B4B-2B4B9B5B0B4B9B5B-1B4B8B5B0B4B4B5B0B4B4B5B-1B4B5B5B0B4B5B5B-1B4B8B5B-1B4B7B5B0B4B7B5B-1B4B6B5B-1B4B6B5B0B1B7B0B0B1B6B0B-1B1B7B0B-1B1B7B0B1B1B6B0B1B1B5B0B1B7B3B1B-2B7B3B1B2B0B4B2B-2B0B4B3B-2B0B4B1B-2B0B8B1B-1B6B8B1B-1B0B8B1B-2B0B8B2B-2B0B7B2B-2B6B7B2B-2B0B4B2B2B0B4B3B2B0B4B1B2B0B8B2B2B0B8B2B2B0B8B2B2B0B8B3B2B0B8B2B2B0B8B1B2B6B8B4B0B6B8B4B-1B0B-1B0B-4B0B-1B0B-5B0B-1B0B-6B0B-1B0B-7B0B-1B0B-8B0B-1B0B-8B0B-1B0B-9B0B-1B0B-10B0B-1B0B-11B0B-1B0B-12B0B-1B0B-12B0B-1B0B-13B0B0B0B-4B0B0B0B-4B0B0B0B-5B0B0B0B-6B0B0B0B-6B0B0B0B-7B0B0B0B-8B0B0B0B-9B0B0B0B-9B0B0B0B-10B0B0B0B-11B0B0B0B-12B0B0B0B-13B0B1B0B-4B0B1B0B-5B0B1B0B-6B0B0B0B-7B0B0B0B-8B0B1B0B-9B0B1B0B-9B0B1B0B-8B0B1B0B-7B0B1B0B-6B0B0B0B-10B0B1B0B-11B0B1B0B-11B0B0B0B-10B0B0B0B-10B0B0B0B-9B0B0B0B-10B0B1B0B-11B0B1B0B-12B0B1B0B-11B0B1B0B-11B0B0B0B-10B0B1B0B-10B0B1B0B-11B0B1B0B-12B0B1B0B-13B0B-2B1B-14B0B-2B2B-14B0B-2B3B-14B0B-3B1B-15B0B-3B2B-15B0B-3B3B-15B0B-3B5B-15B0B-2B5B-14B0B2B1B-14B0B3B1B-15B0B2B2B-14B0B2B3B-14B0B2B4B-14B0B-2B4B-14B0B2B5B-14B0B3B2B-15B0B3B3B-15B0B3B5B-15B0B-4B1B-16B0B-4B2B-16B0B-4B3B-16B0B-4B5B-16B0B-5B1B-17B0B-5B2B-17B0B-5B3B-17B0B-5B4B-17B0B-5B5B-17B0B4B1B-16B0B4B2B-16B0B4B3B-16B0B4B5B-16B0B5B1B-17B0B5B2B-17B0B5B3B-17B0B5B3B-17B0B5B4B-17B0B5B5B-17B0B-1B3B-14B0B0B3B-14B0B1B3B-14B0B3B4B-15B0B4B4B-16B0B-3B4B-15B0B-4B4B-16B0B1B4B-14B0B0B4B-14B0B-1B4B-14B6B0B4B-15B6B-1B4B-15B6B-2B4B-15B6B1B4B-15B6B2B4B-15B6B3B4B-16B6B2B4B-16B6B1B4B-16B6B0B4B-16B6B-1B4B-16B6B-2B4B-16B6B-3B4B-16B6B-4B4B-17B6B-3B4B-17B6B-2B4B-17B6B-1B4B-17B6B0B4B-17B6B1B4B-17B6B2B4B-17B6B4B4B-17B6B3B4B-17B0B-3B3B-18B0B-4B3B-18B4B-3B3B-18B4B-4B3B-18B4B-3B2B-19B4B-4B2B-19B4B-3B1B-20B4B-4B1B-20B0B0B0B-13B0B0B0B-14B0B0B0B-14B0B0B0B-15B0B0B0B-15B0B0B0B-16B0B0B0B-17B0B0B0B-18B0B0B0B-19B0B0B0B-20B0B0B0B-21B0B0B0B-21B0B-1B0B-21B0B-2B0B-21B0B-3B0B-21B0B-4B0B-21B0B-4B0B-22B0B-3B0B-22B0B-2B0B-22B0B-1B0B-22B0B0B0B-22B0B0B0B-22B0B0B0B-23B0B0B0B-23B0B-1B0B-23B0B-2B0B-23B0B-3B0B-23B0B-3B0B-23B0B-3B0B-23B0B-3B0B-23B0B-4B0B-23B0B-1B0B-19B0B-1B0B-19B0B-1B0B-20B0B-1B0B-17B0B-1B0B-18B0B0B0B-15B0B0B0B-14B0B-1B0B-14B0B-1B0B-15B0B-1B0B-16B0B0B0B-13B0B0B0B-14B0B0B0B-15B0B0B0B-14B0B0B0B-14B0B0B0B-15B0B1B0B-16B0B1B0B-18B0B1B0B-19B0B1B0B-20B0B1B0B-20B0B1B0B-21B0B1B0B-22B0B1B0B-23B0B1B0B-17B0B0B0B-15B0B0B0B-14B0B0B0B-13B0B0B0B-13B0B0B0B-13B0B0B0B-14B0B0B0B-15B0B1B0B-14B0B1B0B-15B0B5B6B-17B0B2B6B-14B0B-2B6B-14B0B-5B6B-17B4B0B3B-14B4B-1B3B-14B4B0B3B-14B4B1B3B-14B7B-4B1B-12B7B-5B1B-12B7B-6B1B-12B7B-7B1B-12B7B-7B1B-12B7B-8B1B-12B7B-9B1B-12B7B-10B1B-12B7B-11B1B-12B7B-11B1B-12B7B-12B1B-12B7B4B1B-12B7B5B1B-12B7B5B1B-12B7B6B1B-12B7B7B1B-12B7B8B1B-12B7B9B1B-12B7B10B1B-12B7B10B1B-12B3B-4B0B-5B3B-3B0B-4B3B-7B0B-7B3B-11B0B-7B3B-13B0B-3B3B-12B0B0B3B-7B0B0B3B-4B0B-1B3B-4B0B3B3B-6B0B5B3B-9B0B6B3B-11B0B3B3B-13B0B2B3B-14B0B5B3B-12B0B8B3B-8B0B9B3B-5B0B9B3B-2B0B5B3B-8B0B2B3B-11B0B1B3B-15B0B2B3B-17B0B2B3B-18B0B0B3B-17B0B-2B3B-16B0B-4B3B-17B0B-6B3B-19B0B-6B3B-20B0B-6B3B-22B0B-1B3B-20B0B1B3B-17B0B1B3B-15B0B0B3B-13B0B-1B3B-12B0B0B3B-12B0B2B3B-11B0B4B3B-10B0B4B3B-8B0B3B3B-7B0B0B3B-8B0B-1B3B-9B0B-3B3B-11B0B-4B3B-9B0B-4B3B-7B0B-5B3B-5B0B-4B3B-4B0B-3B3B-3B0B-1B3B-3B0B0B3B-4B0B1B3B-5B0B2B3B-6B0B3B3B-8B0B3B3B-9B0B3B3B-10B0B4B3B-9B0B5B3B-11B0B6B3B-12B0B5B3B-14B0B3B3B-14B0B2B3B-16B1B-1B3B-15B1B-3B3B-12B1B-5B3B-13B1B-7B3B-15B1B-7B3B-17B1B-6B3B-19B1B-2B3B-18B1B0B3B-12B1B1B3B-11B1B-1B3B-10B1B-3B3B-7B1B-1B3B-6B1B2B3B-8B1B3B3B-10B1B4B3B-12B1B4B3B-14B1B2B3B-12B1B3B3B-12B1B4B3B-11B1B4B3B-6B1B1B3B-6B1B0B3B-6B1B-1B3B-6B2B2B3B-6B2B1B3B-6B2B0B3B-6B2B-1B3B-7B2B-1B3B-10B2B-3B3B-13B1B-5B3B-6B1B-2B3B-5B1B1B3B-5B1B0B3B-5B1B0B3B-5B1B-1B0B1B1B7B0B0B1B7B0B-1B1B7B0B-1B2B8B0B0B2B8B0B1B2B8B0B1B3B9B0B0B3B9B0B-1B3B9B0B-1B3B10B0B0B3B10B0B1B3B10B0B-1B3B11B0B0B3B11B0B0B3B11B0B1B3B11B0B1B2B12B0B0B2B12B0B-1B2B12B0B-1B1B13B0B0B1B13B0B1B1B13B2B-5B1B-2B2B-7B0B3B2B-7B0B4B2B-8B0B4B2B-9B0B5B2B-10B0B6B2B-11B0B7B2B-11B0B6B2B-12B0B5B2B-13B0B5B2B-14B0B4B2B-13B0B3B2B-12B0B2B2B-13B0B1B2B-12B0B0B2B-13B0B-1B2B-13B0B-2B2B-11B0B-3B2B-11B0B-4B2B-9B0B-5B2B-8B0B-6B2B-6B0B-5B2B-5B0B-4B2B-4B0B-3B2B-3B0B-2B2B-2B0B-1B2B-4B0B2B2B-5B0B4B2B-6B0B5B2B-8B0B5B2B-9B0B5B2B-9B0B7B2B-8B0B8B4B-2B1B8B4B-2B2B8B4B-2B3B8B4B-2B4B8B4B2B1B8B4B2B2B8B4B2B3B8B4B2B4B8B4B-2B5B8B4B-2B6B8B4B-2B7B8B4B-2B8B8B4B2B5B8B4B2B6B8B4B2B7B8B4B2B8B8B4B1B8B8B4B0B8B8B4B-1B8B8B4B3B8B8B4B-3B8B8B0B0B0B14B0B0B0B14B0B0B0B15B0B0B0B16B0B0B0B16B0B0B0B17B0B0B0B18B0B0B0B19B0B0B0B19B0B0B0B20B0B0B0B20B0B0B1B13B0B0B1B13B0B0B1B14B0B-1B1B14B0B-1B1B14B0B-1B1B15B0B-1B1B16B0B-1B1B17B0B-1B1B17B0B0B1B15B0B0B1B15B0B0B1B16B0B0B1B16B0B0B1B17B0B0B1B18B0B0B1B19B0B0B1B20B0B-1B1B18B0B-1B1B19B0B-1B1B20B0B1B1B14B0B1B1B14B0B1B1B15B0B1B1B16B0B1B1B17B0B1B1B18B0B1B1B19B0B1B1B20B0B5B1B-18B0B5B1B-19B0B5B1B-20B0B5B1B-21B0B5B1B-22B0B5B1B-22B0B5B1B-23B0B5B1B-24B0B5B2B-24B0B5B2B-23B0B5B2B-22B0B5B2B-21B0B5B2B-20B0B5B2B-19B0B5B2B-18B0B5B3B-18B0B5B3B-19B0B5B3B-20B0B5B3B-21B0B5B3B-21B0B5B3B-22B0B5B3B-24B0B5B3B-23B0B5B4B-24B0B5B4B-23B0B5B4B-22B0B5B4B-20B0B5B4B-19B0B5B4B-18B0B5B4B-21B0B5B5B-19B0B5B5B-21B0B5B5B-23B6B4B4B-18B6B3B4B-18B6B2B4B-18B6B1B4B-18B6B0B4B-18B6B-1B4B-18B6B-2B4B-18B6B-2B4B-19B6B-1B4B-19B6B0B4B-19B6B0B4B-19B6B1B4B-19B6B2B4B-19B6B3B4B-19B6B4B4B-19B6B4B4B-20B6B3B4B-20B6B2B4B-20B6B1B4B-20B6B0B4B-20B6B-1B4B-20B6B-2B4B-20B6B-2B4B-21B6B-1B4B-21B6B0B4B-21B6B0B4B-21B6B1B4B-21B6B2B4B-21B6B4B4B-21B6B3B4B-21B6B4B4B-22B6B2B4B-22B6B3B4B-22B6B1B4B-22B6B0B4B-22B6B-1B4B-22B6B-2B4B-22B7B4B1B7B7B5B1B7B7B6B1B7B7B7B1B7B7B8B1B6B7B9B1B6B7B10B1B6B7B11B1B6B7B11B1B6B7B12B1B6B7B13B1B6B7B-4B1B7B7B-5B1B7B7B-6B1B7B7B-7B1B7B7B-8B1B6B7B-9B1B6B7B-10B1B6B7B-11B1B6B7B-12B1B6B7B-13B1B7B7B13B2B6B7B12B2B6B7B11B2B6B7B10B2B6B7B9B2B6B7B8B2B6B7B7B2B7B7B6B2B7B7B5B2B7B7B4B2B7B7B-4B2B7B7B-5B2B7B7B-6B2B7B7B-7B2B7B7B-8B2B6B7B-9B2B6B7B-10B2B6B7B-11B2B6B7B-12B2B6B7B-13B2B7B2B2B0B-5B2B2B0B-5B2B3B0B-6B2B4B0B-6B2B5B0B-5B2B5B0B-5B2B6B0B-6B2B6B0B-5B2B7B0B-6B2B8B0B-6B2B9B0B-6B2B9B0B-7B2B10B0B-7B2B11B0B-8B2B12B0B-8B2B13B0B-8B2B14B0B-7B2B14B0B-6B2B15B0B-6B2B15B0B-4B2B16B0B-3B2B16B0B-2B2B17B0B0B2B17B0B0B2B18B0B0B2B18B0B0B2B18B0B1B2B18B0B2B2B19B0B2B2B17B0B-1B2B17B0B-2B2B16B0B-3B2B15B0B-4B2B14B0B-3B2B13B0B-4B2B13B0B-5B2B13B0B-5B2B12B0B-5B2B11B0B-6B2B11B0B-6B2B10B0B-7B2B9B0B-7B2B8B0B-5B2B7B0B-5B2B7B0B-6B2B6B0B-6B2B6B0B-7B2B4B0B-7B2B3B0B-5B2B2B0B-6B2B2B0B-7B5B16B1B-10B5B17B1B-9B5B18B1B-7B5B19B1B-7B5B19B1B-6B5B19B1B-5B5B19B1B-3B5B19B1B-2B5B21B1B-2B5B21B1B-1B5B22B1B-1B5B23B1B0B5B23B1B0B5B23B1B1B5B23B1B2B5B22B1B2B5B22B1B3B5B22B1B4B5B23B1B4B5B24B1B5B5B23B1B6B5B22B1B7B5B21B1B8B5B19B1B8B5B18B1B8B5B18B1B9B5B18B1B10B5B17B1B11B5B16B1B11B5B16B1B12B5B14B1B12B5B15B1B13B5B14B1B14B5B15B1B15B5B13B1B16B5B13B1B16B5B12B1B16B5B10B1B16B5B10B1B17B5B9B1B17B5B12B1B15B5B12B1B14B5B13B1B14B5B13B1B13B5B14B1B13B5B15B1B12B5B15B1B11B5B16B1B11B5B17B1B11B5B17B1B10B5B18B1B9B5B19B1B8B5B19B1B7B5B20B1B7B5B20B1B6B5B21B1B5B5B21B1B4B5B21B1B3B5B21B1B2B5B21B1B1B5B21B1B0B5B19B1B0B5B19B1B-1B5B20B1B-2B5B20B1B-3B5B20B1B-4B5B20B1B-4B5B18B1B-5B5B17B1B-5B5B16B1B-6B5B15B1B-7B5B15B1B-7B5B14B1B-8B5B14B1B-9B5B15B1B-10B5B14B1B-11B5B13B1B-11B5B14B1B-13B5B14B1B-13B5B13B1B-14B5B13B1B-15B5B13B1B-16B5B14B2B-13B5B14B2B-12B5B14B2B-11B5B15B2B-11B5B15B2B-10B5B17B2B-10B5B17B2B-9B5B17B2B-8B5B18B2B-7B5B19B2B-7B5B20B2B-6B5B21B2B-5B5B20B2B-3B5B20B2B-2B5B21B2B-1B5B21B2B0B5B23B2B0B5B24B2B1B5B24B2B2B5B24B2B3B5B24B2B4B5B23B2B5B5B22B1B6B5B22B1B7B5B21B1B8B5B20B2B8B5B19B2B9B5B18B2B9B5B18B2B11B5B17B2B12B5B16B2B13B5B16B2B15B5B14B2B14B5B13B2B16B5B13B2B16B5B12B2B17B5B10B2B17B5B9B2B17B5B8B2B17B5B7B2B16B5B6B2B15B5B6B1B15B5B7B1B16B5B7B1B16B5B8B1B17B5B11B2B17B5B11B1B17B5B14B1B15B5B14B1B15B5B13B1B15B5B15B2B14B5B14B2B15B5B18B2B10B5B22B2B7B5B21B1B7B5B21B1B6B5B22B2B6B5B22B2B5B5B23B2B3B5B23B2B2B5B23B2B1B5B22B2B1B5B20B2B-5B5B21B2B-4B5B17B2B-7B5B18B2B-6B5B17B2B-6B5B16B2B-9B5B16B2B-8B5B16B2B-7B5B15B1B-8B5B15B1B-9B5B14B1B-10B5B13B1B-13B5B13B1B-12B0B18B3B-7B0B18B3B-7B0B18B4B-7B0B18B4B-7B0B18B5B-7B0B18B5B-7B0B18B6B-7B0B18B6B-7B0B18B8B-7B0B18B8B-7B0B18B9B-7B0B18B10B-7B0B18B7B-7B0B17B3B-8B0B17B4B-8B0B17B5B-8B0B17B5B-8B0B17B6B-8B0B17B6B-8B0B17B7B-8B0B17B8B-8B0B17B9B-8B0B17B10B-8B6B20B10B-10B6B20B10B-9B6B24B10B-10B6B24B10B-9B6B27B10B-10B6B27B10B-9B6B30B10B-10B6B30B10B-9B0B33B10B-10B0B33B10B-9B0B33B10B-8B0B33B10B-11B0B34B10B-11B0B34B10B-10B0B34B10B-9B0B34B10B-8B0B17B3B-11B0B17B2B-11B0B17B1B-11B0B17B4B-11B0B17B5B-11B0B17B5B-11B0B17B6B-11B0B17B6B-11B0B17B6B-11B0B17B7B-11B0B17B7B-11B0B17B8B-11B0B17B8B-11B0B17B9B-11B0B17B10B-11B0B18B1B-12B0B18B2B-12B0B18B3B-12B0B18B4B-12B0B18B5B-12B0B18B5B-12B0B18B6B-12B0B18B6B-12B0B18B7B-12B0B18B7B-12B0B18B8B-12B0B18B8B-12B0B18B9B-12B0B18B10B-12B2B-6B0B11B2B-6B0B11B2B-5B0B12B2B-5B0B13B2B-6B0B14B2B-7B0B14B2B-8B0B14B2B-9B0B14B2B-9B0B15B2B-9B0B16B2B-9B0B17B2B-8B0B18B2B-7B0B19B2B-7B0B20B2B-9B0B20B2B-8B0B21B2B-7B0B22B2B-6B0B22B2B-6B0B23B2B-7B0B24B2B-6B0B25B2B-8B0B26B2B-7B0B27B2B-5B0B27B2B-4B0B28B2B-3B0B27B2B-2B0B28B2B-1B0B29B2B0B0B28B2B0B0B28B2B1B0B29B2B1B0B30B2B3B0B29B2B4B0B28B2B4B0B26B2B5B0B27B2B6B0B27B2B6B0B25B2B7B0B24B2B6B0B22B2B8B0B22B2B8B0B21B2B7B0B20B2B6B0B19B2B6B0B18B2B7B0B17B2B9B0B17B2B10B0B17B2B0B0B26B2B0B0B28B2B-1B0B27B2B-1B0B27B2B-2B0B27B2B-3B0B27B2B-4B0B27B2B-5B0B26B2B-5B0B25B2B-6B0B24B2B-6B0B22B2B-7B0B21B2B-7B0B20B2B-8B0B19B2B-8B0B17B2B-8B0B15B2B-7B0B14B2B-5B0B14B2B-6B0B12B2B-6B0B11B2B-6B0B10B2B-7B0B9B2B-8B0B8B2B-10B0B7B2B-9B0B6B2B-10B0B3B6B-1B1B8B6B0B1B8B6B1B1B8B6B1B1B12B6B0B1B12B6B-1B1B12B4B-2B1B12B4B-2B2B12B4B-2B2B12B4B-2B3B12B4B-2B3B12B4B-2B4B12B4B-2B4B12B4B-2B5B12B4B-2B5B12B4B-2B6B12B4B-2B7B12B4B-3B7B12B4B-1B7B12B4B0B7B12B4B1B7B12B4B2B7B12B4B3B7B12B4B2B6B12B4B2B5B12B4B2B4B12B4B2B3B12B4B2B2B12B4B2B1B12B4B2B1B16B4B2B2B16B4B2B3B16B4B2B4B16B4B2B5B16B4B3B5B16B4B1B5B16B4B0B5B16B4B-1B5B16B4B-2B5B16B4B-3B5B16B4B-2B4B16B4B-2B3B16B4B-2B2B16B4B-2B1B16B4B-2B1B20B4B-2B2B20B4B-2B3B20B4B-2B4B20B4B-3B4B20B4B-1B4B20B4B0B4B20B4B0B4B20B4B1B4B20B4B2B4B20B4B3B4B20B4B2B3B20B4B2B2B20B4B2B1B20B0B0B1B21B0B0B1B22B0B0B1B23B0B0B1B24B0B1B1B21B0B1B1B22B0B1B1B23B0B1B1B24B0B-1B1B21B0B-1B1B22B0B-1B1B23B0B-1B1B24B0B1B2B24B0B0B2B24B0B-1B2B24B0B-1B3B25B0B0B3B25B0B1B3B25B0B1B4B26B0B0B4B26B0B-1B4B26B0B-1B5B27B0B0B5B27B0B0B5B27B0B1B5B27B0B1B6B28B0B0B6B28B0B0B6B28B0B0B6B28B0B-1B6B28B0B-1B7B29B0B0B7B29B0B1B7B29B0B1B8B30B0B0B8B30B0B-1B8B30B")
loadData(userCookie);
	
// ----------------------------------------------------------------------
// R E N D E R   S T U F F
// ----------------------------------------------------------------------		

function resizeRendererToDisplaySize(renderer) {
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
		  renderer.setSize(width, height, false);
		}
		return needResize;
	  }

function render(time) {
	//WEB PAGE RESIZING
	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}
	
	//MOVEMENT
	let changeXMov = (Math.sin(character.rotation) * 2) * character.moveSpeed
	let changeZMov = (Math.cos(character.rotation) * 2) * character.moveSpeed
	
	let changeX = Math.sin(character.rotation) * 2 
	let changeZ = Math.cos(character.rotation) * 2
	firstCube.position.x = Math.trunc(camera.position.x + changeX * 2);
	firstCube.position.y = Math.trunc(camera.position.y + character.rotationVert + 1);
	firstCube.position.z = Math.trunc(camera.position.z + changeZ * 2);
	
	
	
	if (moveForward) {
		let vectorA = camera.getWorldDirection();
		vectorA.y = 0;
		let vectorB = camera.position;
		let distance2 = 2;
		let raycaster2 = new THREE.Raycaster();
		raycaster2.set(camera.position, vectorA);
		let intersects2 = raycaster2.intersectObjects(scene.children);
		if (intersects2.length > 0) {	
			distance2 = intersects2[0].distance;
		}		
		if (distance2 > .5) {
			camera.position.x = camera.position.x + changeXMov;
			camera.position.z = camera.position.z + changeZMov;
			character.lookX += changeXMov;
			character.lookZ += changeZMov;
		}
		
		
	} else if (moveBackward) {
		camera.position.x = camera.position.x - changeXMov;
		camera.position.z = camera.position.z - changeZMov;
		character.lookX -= changeXMov;
		character.lookZ -= changeXMov;
	}


	if (moveUp && !character.falling) {
		character.falling = true;
		character.upVelocity = character.upVelocityOrig;
	}
	camera.position.y += character.upVelocity;
	character.upVelocity -=  character.upAcceleration;
	
	// MOVING DOWN
	let distance = 1.5;
	let raycaster = new THREE.Raycaster();
	raycaster.set(camera.position, new THREE.Vector3(0, -1, 0));
	let intersects = raycaster.intersectObjects(scene.children);
	if (intersects.length > 0) {
		
		distance = intersects[0].distance;
	}
	moveDown = true;
	if (moveDown && distance > 1.5) {
		camera.position.y -= character.moveSpeed * 2;
	} else {
		character.falling = false;
		character.upVelocity = 0;
	}
	if (moveLeft) {
		camera.position.x = camera.position.x + changeZMov;
		camera.position.z = camera.position.z - changeXMov;
		character.lookX += changeZMov;
		character.lookZ -= changeXMov;
	} else if (moveRight) {
		camera.position.x = camera.position.x - changeZMov;
		camera.position.z = camera.position.z + changeXMov;
		character.lookX -= changeZMov;
		character.lookZ += changeXMov;
	}
	
	// ROTATION
	if (rotateLeft) {
        character.rotation += character.moveSpeed;
		let changeX = Math.sin(character.rotation) * 2
		let changeZ = Math.cos(character.rotation) * 2
		character.lookX = camera.position.x + changeX;
		character.lookZ = camera.position.z + changeZ;
		character.lookY = camera.position.y + character.rotationVert;
		camera.lookAt(character.lookX, character.lookY, character.lookZ)
	} else if (rotateRight) {
		character.rotation -= character.moveSpeed;
		let changeX = Math.sin(character.rotation) * 2
		let changeZ = Math.cos(character.rotation) * 2
		character.lookX = camera.position.x + changeX;
		character.lookZ = camera.position.z + changeZ;
		character.lookY = camera.position.y + character.rotationVert;
		camera.lookAt(character.lookX, character.lookY, character.lookZ)
	}
	if (rotateUp) { // ROTATE UP
		character.rotationVert += character.moveSpeed;
		character.lookY = camera.position.y + character.rotationVert;
		camera.lookAt(character.lookX, character.lookY, character.lookZ)
    } else if (rotateDown) { // ROTATE DOWN
		character.rotationVert -= character.moveSpeed;
		character.lookY = camera.position.y + character.rotationVert;
		camera.lookAt(character.lookX, character.lookY, character.lookZ)
    }

	//DRAW IMAGE
	renderer.setClearColor (0x87ceeb, 1);
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

requestAnimationFrame(render);




document.addEventListener("keydown", onDocumentKeyDown, false);
document.addEventListener("keyup", onDocumentKeyUp, false);

function onDocumentKeyUp(event) {
	var keyCode = event.which;
	if (keyCode == 87) {
		moveForward = false;
	}
	if (keyCode == 83) {
		moveBackward = false;
	}
	if (keyCode == 37) {
		rotateLeft = false;
	}
	if (keyCode == 39) {
		rotateRight = false;
	}
	if (keyCode == 65) { // Left
		moveLeft = false;
    }
	if (keyCode == 68) { // Right
		moveRight = false;
	} 
    if (keyCode == 32) { // Up
		moveUp = false;
    }
	if (keyCode == 16) { // Down
		moveDown = false;
    }
	if (keyCode == 38) { // ROTATE UP
		rotateUp = false;
    }
	if (keyCode == 40) { // ROTATE DOWN
		rotateDown = false;
    }
}


function onDocumentKeyDown(event) {
    var keyCode = event.which;

    if (keyCode == 87) { // Forwards
		moveForward = true;
    }
	if (keyCode == 83) { // Backwards
		moveBackward = true; 
    } 
	if (keyCode == 65) { // Left
		moveLeft = true;
    }
	if (keyCode == 68) { // Right
		moveRight = true;
	} 
    if (keyCode == 32) { // Up
		moveUp = true;
    }
	if (keyCode == 16) { // Down
		moveDown = true;
    }
	
	//Rotate Camera
	if (keyCode == 39) { // ROTATE RIGHT
		rotateRight = true;
    }
	if (keyCode == 37) { // ROTATE LEFT
		rotateLeft = true;
    }
	
	if (keyCode == 38) { // ROTATE UP
		rotateUp = true;
    }
	if (keyCode == 40) { // ROTATE DOWN
		rotateDown = true;
	}
	
	if (keyCode == 70) { // New Block Type
		if (selectedBlock < blocks.length - 1) {
			selectedBlock += 1;
		} else {
			selectedBlock = 0;
		}
		selectedTexture = blocks[selectedBlock];
		firstCube.material.map = THREE.ImageUtils.loadTexture(blocks[selectedBlock]);
		
		firstCube.material.needsUpdate = true;
    }
	
/* 		let vectorA = new THREE.Vector3(0,1,0);
		let distance2 = 2;
		let raycaster2 = new THREE.Raycaster();
		raycaster2.set(camera.position, vectorA);
		//console.log(vectorA)
		let intersects2 = raycaster2.intersectObjects(scene.children);
		//console.log(intersects2)
		if (intersects2.length > 0) {	
			distance2 = intersects2[0].distance;
			console.log(distance2)
			
		}
		if (distance2 > .5) {
			camera.position.x = camera.position.x + changeXMov;
			camera.position.z = camera.position.z + changeZMov;
		}
		 */
		
	// Place Cube
	if (keyCode == 69) {
		/*let distance2 = 4
		let vectorL = new THREE.Vector3(0,0,0);
		camera.getWorldDirection(vectorL);
		let raycaster2 = new THREE.Raycaster();
		raycaster2.set(camera.position, vectorL);
		let intersects2 = raycaster2.intersectObjects(scene.children);
		if (intersects2.length > 0) {	
			distance2 = intersects2[0].distance;
			console.log("Looking at object")
			cubes.push(makeInstance(geometry, true, 0x44aa88, Math.trunc(intersects2[0].point.x), Math.trunc(intersects2[0].point.y + 1), Math.trunc(intersects2[0].point.z)))
		}*/
		cubes.push(makeInstance(geometry, selectedTexture, 0x44aa88, firstCube.position.x, firstCube.position.y, firstCube.position.z));
		userCookie += selectedBlock + "B" + firstCube.position.x + "B" + firstCube.position.y + "B" + firstCube.position.z + "B";
		console.log(userCookie);
		setCookie("username", userCookie, 30);
	}
	
	if (keyCode = 81) {
		
		//scene.remove(selectedObject);
	}
};


