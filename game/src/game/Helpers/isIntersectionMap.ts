import Phaser, { GameObjects } from 'phaser'
import {
  AnimationItem,
  DirectionEnum,
  DirectionItem,
} from '@/game/types'

interface Rect {
  x: number,
  y: number,
  w: number,
  h: number
}

export default function (image: GameObjects.Image, direction: DirectionItem, speed: number): boolean {
  const newX = image.x + direction.x * speed
  const newY = image.y + direction.y * speed + 30

  if (newX <= 0) {
    return true;
  }

  if (newY <= 50) {
    return true;
  }

  const rect1 = new Phaser.Geom.Rectangle(
    newX,
    newY,
    20,
    20,
  )

  const list: any = image.scene

  for (const rect2 of list.tileIntersects) {
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