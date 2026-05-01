import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// scene & camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000000,
);

// renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  logarithmicDepthBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setAnimationLoop(animate);
renderer.setPixelRatio(window.devicePixelRatio);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// lights
const ambientLight = new THREE.AmbientLight("white", 0.1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 0, 0);
scene.add(pointLight);

// textures
const loader = new THREE.TextureLoader();

const sceneBackgound = loader.load("/textures/8k_stars_milky_way.jpg");

// sun texture
const sunTexture = loader.load("/textures/2k_sun.jpg");

// planet textures
const mercuryTexture = loader.load("/textures/2k_mercury.jpg");
const venusTexture = loader.load("/textures/2k_venus_atmosphere.jpg");
const earthTexture = loader.load("/textures/2k_earth_daymap.jpg");
const marsTexture = loader.load("/textures/2k_mars.jpg");
const jupiterTexture = loader.load("/textures/2k_jupiter.jpg");
const saturnTexture = loader.load("/textures/2k_saturn.jpg");
const neptuneTexture = loader.load("/textures/2k_neptune.jpg");
const uranusTexture = loader.load("/textures/2k_uranus.jpg");

// moons textures
const moonTexture = loader.load("/textures/Dh_moon_texture.webp");
const phobosTexture = loader.load("/textures/Dh_phobos_texture.webp");
const deimosTexture = loader.load("/textures/Dh_deimos_texture.webp");
const ganymedeTexture = loader.load("/textures/Dh_ganymede_texture.webp");
const callistoTexture = loader.load("/textures/Dh_callisto_texture.webp");
const ioTexture = loader.load("/textures/Dh_io_texture.webp");
const europaTexture = loader.load("/textures/Dh_europa_texture.webp");

// scene backgound
sceneBackgound.mapping = THREE.EquirectangularReflectionMapping;
sceneBackgound.colorSpace = THREE.SRGBColorSpace;
scene.background = sceneBackgound;

// sun
const sunGeometry = new THREE.SphereGeometry(1, 64, 64);
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.scale.setScalar(109);
scene.add(sun);

//planets & their moons
const planets = [
  {
    name: "Mercury",
    size: 0.38,
    distance: 9089,
    axialTilt: 0.034,
    rotationSpeed: 1 / 58.6,
    orbitalPeriod: 88,
    texture: mercuryTexture,
    moons: [],
  },
  {
    name: "Venus",
    size: 0.38,
    distance: 16983,
    axialTilt: 117.3,
    rotationSpeed: 1 / 243,
    orbitalPeriod: 225,
    texture: venusTexture,
    moons: [],
  },
  {
    name: "Earth",
    size: 1,
    distance: 23481,
    axialTilt: 23.5,
    rotationSpeed: 1,
    orbitalPeriod: 365.25,
    texture: earthTexture,
    moons: [
      {
        name: "Moon",
        size: 0.2727,
        distance: 60.3,
        axialTilt: 6.68,
        rotationSpeed: 1 / 27.32,
        orbitalPeriod: 27.32,
        orbitalDirection: 1,
        texture: moonTexture,
      },
    ],
  },
  {
    name: "Mars",
    size: 0.53,
    distance: 35777,
    axialTilt: 25.19,
    rotationSpeed: 1.029,
    orbitalPeriod: 687,
    texture: marsTexture,
    moons: [
      {
        name: "Phobos",
        size: 0.0017,
        distance: 1.472,
        axialTilt: 0,
        rotationSpeed: 3.13,
        orbitalPeriod: 0.3189,
        orbitalDirection: 1,
        texture: phobosTexture,
      },
      {
        name: "Deimos",
        size: 0.00097,
        distance: 3.678,
        axialTilt: 0,
        rotationSpeed: 1 / 30.35,
        orbitalPeriod: 1.262,
        orbitalDirection: 1,
        texture: deimosTexture,
      },
    ],
  },
  {
    name: "Jupiter",
    size: 11,
    distance: 122194,
    axialTilt: 3.13,
    rotationSpeed: 2.4,
    orbitalPeriod: 4333,
    texture: jupiterTexture,
    moons: [
      {
        name: "Ganymede",
        size: 0.413,
        distance: 168.01,
        axialTilt: 0.2,
        rotationSpeed: 1 / 7.155,
        orbitalPeriod: 7.155,
        orbitalDirection: 1,
        texture: ganymedeTexture,
      },
      {
        name: "Callisto",
        size: 0.378,
        distance: 295.5,
        axialTilt: 1,
        rotationSpeed: 1 / 16.689,
        orbitalPeriod: 16.689,
        orbitalDirection: 1,
        texture: callistoTexture,
      },
      {
        name: "Io",
        size: 0.286,
        distance: 66.2,
        axialTilt: 0.036,
        rotationSpeed: 1 / 1.769,
        orbitalPeriod: 1.769,
        orbitalDirection: 1,
        texture: ioTexture,
      },
      {
        name: "Europa",
        size: 0.245,
        distance: 105.3,
        axialTilt: 0.1,
        rotationSpeed: 1 / 3.551,
        orbitalPeriod: 3.551,
        orbitalDirection: 1,
        texture: europaTexture,
      },
    ],
  },
  {
    name: "Saturn",
    size: 9.5,
    distance: 225010,
    axialTilt: 26.73,
    rotationSpeed: 2.24,
    orbitalPeriod: 10759,
    texture: saturnTexture,
    moons: [],
  },
  {
    name: "Uranus",
    size: 4,
    distance: 429000,
    axialTilt: 97.77,
    rotationSpeed: 1.39,
    orbitalPeriod: 30687,
    texture: uranusTexture,
    moons: [],
  },
  {
    name: "Neptune",
    size: 4,
    distance: 705540,
    axialTilt: 28.32,
    rotationSpeed: 1.49,
    orbitalPeriod: 60190,
    texture: neptuneTexture,
    moons: [],
  },
];

