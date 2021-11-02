import './bootstrap/css/bootstrap.min.css'
import './fontawesome/css/all.min.css'
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('textures/normal.jpg')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.75, 32, 32);

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.24
material.normalMap = normalTexture

material.color = new THREE.Color(0xf0aa00)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// const sphere1 = gui.addFolder('Sphere')
// sphere1.add(sphere.geometry.SphereBufferGeometry, 'radius').min(0.5).max(1.5).step(0.01)

// Fog
const fog = new THREE.FogExp2(0xba45af, 0.125)
scene.fog = fog;

const fogSettings = {
    color: 0xba45af,
    density: 0.125
}

const fogControl = gui.addFolder('Fog')

fogControl.addColor(fogSettings, 'color')
.onChange(() => {
    fog.color.set(fogSettings.color)
})
fogControl.add(fogSettings, 'density').min(0).max(2).step(0.01)
.onChange(() => {
    fog.density = (fogSettings.density)
})

// Linear Fog
// const fog = new THREE.Fog(0xba45af, 1.75, 3)
//
// const fogSettings = {
//     color: 0xba45af,
//     near: 1.75,
//     far: 3,
// }
// fogControl.addColor(fogSettings, 'color')
// .onChange(() => {
//     fog.color.set(fogSettings.color)
// })
// fogControl.add(fogSettings, 'near').min(0).max(3).step(0.01)
// .onChange(() => {
//     fog.near = (fogSettings.near)
// })
// fogControl.add(fogSettings, 'far').min(2).max(10).step(0.01)
// .onChange(() => {
//     fog.far = (fogSettings.far)
// })

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Light 2 - Red
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-1.52, 1.26, -1.45)
pointLight2.intensity = 1.28
scene.add(pointLight2)

/* 
 * Debug Window Parameters
 */
const light1 = gui.addFolder('Light 1')
light1.add(pointLight2.position, 'x').min(-3).max(3).step(0.01)
light1.add(pointLight2.position, 'y').min(-6).max(6).step(0.01)
light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

const light1Color = {
    color: 0xff0000
}
light1.addColor(light1Color, 'color')
    .onChange(() => {
        pointLight2.color.set(light1Color.color)
    })

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)

// Light 3 - Blue
const pointLight3 = new THREE.PointLight(0x46248c, 2)
pointLight3.position.set(0.8, -1.05, -0.52)
pointLight3.intensity = 3.24
scene.add(pointLight3)

/* 
 * Debug Window Parameters
 */
const light2 = gui.addFolder('Light 2')
light2.add(pointLight3.position, 'x').min(-3).max(3).step(0.01)
light2.add(pointLight3.position, 'y').min(-6).max(6).step(0.01)
light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

const light2Color = {
    color: 0x46248c
}
light2.addColor(light2Color, 'color')
    .onChange(() => {
        pointLight3.color.set(light2Color.color)
    })


// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

let scale = 0
let targetScale = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}
window.addEventListener('scroll', updateSphere)

window.addEventListener('mousedown', onMouseClick)

function onMouseClick(event){
    scale = 1.1
}

window.addEventListener('mouseup', onMouseRelease)

function onMouseRelease(event){
    scale = 0.9
}

const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * .001
    targetY = mouseY * .001
    targetScale = scale

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .25 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()