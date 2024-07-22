import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import fontTypeface from 'three/examples/fonts/helvetiker_bold.typeface.json';
import baseImage from './texture/base.jpg';
import aoImage from './texture/ao.jpg';
import normalImage from './texture/normal.jpg';
import roughnessImage from './texture/rough.jpg';
import heightImage from './texture/displacement.png';

console.log(fontTypeface);
const canvas = document.querySelector('.webgl');

const sizes = {width: window.innerWidth, height: window.innerHeight};
const cursor = {x: 0, y: 0};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    perspectiveCamera.aspect = sizes.width / sizes.height;
    perspectiveCamera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, perspectiveCamera);
});
window.addEventListener('dblclick', () => {
    console.log('double click');
    if(document.fullscreenElement) {
        console.log('exiting fullscreen');
        document.exitFullscreen();
    }
    else {
        console.log('entering fullscreen');
        canvas.requestFullscreen();
    }
});
canvas.addEventListener('mousemove', (e) => {
    const x = e.clientX / sizes.width - 0.5;
    const y = -(e.clientY / sizes.height - 0.5);
    cursor.x = x - 0.5;
    cursor.y = y - 0.5;
});


const clock = new THREE.Clock();
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();


const baseTexture = textureLoader.load(baseImage);
baseTexture.wrapS = THREE.RepeatWrapping;
baseTexture.wrapT = THREE.RepeatWrapping;
baseTexture.repeat.set(2, 2);
const aoTexture = textureLoader.load(aoImage);
aoTexture.wrapS = THREE.RepeatWrapping;
aoTexture.wrapT = THREE.RepeatWrapping;
aoTexture.repeat.set(2, 2);
const normalTexture = textureLoader.load(normalImage);
normalTexture.wrapS = THREE.RepeatWrapping;
normalTexture.wrapT = THREE.RepeatWrapping;
normalTexture.repeat.set(2, 2);
const roughnessTexture = textureLoader.load(roughnessImage);
roughnessTexture.wrapS = THREE.RepeatWrapping;
roughnessTexture.wrapT = THREE.RepeatWrapping;
roughnessTexture.repeat.set(2, 2);
const heightTexture = textureLoader.load(heightImage);
heightTexture.wrapS = THREE.RepeatWrapping;
heightTexture.wrapT = THREE.RepeatWrapping;
heightTexture.repeat.set(2, 2);

const group = new THREE.Group();
scene.add(group);


const donutGeometry = new THREE.TorusGeometry(1, 0.4, 10, 100);
const basicMaterial = new THREE.MeshStandardMaterial();
basicMaterial.map = baseTexture;
basicMaterial.metalness = 0.5;
basicMaterial.roughness = 0.4;
basicMaterial.displacementMap = heightTexture;
basicMaterial.displacementScale = 0.3;


// basicMaterial.wireframe = true;
// group.add(donut);

for(let i=0; i<100; i++){
    const donut = new THREE.Mesh(donutGeometry, basicMaterial);

    donut.position.x = (Math.random() -0.5) * 30;
    donut.position.y = (Math.random() -0.5) * 30;
    donut.position.z = (Math.random() -0.5) * 20;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    donut.scale.set(scale, scale, scale);


    group.add(donut);
}

const fontLoader = new FontLoader();
const font = fontLoader.load('static/fonts/helvetiker_bold.typeface.json', function (font) {
    const textGeometry = new TextGeometry('Ajinkya Singh', {
        font: font,
        size: 0.8,
        depth: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 5
    });
    const text = new THREE.Mesh(textGeometry, basicMaterial);
    textGeometry.center();
    group.add(text);
}, undefined, function ( err ) {
    console.log( 'An error happened' );
});




const perspectiveCamera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
// const perspectiveCamera = new THREE.OrthographicCamera(-1*(sizes.width/sizes.height), 1*(sizes.width/sizes.height), 1, -1, 0.1, 100);
perspectiveCamera.position.z = 6;
scene.add(perspectiveCamera);


const controls = new OrbitControls(perspectiveCamera, canvas);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x0000ff, 1);
directionalLight.position.set(0, 0, 1);
scene.add(directionalLight);

const rectLight = new THREE.RectAreaLight(0xFFFFFF, 1, 8, 1);
rectLight.position.set(0, -1, 1);
rectLight.rotation.x = Math.PI / 4;

scene.add(rectLight);

// const rectlightHelper = new RectAreaLightHelper(rectLight);
// scene.add(rectlightHelper);

const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, perspectiveCamera);


const animation = () => {
    const elapsedTime = clock.getElapsedTime();

    // perspectiveCamera.position.x= Math.sin(cursor.x * Math.PI  * 2) * 3;
    // perspectiveCamera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // perspectiveCamera.position.y = Math.cos(cursor.y * Math.PI) * 3;
    // perspectiveCamera.lookAt(donut.position);

    // console.log(controls);
    controls.update();
    renderer.render(scene, perspectiveCamera);

    window.requestAnimationFrame(animation);
}
animation();


export default 'another';