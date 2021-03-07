// import { EmitResponseInterface, EmitRequestInterface } from '@/game/types'
import { Socket, io } from "socket.io-client"
import { BonusInterface } from '@/game/types'
import { PlayerStatus } from '@/game/Client/types'

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class Client {
  private static instance: Client
  public id!: string
  private socket!: Socket;

  private constructor() { }

  public static getInstance(): Client {
    if (!Client.instance) {
        Client.instance = new Client();
    }

    return Client.instance;
  }

  public connect(callback: () => void) {
    let url = 'ws://46.17.40.175:3000'

    if (process.env.NODE_ENV === 'development') {
      url = 'ws://localhost:3000'
    }

    this.socket = io(url, {
      reconnectionDelayMax: 1000,
    })

    this.socket.on("connect", () => {
      this.id = this.socket.id
      callback()
    })
  }

  public on(event: string, callback: Function) {
    this.socket.on(event, callback)
  }

  public emit(event: string, callback: any) {
    this.socket.emit(event, callback)
  }
}

export function connect(callback: () => void) {
  Client.getInstance().connect(callback);
}

//Player

export function emitInitPlayer(status: PlayerStatus) {
  status.id = Client.getInstance().id
  Client.getInstance().emit("initPlayer", status)
}

export function onInitPlayer(callback: (status: PlayerStatus) => void) {
  Client.getInstance().on("initPlayer", (status: PlayerStatus) => {
   callback(status)
  })
}

export function emitUpdatePlayer(status: PlayerStatus) {
  status.id = Client.getInstance().id
  Client.getInstance().emit('updatePlayer', status)
}

export function onUpdatePlayer(callback: (status: PlayerStatus) => void) {
  Client.getInstance().on("updatePlayer", (status: PlayerStatus) => {
   callback(status)
  })
}

export function onDisconect(callback: (id: string) => void) {
   Client.getInstance().on("disconectitem", (id: string) => {
    callback(id)
  })
}

export function attack() {
  Client.getInstance().emit('attackPlayer', Client.getInstance().id)
}

export function onAttack(callback: (id: string) => void) {
  Client.getInstance().on('attackPlayer', (id: string) => {
    callback(id)
  })
}

//Bouns

export function onBonus(callback: (bonus: BonusInterface) => void) {
  Client.getInstance().on("bonus", (bonus: BonusInterface) => {
    callback(bonus)
  })
}

export function onRemoveBonus(callback: (id: string) => void) {
  Client.getInstance().on("removebonus", (id: string) => {
    callback(id)
  })
}

export function emitUseBonus(id: string) {
  Client.getInstance().emit("removebonus", id)
}

export function initBonuses(bonuses: BonusInterface[]) {
  Client.getInstance().emit("initbonuses", bonuses)
}

export function onBonuses(callback: (bonuses: BonusInterface[]) => void) {
  Client.getInstance().on("initbonuses", callback)
}