import { Scene } from 'phaser'
import Player from './Models/Player'
import Skeleton from './Models/Skeleton'
import Heart from './Models/Heart'
import { AnimsEnum, PlayerInfo } from './Models/Player/types'
import { DirectionEnum, EmitResponseInterface, AvailableLand, Bonus } from '@/game/types'
import Socket from '@/game/Utils/socket'
import intersectionSkeleton from '@/game/Helpers/intersectionSkeleton'
import randomPosition from './Helpers/randomPosition'
import intersection from '@/game/Utils/intersection'

const defaultInfo: PlayerInfo = {
  health: 1000,
  power: 1,
  powerArea: 30,
  speed: 1,
}

export class Game extends Scene {
    public tileIntersects: Phaser.Geom.Rectangle[] = []
    private tileWidthHalf: any
    private tileHeightHalf: any
    private client!: Socket
    private skeletons: any = {}
    private user: any
    private panel: any
    private visitingLands: AvailableLand[] = []
    private bonuses: any = {}
    private lastTime = 0;
    private delayEmit = 100;

    constructor() {
        super({ key: 'GameScene' })
    }

    public preload() {
        this.load.json('map', require('@/assets/isometric-grass-and-water-small.json'))
        this.load.spritesheet('heart', require('@/assets/heart.png'), {
          frameWidth: 20,
          frameHeight: 20,
        })
        this.load.spritesheet('tiles', require('@/assets/isometric-grass-and-water.png'), {
          frameWidth: 64,
          frameHeight: 64,
        })
        this.load.spritesheet('skeleton', require('@/assets/skeleton8.png'), {
          frameWidth: 128,
          frameHeight: 128,
        })
        this.load.spritesheet('zombie', require('@/assets/zombie.png'), {
          frameWidth: 128,
          frameHeight: 128,
        })
        this.load.image('house', require('@/assets/rem_0002.png'))
    }

    public create() {
      this.cameras.main.setSize(window.innerWidth, window.innerHeight);

      this.client = new Socket()

      this.client.connect(() => {
        this.buildMap()
        this.placeHouses()

        this.user = this.add.existing(
          new Player(this,
             0, 0,
             AnimsEnum.idle,
             DirectionEnum.west,
             defaultInfo,
        ))

        this.user.reset()

        this.client.init(this.user)

        this.client.onInit(({ x, y, motion, dir, id, info }: EmitResponseInterface) => {
          if (!this.skeletons[id]) {
            this.client.init(this.user)
            this.skeletons[id] = this.add.existing(new Skeleton(
              this, x, y, motion, dir, info,
            ))
          }
        })

        this.client.onEmit(({ x, y, motion, dir, id, info }: EmitResponseInterface) => {
          if (this.skeletons[id]) {
            this.skeletons[id].set(
              x, y, motion, dir, info,
            )
          } else {
            this.skeletons[id] = this.add.existing(new Skeleton(
              this, x, y, motion, dir, info,
            ))
          }
        })

        this.client.onDisconect((id: string) => {
          if (this.skeletons[id]) {
            this.skeletons[id].destroy()
            delete this.skeletons[id]
          }
        })

        this.client.onBonus((bonus: Bonus) => {
          this.bonuses[bonus.id] = this.add.existing(
            new Heart(this, bonus.x, bonus.y, bonus.id, bonus.value)
          )
        })

        this.client.onRemoveBonus((id: string) => {
          if (this.bonuses[id]) {
            this.bonuses[id].destroy()
            delete this.bonuses[id]
          }
        })
      })
    }

    public getRandPosition() {
      return randomPosition(this.visitingLands);
    }

    public update() {
      if (this.user) {
        this.user.update()

        for (const id in this.skeletons) {
          if (this.skeletons[id]) {
            this.skeletons[id].update()
          }
        }

        intersection(
          this.client, this.user,
          Object.values(this.skeletons),
          Object.values(this.bonuses),
        )

        this.cameras.main.scrollX = this.user.x - window.innerWidth / 2
        this.cameras.main.scrollY = this.user.y - window.innerHeight / 2

        if (this.time.now - this.lastTime > this.delayEmit) {
          this.client.emit(this.user)
          this.lastTime = this.time.now
        }
      }
    }

    private buildMap() {
        //  Parse the data out of the map
        const data = this.cache.json.get('map')

        const tilewidth = data.tilewidth
        const tileheight = data.tileheight

        this.tileWidthHalf = tilewidth / 2
        this.tileHeightHalf = tileheight / 2

        const layer = data.layers[0].data

        const mapwidth = data.layers[0].width
        const mapheight = data.layers[0].height

        const centerX = 1600
        const centerY = 1600

        let i = 0

        for (let y = 0; y < mapheight; y++) {
            for (let x = 0; x < mapwidth; x++) {
                const id = layer[i] - 1
                const tx = (x - y) * this.tileWidthHalf
                const ty = (x + y) * this.tileHeightHalf
                const tile = this.add.image(centerX + tx, centerY + ty, 'tiles', id)

                if ([22, 23].includes(id)) {
                  this.tileIntersects.push(
                    new Phaser.Geom.Rectangle(
                      tile.x - 10,
                      tile.y - 10,
                      tile.width,
                      tile.height,
                  ))
                }

                if ([1, 2, 3].includes(id)) {
                  this.visitingLands.push({
                    x: tile.x + tilewidth / 2,
                    y: tile.y + tileheight / 2,
                  })
                }

                i++
            }
        }
    }

    private placeHouses() {
        // const house_1 = this.add.image(240, 370, 'house')
        // house_1.depth = 9999

        // const house_2 = this.add.image(1300, 290, 'house')
        // house_2.depth = 9999
    }
}

export default Game