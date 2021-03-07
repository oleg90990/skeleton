import { isIntersectionPlayerHeart } from '@/game/Intersection'
import { bonus, useBonus, removeBonus } from '@/game/Client'
import { BonusInterface } from '@/game/types'
import { player } from '@/game/Models/Player'
import AddHealth from '@/game/Models/Player/Actions/addHealth'
import Heart from './heart'

export const hearts: any = {}

export default {
  preload: function (this: Phaser.Scene) {
    this.load.spritesheet('heart', require('@/assets/heart.png'), {
      frameWidth: 20,
      frameHeight: 20,
    })
  },
  create: function (this: Phaser.Scene) {
    bonus(({ x, y, id, value, model }: BonusInterface) => {
      if (model === 'Heart') {
        hearts[id] = this.add.existing(
          new Heart(this, x, y, id, value)
        )
      }
    })

    removeBonus((id: string) => {
      hearts[id].destroy()
      delete hearts[id]
    })
  },
  update: function (this: Phaser.Scene) {
    if (player) {
      for (const id in hearts) {
        if (!hearts[id].used && isIntersectionPlayerHeart(player, hearts[id])) {
          AddHealth(player, hearts[id].value)
          useBonus(id)
          hearts[id].used = true
        }
      }
    }
  },
}