const planetGroups = planets.map((planet) => {
  const celestialBodyGeometry = new THREE.SphereGeometry(1, 64, 64);

  const planetGroup = new THREE.Group();

  const planetMaterial = new THREE.MeshStandardMaterial({
    map: planet.texture,
  });
  const planetMesh = new THREE.Mesh(celestialBodyGeometry, planetMaterial);

  const planetOrbitGeometry = new THREE.RingGeometry(
    planet.distance - 0.025,
    planet.distance + 0.025,
    planet.distance,
  );
  const planetOrbitMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const planetOrbitMesh = new THREE.Mesh(
    planetOrbitGeometry,
    planetOrbitMaterial,
  );

  planetMesh.name = planet.name;
  planetMesh.scale.setScalar(planet.size);
  planetMesh.rotation.order = "ZYX";
  planetMesh.rotateZ(THREE.MathUtils.degToRad(planet.axialTilt));
  planetMesh.add(new THREE.AxesHelper(200));

  planetOrbitMesh.rotateX(THREE.MathUtils.degToRad(90));

  planetGroup.add(planetMesh);

  planet.moons.forEach((moon) => {
    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moon.texture,
    });

    const moonMesh = new THREE.Mesh(celestialBodyGeometry, moonMaterial);

    moonMesh.name = moon.name;
    moonMesh.scale.setScalar(moon.size);
    moonMesh.rotation.order = "ZYX";
    moonMesh.rotateZ(THREE.MathUtils.degToRad(moon.axialTilt));
    moonMesh.position.x = moon.distance;
    moonMesh.add(new THREE.AxesHelper(200));

    planetGroup.add(moonMesh);
  });

  planetGroup.position.x = planet.distance;

  scene.add(planetGroup);
  scene.add(planetOrbitMesh);

  return planetGroup;
});

const planetToFollowIndex = 2;

console.log(planetGroups);

controls.target.copy(planetGroups[planetToFollowIndex].children[0].position);

camera.position.set(
  planets[planetToFollowIndex].distance,
  planets[planetToFollowIndex].size * 2,
  planets[planetToFollowIndex].size * 5,
);

controls.update();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

const MS_PER_DAY = 86400000;
const TIME_SCALE = 1000;

function animate() {
  const now = Date.now() * TIME_SCALE;
  const daysPassed = now / MS_PER_DAY;
  const dayRotationAngle = daysPassed * (Math.PI * 2);

  const targetPlanet = planetGroups[planetToFollowIndex];
  const previousPosition = targetPlanet.position.clone();

  planetGroups.forEach((planetGroup, planetIndex) => {
    const planetData = planets[planetIndex];
    planetGroup.children[0].rotation.y =
      dayRotationAngle * planetData.rotationSpeed;

    const orbitAngle = (daysPassed / planetData.orbitalPeriod) * (Math.PI * 2);

    planetGroup.position.x = Math.cos(orbitAngle) * planetData.distance;
    planetGroup.position.z = Math.sin(orbitAngle) * planetData.distance;

    planetGroup.children.forEach((moonMesh, index) => {
      if (index !== 0) {
        const moonOrbitAngle =
          (daysPassed / planets[planetIndex].moons[index - 1].orbitalPeriod) *
          (Math.PI * 2);
        moonMesh.position.x =
          Math.sin(moonOrbitAngle) *
          planets[planetIndex].moons[index - 1].distance;
        moonMesh.position.z =
          Math.cos(moonOrbitAngle) *
          planets[planetIndex].moons[index - 1].distance;
      }
    });
  });

  const currentPosition = targetPlanet.position.clone();
  const movementDelta = currentPosition.sub(previousPosition);

  camera.position.add(movementDelta);
  controls.target.copy(targetPlanet.position);

  controls.update();
  renderer.render(scene, camera);
}
