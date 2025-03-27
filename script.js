import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap'

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

const body = document.body;

const camera = new THREE.PerspectiveCamera(
	10,
	window.innerWidth/window.innerHeight,
	0.1,
	1000);

camera.position.z = 13;

let endText = document.getElementById('ending');
endText.style.visibility = "hidden";


function fadeOut(){
  endText.style.opacity = 1;
 	if (endText.style.visibility == "visible"){
 		(function fade() {
	    if ((endText.style.opacity -= .005) < 0) {
	      endText.style.visibility = "hidden";
	    } else {
	      requestAnimationFrame(fade);
	    }
	  })();
 	}
  
}

function fadeIn(){
  endText.style.opacity = 0;
  if (endText.style.visibility == "hidden"){
	  (function fade() {
	    var val = parseFloat(endText.style.opacity);
	    if (!((val += .005) > 1)) {
	      endText.style.opacity = val;
	      requestAnimationFrame(fade);
	      endText.style.visibility = "visible";
	    }
	  })();
	}
}

console.log(window.innerHeight)

let scrollPosY = 0;
let currentParentPos = 0;

let initialPosition = {x: 0, y: -0.3, z: 4};
let initialRotation = {x: 0.3, y: 3.14};

let cubeinity = -2;
let cubeinitx = 2
let initialpz = 4;

let inityp = 0;

const scene = new THREE.Scene();
let bee;
const loader = new GLTFLoader();

let clickable = false;

const vid = document.getElementById('vidA');
const videoTexture = new THREE.VideoTexture(vid);

const img = document.getElementById('bgb')
const tex = new THREE.TextureLoader().load(img.src);

const fall = document.getElementById("text");
fall.style.display = "none";
fall.style.top = 0;

vid.addEventListener('loadeddata', () => {
    vid.play();
    videoTexture.needsUpdate = true;
});
vid.currentTime = 10;

console.log(img)
console.log(vid)

console.log(tex)
console.log(videoTexture);




function parents(rotY) {
	const parent = new THREE.Object3D();
	parent.scale.x = 0.5;
	parent.scale.y = 0.5;
	parent.scale.z = 0.5;
	parent.rotation.y = rotY;

	parent.position.z = initialpz;
	return parent;
	
}

function playgeo(){
	// const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
	
	const geometry = new THREE.TorusGeometry( 1, 0.4, 12, Math.PI*2 ); 
	const material = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 


	const play = new THREE.Mesh(geometry, material)

	play.position.z = 0;
	play.position.x = 4;

	play.rotation.x = Math.PI/2;

	play.scale.x = 0.001;
	play.scale.y = 0.2;
	play.scale.z = 0.4;


	return play;
}

function readgeo(){
	const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
	
	// const geometry = new THREE.TorusGeometry( 1, 0.4, 12, Math.PI*2 ); 
	const material = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 


	const play = new THREE.Mesh(geometry, material)

	play.position.z = 0;
	play.position.x = 4;

	play.rotation.x = Math.PI/2;

	play.scale.x = 0.001;
	play.scale.y = 0.2;
	play.scale.z = 0.4;


	return play;
}

function cubes(cposY, text){
	const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 


	if (text.isTexture) {
		text.wrapS = THREE.RepeatWrapping;
		text.wrapT = THREE.RepeatWrapping;
	} else if (text.isVideoTexture){
		geometry.applyMatrix4(new THREE.Matrix4().makeScale(-1, 1, 1));
		text.minFilter = THREE.LinearFilter;
		text.magFilter = THREE.LinearFilter;
		text.format = THREE.RGBFormat;
	}


	const material = new THREE.MeshBasicMaterial( {map: text, side: THREE.FrontSide, toneMapped: false,} ); 


	console.log(material)


	const cube = new THREE.Mesh(geometry, material); 

	console.log(cube);

	cube.position.x = 2;
	cube.position.y = cposY;

	cube.scale.x = 0.001;
	cube.scale.y = 0.2;
	cube.scale.z = 0.4;



	return cube;
}

// function cubest(cposY, vidtext){
// 	const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 

// 	const material = new THREE.MeshBasicMaterial( {map: vidtext, side: THREE.FrontSide, toneMapped: false,} ); 


// 	console.log(material)


// 	const cube = new THREE.Mesh(geometry, material); 

// 	console.log(cube);

// 	cube.position.x = 2;
// 	cube.position.y = cposY;

