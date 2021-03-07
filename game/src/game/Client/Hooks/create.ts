import { connect } from '@/game/Utils/client'
import { container } from '@/game/services'

export default function (this: Phaser.Scene) {
  connect(() => {
    // container.Player.execute.apply(this, [])
  });
}