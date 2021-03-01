import { GameObjects, Scene } from 'phaser';
import Anims from '../Skeleton/anims';
import Directions from '../Skeleton/directions';

class Zombie extends GameObjects.Image {
    private startX: number
    private startY: number
    private anim: any
    private direction:any
    private speed:any
    private f: any
    private motion: any

    constructor(scene: Scene, x: number, y: number, motion: any, direction: any) {
        super(scene, x, y, 'skeleton', direction.offset);

        this.startX = x;
        this.startY = y;

        this.anim = Anims[motion];
        this.direction = Directions[direction];
        this.speed = 0.4;
        this.f = this.anim.startFrame;
        this.depth = y + 64;
        this.motion = motion;

        this.scene.time.delayedCall(200, this.changeFrame, [], this);
    }

    changeFrame ()
    {
        this.f++;

        if (this.f === this.anim.endFrame)
        {
            this.f = this.anim.startFrame;
        }
        else
        {
            this.frame = this.texture.get(this.direction.offset + this.f);
        }

        this.scene.time.delayedCall(200, this.changeFrame, [], this);
    }

    runAnimation(newMotion: string) {
        console.log(newMotion)
        if (this.motion !== newMotion) {
            this.anim = Anims[newMotion];
            this.motion = newMotion;
            this.f = this.anim.startFrame;
            this.frame = this.texture.get(this.direction.offset + this.f);
        }
    }

    isDown(key: string) {
        return this.scene
            .input
            .keyboard
            .addKey(key)
            .isDown
    }

    setDirection(key: string) {
        this.direction = Directions[key]
    }

    updateDirection() {
        this.x += this.direction.x * this.speed
        this.y += this.direction.y * this.speed
    }

    update ()
    {
        const isDownW = this.isDown('W')
        const isDownD = this.isDown('D')
        const isDownS = this.isDown('S')
        const isDownA = this.isDown('A')

        if (isDownW && !isDownD && !isDownS && !isDownA) { //w
            this.setDirection('north')
            this.updateDirection()
            this.runAnimation('walk')
        } if (isDownW && isDownD && !isDownS && !isDownA) { // wd
            this.setDirection('northEast')
            this.updateDirection()
            this.runAnimation('walk')
        } if (!isDownW && isDownD && !isDownS && !isDownA) { // d
            this.setDirection('east')
            this.updateDirection()
            this.runAnimation('walk')
        } if (!isDownW && isDownD && isDownS && !isDownA) { //ds
            this.setDirection('southEast')
            this.updateDirection()
            this.runAnimation('walk')
        } if (!isDownW && !isDownD && isDownS && !isDownA) { //s
            this.setDirection('south')
            this.updateDirection()
            this.runAnimation('walk')
        } if (!isDownW && !isDownD && isDownS && isDownA) { //sa
            this.setDirection('southWest')
            this.updateDirection()
            this.runAnimation('walk')
        } if (!isDownW && !isDownD && !isDownS && isDownA) { // a
            this.setDirection('west')
            this.updateDirection()
            this.runAnimation('walk')
        } if (isDownW && !isDownD && !isDownS && isDownA) { //aw
            this.setDirection('northWest')
            this.updateDirection()
            this.runAnimation('walk')
        } 

        if (!isDownW && !isDownD && !isDownS && !isDownA) {
            this.runAnimation('idle')
        }
    }
}

export default Zombie;