import { AnimsEnum } from '@/game/Models/Player/types'

export interface DirectionItem {
  offset: number
  x: number
  y: number   
}

export interface AnimationItem {
  startFrame: number
  endFrame: number
}

export enum DirectionEnum {
  west = 'west',
  northWest = 'northWest',
  north = 'north',
  northEast = 'northEast',
  east = 'east',
  southEast = 'southEast',
  south = 'south',
  southWest = 'southWest'
}

export interface Direction {
  [DirectionEnum.west]: DirectionItem
  [DirectionEnum.northWest]: DirectionItem
  [DirectionEnum.north]: DirectionItem
  [DirectionEnum.northEast]: DirectionItem
  [DirectionEnum.east]: DirectionItem
  [DirectionEnum.southEast]: DirectionItem
  [DirectionEnum.south]: DirectionItem
  [DirectionEnum.southWest]: DirectionItem
}

export interface EmitRespnseInterface {
  direction: DirectionEnum
  motion: AnimsEnum
  x: number
  y: number,
  id: string
}

export interface EmitRequestInterface {
  direction: DirectionEnum
  motion: AnimsEnum
  x: number
  y: number
  id?: string
}