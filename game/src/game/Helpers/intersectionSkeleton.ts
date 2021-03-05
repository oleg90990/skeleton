import Phaser, { GameObjects } from 'phaser'
import Skeleton from '../Models/Skeleton'
import Player from '../Models/Player'
import { AnimsEnum } from '@/game/Models/Player/types'

export default function(player: Player, skeleton: Skeleton) {
  // const intersection = Phaser
  //     .Geom
  //     .Intersects
  //     .GetRectangleIntersection(
  //       player.rect,
  //       skeleton.rect,
  //     )

  // if (intersection.x || intersection.y) {
  //   player.intersectionSkeleton(skeleton)
  // }

  // const intersectionAttack = Phaser
  //     .Geom
  //     .Intersects
  //     .GetRectangleIntersection(
  //       player.rect,
  //       skeleton.rectAttack,
  //     )

  // if (intersectionAttack.x) {
  //   if (skeleton.motion === AnimsEnum.attack) {
  //     player.attackSkeleton(skeleton)
  //   }
  // }
}
