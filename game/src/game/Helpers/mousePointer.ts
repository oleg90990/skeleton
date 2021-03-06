import { GameObjects } from 'phaser'
import { DirectionEnum } from '@/game/Models/Player/enums'

export function isDownMouse(scene: Phaser.Scene) {
  return scene.input.mousePointer.isDown
}

export function getRadius(image: GameObjects.Image) {
  const mousePointer = image.scene.input.mousePointer
  const camera = image.scene.cameras.main
  return Phaser.Math.Angle.Between(
    image.x, image.y,
    mousePointer.x + camera.scrollX,
    mousePointer.y + camera.scrollY
  );
}

export function getDirection(image: GameObjects.Image): DirectionEnum {
  const radius = getRadius(image)

  if (radius > -1.9625 && radius < -1.1775) {
    return DirectionEnum.north
  }

  if (radius > -1.1775 && radius < -0.3925) {
    return DirectionEnum.northEast
  }

  if (radius > -0.3925 && radius < 0.3925) {
    return DirectionEnum.east
  }

  if (radius > 0.3925 && radius < 1.1775) {
    return DirectionEnum.southEast
  }

  if (radius > 1.1775 && radius < 1.9625) {
    return DirectionEnum.south
  }

  if (radius > 1.9625 && radius < 2.7475) {
    return DirectionEnum.southWest
  }

  if (radius > 2.7475 || radius < -2.7475) {
    return DirectionEnum.west
  }

  if (radius > -2.7475 && radius < -1.9625) {
    return DirectionEnum.northWest
  }

  return DirectionEnum.north
}

export function getOffset(image: GameObjects.Image) {
  const radius = getRadius(image)
  return {
    x: Math.cos(radius) * 2,
    y: Math.sin(radius) * 2
  }
}