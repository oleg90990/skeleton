import Player from '@/game/Models/Player'
import { DirectionEnum } from '@/game/types'
export function isDownMouse(player: Player) {
  return player.scene.input.mousePointer.isDown
}

export function getRadius(player: Player) {
  const mousePointer = player.scene.input.mousePointer
  const camera = player.scene.cameras.main
  return Phaser.Math.Angle.Between(
    player.x, player.y,
    mousePointer.x + camera.scrollX,
    mousePointer.y + camera.scrollY
  );
}

export function getDirection(player: Player): DirectionEnum {
  const radius = getRadius(player)

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

export function getPosition(player: Player) {
  const radius = getRadius(player)
  return {
    x: Math.cos(radius) * 2,
    y: Math.sin(radius) * 2
  }
}