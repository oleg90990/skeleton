import Player from '@/game/Models/Player/player'
import Heart from '@/game/Models/Heart/heart'
import { waterTiles, grassTiles } from '@/game/Map'


export function isIntersectionWater(player: Player) {
  const area = player.area

  area.x = player.x + player.directionOffset.x * player.info.speed + 30
  area.y = player.y + player.directionOffset.y * player.info.speed + 30

  for (const rect of waterTiles) {
    const intersection = Phaser
      .Geom
      .Intersects
      .GetCircleToRectangle(area, rect)

    if (intersection.length) {
      return true
    }
  }

  return false
}

export function isIntersectionPlayerHeart(player: Player, heart: Heart) {
  return Phaser
    .Geom
    .Intersects
    .GetCircleToCircle(player.area, heart.area)
    .length > 0
}

export default {
  update: function(this: Phaser.Scene) {

  }
}