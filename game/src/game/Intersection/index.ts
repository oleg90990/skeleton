import Player from '@/game/Models/Player/player'
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

export default {
  update: function(this: Phaser.Scene) {

  }
}