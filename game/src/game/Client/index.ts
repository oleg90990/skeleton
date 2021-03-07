import { onBonus, emitUseBonus, onRemoveBonus } from '@/game/Utils/client'
import { BonusInterface } from '@/game/types'
import create from './Hooks/create'

export function bonus(callback: (bouns: BonusInterface) => void) {
  onBonus(callback)
}

export function useBonus(id: string) {
  emitUseBonus(id)
}

export function removeBonus(callback: (id: string) => void) {
  onRemoveBonus(callback)
}


export default {
  create
}