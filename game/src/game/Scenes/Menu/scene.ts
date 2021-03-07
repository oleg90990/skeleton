import Phaser, { Scene } from 'phaser'
import spritesheets from '@/game/Models/Player/Spritesheets'
import Player from '@/game/Models/Player/player'
import { Sprite } from '@/game/Client/types'
import Game from '@/game'

export default class Menu extends Phaser.Scene {
  private width: number = 600
  private height: number = 168

  get x() {
    return ((this.cameras.main.width - this.width) / 2)
  }

  get y() {
    return ((this.cameras.main.height - this.height) / 2)
  }

  onSelectSprite(callback: (sprite: Sprite) => void) {
    const r = this.add.rectangle(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.width,
      this.height,
      0x3d738c
    );

    r.setStrokeStyle(3, 0x1c2511);

    let offset = 83; 
    const width = this.width / Object.values(spritesheets).length

    for (let [key, spritesheet] of Object.entries(spritesheets)) {
      this.add.existing(
        new Player(this, this.x + offset, this.y + 85, spritesheet)
      )

      this.add.rectangle(
         this.x + offset, this.y + 85, 128, 128, 0x213e4c
      ).setInteractive()
      .on('pointerdown', (pointer: any) => {
        callback(spritesheet.sprite)
        this.scene.remove();
      });

      offset += width - 5
    }
  }
}