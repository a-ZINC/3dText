import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import fontTypeface from 'three/examples/fonts/helvetiker_bold.typeface.json';
import baseImage from './texture/Sci-fi_Floor_003_basecolor.jpg';
import aoImage from './texture/Sci-fi_Floor_003_ambientOcclusion.jpg';
import normalImage from './texture/Sci-fi_Floor_003_normal.jpg';
import roughnessImage from './texture/Sci-fi_Floor_003_roughness.jpg';
import heightImage from './texture/Sci-fi_Floor_003_height.png';
import metallicImage from './texture/Sci-fi_Floor_003_metallic.jpg';

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


const group = new THREE.Group();
scene.add(group);


const donutGeometry = new THREE.TorusGeometry(1, 0.4, 10, 100);
const basicMaterial = new THREE.MeshStandardMaterial();
basicMaterial.map = baseTexture;
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

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

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