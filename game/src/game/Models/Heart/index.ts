import { isIntersectionPlayerHeart } from '@/game/Intersection'
import { bonus, useBonus, removeBonus, setBonuses } from '@/game/Client'
import { BonusInterface } from '@/game/types'
import { player } from '@/game/Models/Player'
import AddHealth from '@/game/Models/Player/Actions/addHealth'
import Heart from './heart'

export const hearts: any = {}

export function getBonusesArray() {
  const bonuses: BonusInterface[] = []

  for (const id in hearts) {
    if (hearts[id]) {
      const heart = hearts[id] as Heart
      bonuses.push({
        id: heart.id,
        model: 'Heart',
        value: heart.value,
        x: heart.x,
        y: heart.y
      })
    }
  }

  return bonuses
}

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
      if (hearts[id]) {
        hearts[id].destroy()
        delete hearts[id]
      }
    })

    setBonuses((bonuses: BonusInterface[]) => {
      for (const bonus of bonuses) {
        if (bonus.model == 'Heart' && !hearts[bonus.id]) {
          hearts[bonus.id] = this.add.existing(
            new Heart(this, bonus.x, bonus.y, bonus.id, bonus.value)
          )
        }
      }
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