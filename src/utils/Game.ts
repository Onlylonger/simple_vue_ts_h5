// import Stage from './Stage'
// import Block from './Block'
// import * as THREE from 'three'
// import { TweenMax } from 'gsap'

// export default class Game {
//   STATES = {
//     LOADING: 'loading',
//     PLAYING: 'playing',
//     READY: 'ready',
//     ENDED: 'ended',
//     RESETTING: 'resetting'
//   }
//   blocks: Block[] = []
//   state: string = this.STATES.LOADING

//   // groups

//   newBlocks: any
//   placedBlocks: any
//   choppedBlocks: any

//   // UI elements

//   scoreContainer: any
//   mainContainer: any
//   startButton: any
//   instructions: any

//   constructor() {
//     this.stage = new Stage()

//     this.mainContainer = window.document.getElementById('container')
//     this.scoreContainer = window.document.getElementById('score')
//     this.startButton = window.document.getElementById('start-button')
//     this.instructions = window.document.getElementById('instructions')
//     this.scoreContainer.innerHTML = '0'

//     this.newBlocks = new THREE.Group()
//     this.placedBlocks = new THREE.Group()
//     this.choppedBlocks = new THREE.Group()

//     this.stage.add(this.newBlocks)
//     this.stage.add(this.placedBlocks)
//     this.stage.add(this.choppedBlocks)

//     this.addBlock()
//     this.tick()

//     this.updateState(this.STATES.READY)

//     window.document.addEventListener('keydown', (e) => {
//       if (e.keyCode === 32) { this.onAction() }
//     })

//     window.document.addEventListener('click', (e) => {
//       this.onAction()
//     })

//     window.document.addEventListener('touchstart', (e) => {
//       e.preventDefault()
//       // this.onAction();

//       // ☝️ this triggers after click on android so you
//       // insta-lose, will figure it out later.
//     })
//   }

//   updateState(newState) {
//     // tslint:disable
//     for (const key in this.STATES) {
//       this.mainContainer.classList.remove(this.STATES[key])
//     }
//     this.mainContainer.classList.add(newState)
//     this.state = newState
//   }

//   onAction() {
//     switch (this.state) {
//       case this.STATES.READY:
//         this.startGame()
//         break
//       case this.STATES.PLAYING:
//         this.placeBlock()
//         break
//       case this.STATES.ENDED:
//         this.restartGame()
//         break
//     }
//   }

//   startGame() {
//     if (this.state !== this.STATES.PLAYING) {
//       this.scoreContainer.innerHTML = '0'
//       this.updateState(this.STATES.PLAYING)
//       this.addBlock()
//     }
//   }

//   restartGame() {
//     this.updateState(this.STATES.RESETTING)

//     const oldBlocks = this.placedBlocks.children
//     const removeSpeed = 0.2
//     const delayAmount = 0.02
//     for (let i = 0; i < oldBlocks.length; i++) {
//       TimelineLite.to(oldBlocks[i].scale, removeSpeed, {
//         x: 0,
//         y: 0,
//         z: 0,
//         delay: (oldBlocks.length - i) * delayAmount,
//         ease: Power1.easeIn,
//         onComplete: () => this.placedBlocks.remove(oldBlocks[i])
//       })
//       TimelineLite.to(oldBlocks[i].rotation, removeSpeed, {
//         y: 0.5,
//         delay: (oldBlocks.length - i) * delayAmount,
//         ease: Power1.easeIn
//       })
//     }
//     const cameraMoveSpeed = removeSpeed * 2 + oldBlocks.length * delayAmount
//     this.stage.setCamera(2, cameraMoveSpeed)

//     const countdown = { value: this.blocks.length - 1 }
//     TimelineLite.to(countdown, cameraMoveSpeed, {
//       value: 0,
//       onUpdate: () => {
//         this.scoreContainer.innerHTML = String(Math.round(countdown.value))
//       }
//     })

//     this.blocks = this.blocks.slice(0, 1)

//     setTimeout(() => {
//       this.startGame()
//     }, cameraMoveSpeed * 1000)
//   }

//   placeBlock() {
//     const currentBlock = this.blocks[this.blocks.length - 1]
//     const newBlocks: BlockReturn = currentBlock.place()
//     this.newBlocks.remove(currentBlock.mesh)
//     if (newBlocks.placed) {
//       this.placedBlocks.add(newBlocks.placed)
//     }
//     if (newBlocks.chopped) {
//       this.choppedBlocks.add(newBlocks.chopped)
//       const positionParams = {
//         y: '-=30',
//         ease: Power1.easeIn,
//         onComplete: () => this.choppedBlocks.remove(newBlocks.chopped)
//       }
//       const rotateRandomness = 10
//       const rotationParams = {
//         delay: 0.05,
//         x:
//           newBlocks.plane === 'z'
//             ? Math.random() * rotateRandomness - rotateRandomness / 2
//             : 0.1,
//         z:
//           newBlocks.plane === 'x'
//             ? Math.random() * rotateRandomness - rotateRandomness / 2
//             : 0.1,
//         y: Math.random() * 0.1
//       }
//       if (
//         newBlocks.chopped.position[newBlocks.plane] >
//         newBlocks.placed.position[newBlocks.plane]
//       ) {
//         positionParams[newBlocks.plane] =
//           '+=' + 40 * Math.abs(newBlocks.direction)
//       } else {
//         positionParams[newBlocks.plane] =
//           '-=' + 40 * Math.abs(newBlocks.direction)
//       }
//       TimelineLite.to(newBlocks.chopped.position, 1, positionParams)
//       TimelineLite.to(newBlocks.chopped.rotation, 1, rotationParams)
//     }

//     this.addBlock()
//   }

//   addBlock() {
//     const lastBlock = this.blocks[this.blocks.length - 1]

//     if (lastBlock && lastBlock.state === lastBlock.STATES.MISSED) {
//       return this.endGame()
//     }

//     this.scoreContainer.innerHTML = String(this.blocks.length - 1)

//     const newKidOnTheBlock = new Block(lastBlock)
//     this.newBlocks.add(newKidOnTheBlock.mesh)
//     this.blocks.push(newKidOnTheBlock)

//     this.stage.setCamera(this.blocks.length * 2)

//     if (this.blocks.length >= 5) {
//       this.instructions.classList.add('hide')
//     }
//   }

//   endGame() {
//     this.updateState(this.STATES.ENDED)
//   }

//   tick() {
//     this.blocks[this.blocks.length - 1].tick()
//     this.stage.render()
//     window.requestAnimationFrame(() => {
//       this.tick()
//     })
//   }
// }
