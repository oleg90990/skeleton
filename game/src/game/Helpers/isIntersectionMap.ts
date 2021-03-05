import Player from '@/game/Models/Player'
import Game from '@/game'

export default function (player: Player, scene: Game): boolean {
  const newX = player.x + player.direction.x * player.info.speed + 30
  const newY = player.y + player.direction.y * player.info.speed + 30

  const rect1 = new Phaser.Geom.Rectangle(
    newX, newY, 20, 20,
  )

  for (const rect2 of scene.tileIntersects) {
    const intersection = Phaser
      .Geom
      .Intersects
      .GetRectangleIntersection(rect2, rect1)

    if (intersection.x) {
      return true
    }
  }

  return false
}
