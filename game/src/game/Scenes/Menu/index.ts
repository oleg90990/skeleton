import Menu from './scene'
import { Sprite } from '@/game/Client/types'
import { container } from '@/game/services'

export default {
  create: function(this: Phaser.Scene) {
    const m = this.scene.add('menu', Menu, true, {
      root: this
    }) as Menu;

    m.onSelectSprite((sprite: Sprite) => {
      container.Player.execute.apply(this, [sprite])
      
    })
  }
}