import { Scene } from 'phaser'
import Skeleton from './Models/Skeleton'
import Zombie from './Models/Zombie'

export class Game extends Scene
{
    constructor () {
        super({ key: 'GameScene' })
    }

    private skeletons: Array<any> = [];
    private user: any;

    private tileWidthHalf: any;
    private tileHeightHalf: any;
    // private d: any = 0;
    // private scene: any;

    preload ()
    {
        this.load.json('map', require('@/assets/isometric-grass-and-water.json'));
        this.load.spritesheet('tiles', require('@/assets/isometric-grass-and-water.png'), { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('skeleton', require('@/assets/skeleton8.png'), { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('zombie', require('@/assets/zombie.png'), { frameWidth: 128, frameHeight: 128 });
        this.load.image('house', require('@/assets/rem_0002.png'));
    }

    create ()
    {
        this.buildMap();
        this.placeHouses();

        this.user = this.add.existing(new Zombie(this, 500, 500, 'idle', 'west'))

        this.skeletons.push(this.add.existing(new Skeleton(this, 240, 290, 'walk', 'west', 100)));
        this.skeletons.push(this.add.existing(new Skeleton(this, 100, 380, 'walk', 'southEast', 230)));
        this.skeletons.push(this.add.existing(new Skeleton(this, 620, 140, 'walk', 'south', 380)));
        this.skeletons.push(this.add.existing(new Skeleton(this, 460, 180, 'idle', 'south', 0)));
        this.skeletons.push(this.add.existing(new Skeleton(this, 760, 100, 'attack', 'southEast', 0)));
        this.skeletons.push(this.add.existing(new Skeleton(this, 800, 140, 'attack', 'northWest', 0)));
        this.skeletons.push(this.add.existing(new Skeleton(this, 750, 480, 'walk', 'east', 200)));
        this.skeletons.push(this.add.existing(new Skeleton(this, 1030, 300, 'die', 'west', 0)));
        this.skeletons.push(this.add.existing(new Skeleton(this, 1180, 340, 'attack', 'northEast', 0)));
        this.skeletons.push(this.add.existing(new Skeleton(this, 1180, 180, 'walk', 'southEast', 160)));
        this.skeletons.push(this.add.existing(new Skeleton(this, 1450, 320, 'walk', 'southWest', 320)));
        this.skeletons.push(this.add.existing(new Skeleton(this, 1500, 340, 'walk', 'southWest', 340)));
        this.skeletons.push(this.add.existing(new Skeleton(this, 1550, 360, 'walk', 'southWest', 330)));

        this.cameras.main.setSize(window.innerWidth, window.innerHeight);
    }

    update ()
    {
        this.skeletons.forEach(function (skeleton) {
            skeleton.update();
        });


        this.user.update();

        // return;

        // if (d)
        // {
        //     this.cameras.main.scrollX -= 0.5;

        //     if (this.cameras.main.scrollX <= 0)
        //     {
        //         d = 0;
        //     }
        // }
        // else
        // {
        //     this.cameras.main.scrollX += 0.5;

        //     if (this.cameras.main.scrollX >= 800)
        //     {
        //         d = 1;
        //     }
        // }
    }


    buildMap ()
    {
        //  Parse the data out of the map
        const data = this.cache.json.get('map');

        const tilewidth = data.tilewidth;
        const tileheight = data.tileheight;

        this.tileWidthHalf = tilewidth / 2;
        this.tileHeightHalf = tileheight / 2;

        const layer = data.layers[0].data;

        const mapwidth = data.layers[0].width;
        const mapheight = data.layers[0].height;

        const centerX = mapwidth * this.tileWidthHalf;
        const centerY = 16;

        let i = 0;

        for (let y = 0; y < mapheight; y++)
        {
            for (let x = 0; x < mapwidth; x++)
            {
                const id = layer[i] - 1;

                const tx = (x - y) * this.tileWidthHalf;
                const ty = (x + y) * this.tileHeightHalf;

                const tile = this.add.image(centerX + tx, centerY + ty, 'tiles', id);

                tile.depth = centerY + ty;

                i++;
            }
        }
    }

    placeHouses ()
    {
        const house_1 = this.add.image(240, 370, 'house');
        house_1.depth = house_1.y + 86;

        const house_2 = this.add.image(1300, 290, 'house');
        house_2.depth = house_2.y + 86;
    }
}
