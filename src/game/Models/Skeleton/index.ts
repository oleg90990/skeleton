import { GameObjects, Scene } from 'phaser';
import Anims from './anims';
import Directions from './directions';

class Skeleton extends GameObjects.Image {
    private startX: number
    private startY: number
    private distance: any
    private motion: any
    private anim: any
    private direction:any
    private speed:any
    private f:any

    constructor(scene: Scene, x: number, y: number, motion: any, direction: any, distance: any) {
        super(scene, x, y, 'skeleton', direction.offset);

        this.startX = x;
        this.startY = y;
        this.distance = distance;

        this.motion = motion;
        this.anim = Anims[motion];
        this.direction = Directions[direction];
        this.speed = 0.15;
        this.f = this.anim.startFrame;

        this.depth = y + 64;

        this.scene.time.delayedCall(this.anim.speed * 1000, this.changeFrame, [], this);
    }

    changeFrame ()
    {
        this.f++;

        var delay = this.anim.speed;

        if (this.f === this.anim.endFrame)
        {
            switch (this.motion)
            {
                case 'walk':
                    this.f = this.anim.startFrame;
                    this.frame = this.texture.get(this.direction.offset + this.f);
                    this.scene.time.delayedCall(delay * 1000, this.changeFrame, [], this);
                    break;

                case 'attack':
                    delay = Math.random() * 2;
                    this.scene.time.delayedCall(delay * 1000, this.resetAnimation, [], this);
                    break;

                case 'idle':
                    delay = 0.5 + Math.random();
                    this.scene.time.delayedCall(delay * 1000, this.resetAnimation, [], this);
                    break;

                case 'die':
                    delay = 6 + Math.random() * 6;
                    this.scene.time.delayedCall(delay * 1000, this.resetAnimation, [], this);
                    break;
            }
        }
        else
        {
            this.frame = this.texture.get(this.direction.offset + this.f);

            this.scene.time.delayedCall(delay * 1000, this.changeFrame, [], this);
        }
    }

    resetAnimation ()
    {
        this.f = this.anim.startFrame;

        this.frame = this.texture.get(this.direction.offset + this.f);

        this.scene.time.delayedCall(this.anim.speed * 1000, this.changeFrame, [], this);
    }

    update ()
    {
        if (this.motion === 'walk')
        {
            this.x += this.direction.x * this.speed;

            if (this.direction.y !== 0)
            {
                this.y += this.direction.y * this.speed;
                this.depth = this.y + 64;
            }

            //  Walked far enough?
            if (Phaser.Math.Distance.Between(this.startX, this.startY, this.x, this.y) >= this.distance)
            {
                this.direction = Directions[this.direction.opposite];
                this.f = this.anim.startFrame;
                this.frame = this.texture.get(this.direction.offset + this.f);
                this.startX = this.x;
                this.startY = this.y;
            }
        }
    }
}

export default Skeleton;