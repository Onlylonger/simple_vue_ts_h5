// import * as THREE from 'three'
// import { TimelineLite } from 'gsap'

// export default class Stage {
//   floor: any

//   private container: any
//   private camera: any
//   private scene: any
//   private renderer: any
//   private light: any
//   private softLight: any
//   private group: any

//   constructor() {
//     this.container = window.document.createElement('div')
//     // renderer
//     this.renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       alpha: false
//     })
//     this.renderer.setSize(window.innerWidth, window.innerWidth)
//     this.renderer.setClearColor('#D0CBC7', 1) // ?
//     this.container.appendChild(this.renderer.domElement)
//     document.body.appendChild(this.container)

//     // scene
//     this.scene = new THREE.Scene()

//     // camera

//     const aspect = window.innerWidth / window.innerWidth
//     // ?
//     const d = 20
//     this.camera = new THREE.OrthographicCamera(
//       -d * aspect,
//       d * aspect,
//       d,
//       -d,
//       -100,
//       100
//     )
//     this.camera.position.x = 2
//     this.camera.position.y = 2
//     this.camera.position.z = 2
//     this.camera.lookAt(new THREE.Vector3(0, 0, 0))
//     // ?

//     // light

//     this.light = new THREE.DirectionalLight(0xffffff, 1)
//     this.light.position.set(0, 499, 0)
//     this.scene.add(this.light)

//     this.softLight = new THREE.AmbientLight(0xffffff, 0.4)
//     this.scene.add(this.softLight)
//   }

//   setCamera(y: number, speed: number = 0.3) {
//     TimelineLite.to(this.camera.position, speed, {
//       y: y + 4,
//       ease: Power1.easeInOut
//     })
//     TimelineLite.to(this.camera.lookAt, speed, { y, ease: Power1.easeInOut })
//   }

//   add(elem) {
//     this.scene.add(elem)
//   }

//   remove(elem) {
//     this.scene.remove(elem)
//   }

//   render() {
//     this.renderer.render(this.scene, this.camera)
//   }
// }
