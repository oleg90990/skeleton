import Phaser, { GameObjects } from 'phaser'
import Skeleton from '../Models/Skeleton'
import Player from '../Models/Player'
import { AnimsEnum } from '@/game/Models/Player/types'

export default function (player: Player, skeleton: Skeleton): boolean {
  const intersection = Phaser
      .Geom
      .Intersects
      .GetRectangleIntersection(
        player.getRect(),
        skeleton.getRect()
      ) 

  if (intersection.x) {
    player.intersectionSkeleton(skeleton)
  }

  const intersectionAttack = Phaser
      .Geom
      .Intersects
      .GetRectangleIntersection(
        player.getRect(),
        skeleton.getRectAttack()
      ) 

  if (intersectionAttack.x) {
    if (skeleton.getMotion() === AnimsEnum.attack) {
      player.attackSkeleton(skeleton)
    }
  }

  return false
}