import Player from '../Models/Player'
import Heart from '../Models/Heart'
import Skeleton from '../Models/Skeleton'
import { AnimsEnum } from '@/game/Models/Player/types'
import Socket from '@/game/Utils/socket'

function intersectsBonus(player: Player, bonus: Heart) {
  if (!bonus.used) {
    player.addHealth(bonus.value)
  }

  bonus.used = true
}

function intersectsSkeleton(player: Player, skeleton: Skeleton) {
  const intersectionAttack = Phaser
    .Geom
    .Intersects
    .GetRectangleIntersection(
      player.rect,
      skeleton.rectAttack,
    )

    if (intersectionAttack.x || intersectionAttack.y) {
      if (skeleton.motion === AnimsEnum.attack) {
        intersectsAttack(player, skeleton)
      }
    }
}

function intersectsAttack(player: Player, skeleton: Skeleton) {
  const distance = Phaser
    .Math.Distance.Between(
      player.x, player.y,
      skeleton.x, skeleton.y
    )

  let distancePower =  1 - (distance / (30 + skeleton.info.powerArea));

  if (distancePower < 0) {
    distancePower = 0;
  }

  player.setAttack(skeleton.info.power * distancePower)
}

export default function (client: Socket, player: Player, skeletons: Skeleton[], bonuses: Heart[]) {
  for(const bonus of bonuses) {
    const intersection = Phaser
      .Geom
      .Intersects
      .GetRectangleIntersection(
        player.rect,
        bonus.rect,
      )

    if (intersection.x || intersection.y) {
      intersectsBonus(player, bonus)
      client.removeBonus(bonus.id)
    }
  }

  for(const skeleton of skeletons) {
    const intersection = Phaser
      .Geom
      .Intersects
      .GetRectangleIntersection(
        player.rect,
        skeleton.rect,
      )

      if (intersection.x || intersection.y) {
        intersectsSkeleton(player, skeleton)
      }
  }

}