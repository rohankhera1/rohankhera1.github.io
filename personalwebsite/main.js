import './style.css'

import * as THREE from 'three'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 500 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

const geometry = new THREE.TorusGeometry( 10, .7, 16, 100 );
const material = new THREE.MeshNormalMaterial( );
const torus = new THREE.Mesh( geometry, material );

const ringgeometry = new THREE.RingGeometry( 5, 7, 32 );
// const ringwireframe = new THREE.WireframeGeometry( ringgeometry );
const ringmaterial = new THREE.MeshBasicMaterial( { color: 0x800000, side: THREE.DoubleSide } );
const line = new THREE.LineSegments( ringgeometry, ringmaterial );
scene.add( line );

const schoolgeometry = new THREE.CylinderGeometry(2, 2, .5);
const schoolTexture = new THREE.TextureLoader().load('school.jpg');
const schoolmaterial = new THREE.MeshBasicMaterial({ map: schoolTexture });
const school = new THREE.Mesh( schoolgeometry, schoolmaterial );
scene.add( school );

school.position.setZ(10);
school.position.setX(-11);

school.rotation.x = 1;
school.rotation.z = 1;
line.position.z = 10;
line.position.setX(-12);

scene.add( torus );

renderer.render( scene, camera );

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar(starsectionlow, starsectionhigh, starcolor) {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: starcolor });
  const star = new THREE.Mesh(geometry, material);

  const x = THREE.MathUtils.randFloat(-100, 10)  
  const y = THREE.MathUtils.randFloat(-10, 10)
  const z = THREE.MathUtils.randFloat(starsectionlow, starsectionhigh)

  star.position.set(x, y, z);
  scene.add(star);
} 

Array(100).fill().forEach(addStar.bind(undefined, -25, 20, "white"));
Array(100).fill().forEach(addStar.bind(undefined, 10, 30, "maroon"));
Array(100).fill().forEach(addStar.bind(undefined, 30, 50, "blue"));
Array(100).fill().forEach(addStar.bind(undefined, 50, 70, "orange"));

// Background

const spaceTexture = new THREE.TextureLoader().load('background.jpg');
scene.background = spaceTexture;

// Avatar

const faceTexture = new THREE.TextureLoader().load('face.jpg');

const face = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: faceTexture }));

scene.add(face);

// flex1

const flex1Texture = new THREE.TextureLoader().load('flex1.jpg');
const flex2Texture = new THREE.TextureLoader().load('flex2.jpg');
const normalTexture = new THREE.TextureLoader().load('background.jpg');

const flex1 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(),
  new THREE.MeshStandardMaterial({
    map: flex1Texture,
    normalMap: normalTexture,
  })
);

const flex2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 1 ),
  new THREE.MeshStandardMaterial({
    map: flex2Texture,
    normalMap: normalTexture,
  })
);


scene.add(flex1);
scene.add(flex2);

flex2.position.z = 35;
flex2.position.setX(-10);

flex1.position.z = 30;
flex1.position.setX(-10);

face.position.z = -5;
face.position.x = 2;



// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  face.rotation.y += 0.01;
  face.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  face.rotation.y += 0.01;
  face.rotation.z += 0.01;

  flex1.rotation.y += 0.01;

  line.rotation.z += 0.01;
  school.rotation.y += 0.01;
  // controls.update();

  renderer.render(scene, camera);
}

animate();