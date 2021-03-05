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
  const points = Phaser
    .Geom
    .Intersects
    .GetCircleToCircle(
      player.area,
      skeleton.areaAttack,
    )

    if (points.length > 0) {
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
    const points = Phaser
      .Geom
      .Intersects
      .GetCircleToCircle(
        player.area,
        bonus.area,
      )

    if (points.length > 0) {
      intersectsBonus(player, bonus)
      client.removeBonus(bonus.id)
    }
  }

  for(const skeleton of skeletons) {
    const points = Phaser
      .Geom
      .Intersects
      .GetCircleToCircle(
        player.area,
        skeleton.area,
      )

      if (points.length > 0) {
        intersectsSkeleton(player, skeleton)
      }
  }

}