// 	cube.scale.x = 0.001;
// 	cube.scale.y = 0.2;
// 	cube.scale.z = 0.4;



// 	return cube;
// }

const play1 = new playgeo();
const cubeA = new cubes(-2, videoTexture);
const parentA = new parents(1);

cubeA.add(play1)
parentA.add(cubeA);
scene.add(parentA);


const play2 = new readgeo();
const cubeB = new cubes(-3, tex);
const parentB = new parents(2);

cubeB.add(play2);
parentB.add(cubeB);
scene.add(parentB);

// const cubeC = new cubes(-4, 0x778899);
// const parentC = new parents(3);

// parentC.add(cubeC);
// scene.add(parentC);

// const cubeD = new cubes(-5, 0x778899);
// const parentD = new parents(4);

// parentD.add(cubeD);
// scene.add(parentD);

// const cubeE = new cubes(-6, 0x778899);
// const parentE = new parents(5);

// parentE.add(cubeE);
// scene.add(parentE);

// const cubeF = new cubes(-7, 0x778899);
// const parentF = new parents(6);

// parentF.add(cubeF);
// scene.add(parentF);

// const cubeG = new cubes(-8, 0x778899);
// const parentG = new parents(7);

// parentG.add(cubeG);
// scene.add(parentG);

// const cubeH = new cubes(-9, 0x778899);
// const parentH = new parents(8);

// parentH.add(cubeH);
// scene.add(parentH);

const parentList = [parentA, parentB]//, parentC, parentD, parentE, parentF, parentG, parentH]
const cubeList = [cubeA, cubeB]//, cubeC, cubeD, cubeE, cubeF, cubeG, cubeH]
const playList = [play1, play2];
let bigbox = 0;


function motionblur() {
	for (var i = 0; i < 2; i++) {
		if ((4.125 <= parentList[i].rotation.y && parentList[i].rotation.y <= 5.5)) {
			bigbox = i;
			if (vid.paused && fall.style.display == "none") {
				gsap.to(cubeList[i].scale, {y: 0.8, duration: 0.5})
				gsap.to(cubeList[i].scale, {z: 1.3, duration: 0.5})
				gsap.to(playList[i].scale, {y: 0.5, duration: 0.5})
			} else{
				gsap.to(cubeList[i].scale, {y: 2, duration: 0.5});
	        	gsap.to(cubeList[i].scale, {z: 3.3, duration: 0.5});
	        	gsap.to(cubeList[i].position, {y: 0, duration: 0.5});
	        	gsap.to(playList[i].scale, {y: 0, duration: 0.5})
			}
			clickable = true;
		} else if (parentList[i].rotation.y < 4.125 || parentList[i].rotation.y > 5.5) {
			gsap.to(cubeList[i].scale, {y: 0.2, duration: 0.5});
			gsap.to(cubeList[i].scale, {z: 0.4, duration: 0.5});
			gsap.to(playList[i].scale, {y: 0, duration: 0.5})

		}
	}
	if (parentList[bigbox].rotation.y < 4.125 || parentList[bigbox].rotation.y > 5.5){
		clickable = false;
	}
}

console.log(cubeList[bigbox]);

loader.load('assetA.glb',
	function (gltf) {
		bee = gltf.scene;
		bee.position.x = initialPosition.x;
		bee.position.z = initialPosition.z;
		bee.position.y = initialPosition.y;
		bee.rotation.y = initialRotation.y;
		bee.rotation.x = initialRotation.x;
		bee.scale.y = 0.05;
		bee.scale.x = 0.05;
		bee.scale.z = 0.05;

		scene.add(bee);

	},
	function (xhr) {},
	function (err) {}
	);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
const obj = document.getElementById('container3d').appendChild(renderer.domElement);

// bee.geometry.center();


const ambientLight = new THREE.AmbientLight(0xffffff, 5);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0x87CEFA, 4);
topLight.position.set(20, 500, 0);
scene.add(topLight);

const keylight = new THREE.DirectionalLight(0xFFB6C1, 3);
keylight.position.set(0, 200, 0);
scene.add(keylight);

const controls = new OrbitControls(camera, renderer.domElement);


const reRender3d = () => {
	requestAnimationFrame(reRender3d);
	controls.update();
	if (vid.readyState >= vid.HAVE_CURRENT_DATA) {  
        videoTexture.needsUpdate = true; 
    }
	renderer.render(scene, camera);
};
reRender3d();


