import { BonusInterface } from '@/game/types'
import create from './Hooks/create'
import Player from '@/game/Models/Player/player'
import { PlayerStatus } from '@/game/Client/types'
import {
  onBonus,
  emitUseBonus,
  onRemoveBonus,
  initBonuses,
  onBonuses,
  emitInitPlayer,
  onInitPlayer,
  emitUpdatePlayer,
  onUpdatePlayer,
  onDisconect,
} from '@/game/Utils/client'

export function bonus(callback: (bouns: BonusInterface) => void) {
  onBonus(callback)
}

export function useBonus(id: string) {
  emitUseBonus(id)
}

export function removeBonus(callback: (id: string) => void) {
  onRemoveBonus(callback)
}

export function bonuses(bounses: BonusInterface[]) {
  initBonuses(bounses)
}

export function setBonuses(callback: (bonuses: BonusInterface[]) => void) {
  onBonuses(callback)
}

//Player

export function initPlayer({ spritesheet: { sprite }, directionOffset, directionKey, motionKey, x, y, info }: Player) {
  emitInitPlayer({ sprite, directionOffset, directionKey, motionKey, x, y, info })
}

export function onInitEnemy(callback: (status: PlayerStatus) => void) {
  onInitPlayer(callback)
}

export function setStatus({ spritesheet: { sprite }, directionOffset, directionKey, motionKey, x, y, info }: Player) {
  emitUpdatePlayer({ sprite, directionOffset, directionKey, motionKey, x, y, info })
}

export function updateEnemy(callback: (status: PlayerStatus) => void) {
  onUpdatePlayer(callback)
}

export function disconect(callback: (id: string) => void) {
  onDisconect(callback)
}

export default {
  create
}