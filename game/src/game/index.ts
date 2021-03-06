import { Scene } from 'phaser'
import Services from './services'
// import Player from './Models/Player'
// import Skeleton from './Models/Skeleton'
// import Heart from './Models/Heart'
// import { AnimsEnum, PlayerInfo } from './Models/Player/types'
// import { DirectionEnum, EmitResponseInterface, AvailableLand, Bonus } from '@/game/types'
// import randomPosition from './Helpers/randomPosition'

// import updateIntersection from '@/game/Actions/updateIntersection'
// import updateCameras from '@/game/Actions/updateCameras'
// import updatePlayer from '@/game/Actions/updatePlayer'
// import updateEnemies from '@/game/Actions/updateEnemies'

// import createMap from '@/game/Actions/Map/create'

export class Game extends Scene {
    // public tileIntersects: Phaser.Geom.Rectangle[] = []
    // private tileWidthHalf: any
    // private tileHeightHalf: any
    // private skeletons: any = {}
    // private user: any
    // private panel: any
    // // private visitingLands: AvailableLand[] = []
    // private bonuses: any = {}
    // private lastTime = 0;
    // private delayEmit = 50;

    constructor() {
        super({ key: 'GameScene' })
    }

    public preload() {
      for (const service of Services.items) {
        if (service.preload) {
          service.preload.apply(this, [])
        }
      }
    //       this.load.spritesheet('heart', require('@/assets/heart.png'), {
    //   frameWidth: 20,
    //   frameHeight: 20,
    // })
    }

    public create() {
      for (const service of Services.items) {
        if (service.create) {
          service.create.apply(this, [])
        }
      }

      // this.client = new Client(() => {

      // })

      // this.client = new Socket()

      // this.client.connect(() => {
      //   this.buildMap()
      //   this.placeHouses()

      //   this.user = this.add.existing(
      //     new Player(this)
      //   )

      //   this.user.reset()
      //   this.client.init(this.user)

      //   this.client.onInit(({ id }: EmitResponseInterface) => {
      //     if (!this.skeletons[id]) {
      //       this.client.init(this.user)
      //       this.client.initBonuses(Object.values(this.bonuses))
      //       this.skeletons[id] = this.add.existing(new Skeleton(this))
      //     }
      //   })

      //   this.client.onEmit((response: EmitResponseInterface) => {
      //     if (this.skeletons[response.id]) {
      //       this.skeletons[response.id].set(response)
      //     } else {
      //       this.skeletons[response.id] = this.add.existing(new Skeleton(this))
      //     }
      //   })

      //   this.client.onDisconect((id: string) => {
      //     if (this.skeletons[id]) {
      //       this.skeletons[id].destroy()
      //       delete this.skeletons[id]
      //     }
      //   })

      //   this.client.onInitBonuses((bonuses: Heart[]) => {
      //     for(const bonus of bonuses) {
      //       if (!this.bonuses[bonus.id]) {
      //         this.bonuses[bonus.id] = this.add.existing(
      //           new Heart(this, bonus.x, bonus.y, bonus.id, bonus.value)
      //         )
      //       }
      //     }
      //   })

      //   this.client.onBonus((bonus: Bonus) => {
      //     this.bonuses[bonus.id] = this.add.existing(
      //       new Heart(this, bonus.x, bonus.y, bonus.id, bonus.value)
      //     )
      //   })

      //   this.client.onRemoveBonus((id: string) => {
      //     if (this.bonuses[id]) {
      //       this.bonuses[id].destroy()
      //       delete this.bonuses[id]
      //     }
      //   })
      // })
    }

    // public getRandPosition() {
    //   // return randomPosition(this.visitingLands);
    // }

    public update() {
      for (const service of Services.items) {
        if (service.update) {
          service.update.apply(this, [])
        }
      }
      // updatePlayer.bind(this)()

      // updateEnemies(
      //   this,
      //   this.skeletons
      // )

      // updateIntersection(
      //   this,
      //   this.client,
      //   this.user,
      //   Object.values(this.skeletons),
      //   Object.values(this.bonuses),
      // )

      // updateCameras(
      //   this,
      //   this.cameras.main,
      //   this.user
      // )
    }
}

export default Game