const modelMove = () => {
	scrollPosY = (window.scrollY/document.body.clientHeight);
	bee.rotation.y = initialRotation.y + -2.2 * Math.PI * scrollPosY;
	bee.rotation.x = initialRotation.x + (-0.5* scrollPosY);
	bee.position.y = initialPosition.y + -0.1 * scrollPosY;
	bee.position.z = initialPosition.z +  4 * scrollPosY;

	parentA.rotation.y = -1 + 15*scrollPosY;
	parentA.position.z = initialpz +  4 * scrollPosY;
	cubeA.position.y = cubeinity  + 5*scrollPosY;

	parentB.rotation.y = -3 + 15*scrollPosY;
	parentB.position.z = initialpz +  4 * scrollPosY;
	cubeB.position.y = cubeinity - 0.65 + 5*scrollPosY;

	// parentC.rotation.y = -5 + 30*scrollPosY;
	// parentC.position.z = initialpz +  4 * scrollPosY;
	// cubeC.position.y = cubeinity - 1.3 + 10*scrollPosY;

	// parentD.rotation.y = -7 + 30*scrollPosY;
	// parentD.position.z = initialpz +  4 * scrollPosY;
	// cubeD.position.y = cubeinity - 1.3-0.65 + 10*scrollPosY;

	// parentE.rotation.y = -9 + 30*scrollPosY;
	// parentE.position.z = initialpz +  4 * scrollPosY;
	// cubeE.position.y = cubeinity - 2.6 + 10*scrollPosY;

	// parentF.rotation.y = -11 + 30*scrollPosY;
	// parentF.position.z = initialpz +  4 * scrollPosY;
	// cubeF.position.y = cubeinity - 2.6-0.65 + 10*scrollPosY;

	// parentG.rotation.y = -13 + 30*scrollPosY;
	// parentG.position.z = initialpz +  4 * scrollPosY;
	// cubeG.position.y = cubeinity - 3.9 + 10*scrollPosY;

	// parentH.rotation.y = -15 + 30*scrollPosY;
	// parentH.position.z = initialpz +  4 * scrollPosY;
	// cubeH.position.y = cubeinity - 3.9 -0.65 + 10*scrollPosY;


	motionblur();
	console.log(window.scrollY);
	console.log(fall.style.top);
	console.log(fall.style.display);

}

let scrollTop = 0;
let scrollLeft = 0;

function disableScroll() {
    // Get the current page scroll position
            scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop;
            scrollLeft =
                window.pageXOffset ||
                document.documentElement.scrollLeft,

                // if any scroll is attempted,
                // set this to the previous value
                window.onscroll = function () {
                    window.scrollTo(scrollLeft, scrollTop);
                };
        }

function enableScroll() {
            window.onscroll = function () { };
        }



document.addEventListener("click", () => {
	if (clickable == true) {
		if (cubeList[bigbox].material.map.isVideoTexture) {
			if (vid.paused) {
				vid.currentTime = 0;
		        vid.play().catch(err => console.error("Video play error:", err));
		        gsap.to(parentList[bigbox].rotation, {y: 4.7, duration: 0.5});
		        disableScroll(); 
		        // body.style.background = "gray";

		    } else {
		    	vid.pause();
		    	vid.currentTime = 10;
		    	gsap.to(parentA.rotation, {y: currentParentPos, duration: 0.5});
		    	enableScroll();
		    	// body.style.background = "300deg;blue;lightskyblue;whitesmoke";
		    }

		} else {
			if (fall.style.display == "none") {
				gsap.to(parentList[bigbox].rotation, {y: 4.7, duration: 0.5});
				fall.style.top = (window.scrollY).toString() + "px";
				fall.style.display = "flex";
				fall.style.transition = "opacity 0.5s"
				disableScroll();
			} else{
				gsap.to(parentList[bigbox].rotation, {y: currentParentPos, duration: 0.5});
				fall.style.display = "none";
				enableScroll();
			}
		}
	}
	console.log(body.style.background)
	motionblur();  
});


window.addEventListener('scroll', () => {
	if (bee){
		currentParentPos = parentList[bigbox].rotation.y;
		if(vid.paused){
			modelMove();
		}
		if (window.scrollY > 7000) {
			fadeIn();
		} else {
			fadeOut();
		}
	}

})