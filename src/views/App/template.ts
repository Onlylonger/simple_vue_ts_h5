// import Vue from 'util/vueExt'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
// import Game from '../../utils/Game'
import Game from '../../game'

@Component
export default class App extends Vue {
  count = 5
  game = null

  created() {
    this.game = new Game()
  }
}
