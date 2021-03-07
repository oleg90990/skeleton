import { Scene } from 'phaser'
import Services from './services'

export class Game extends Scene {
    constructor() {
        super({ key: 'GameScene' })
    }

    public preload() {
      for (const service of Services.items) {
        if (service.preload) {
          service.preload.apply(this, [])
        }
      }
    }

    public create() {
      for (const service of Services.items) {
        if (service.create) {
          service.create.apply(this, [])
        }
      }
    }

    public update() {
      for (const service of Services.items) {
        if (service.update) {
          service.update.apply(this, [])
        }
      }
    }
}

export default Game