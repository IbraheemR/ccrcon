import { CCRconHandler } from "./CCRcon";

// TODO: JSON doc annotations
/**
 * A proxy allowing you to conveniently access turtle api methods + gps.locate
 * All returns are as described by the documentation of the version of computer craft (Tweaked) which you are using.
 * The typings here are based on https://tweaked.cc/module/turtle.html and http://www.computercraft.info/wiki/Turtle_(API) as of 26/11/2020
 */
export default class TurtleProxy {
  /**
   *
   * @param rconHandler The `CCRconHandler` for the turtle you wish to control
   */

  // TODO: add checking for if CCRconHandler is connected to a computer
  constructor(public rconHandler: CCRconHandler) { }

  // TODO: can remove casts to any?
  forward(): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$("turtle.forward()") as any;
  }
  back(): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$("turtle.back()") as any;
  }
  up(): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$("turtle.back()") as any;
  }
  down(): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$("turtle.back()") as any;
  }
  turnLeft(): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$("turtle.back()") as any;
  }
  turnRight(): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$("turtle.back()") as any;
  }

  dig(tool?: "left" | "right"): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.dig(${tool ?? ""})`) as any;
  }
  digUp(tool?: "left" | "right"): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.digUp(${tool ?? ""})`) as any;
  }
  digDown(tool?: "left" | "right"): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.digDown(${tool ?? ""})`) as any;
  }

  place(text: string = ""): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.place(${text})`) as any;
  }
  placeUp(text: string = ""): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.placeUp(${text})`) as any;
  }
  placeDown(text: string = ""): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.placeDown(${text})`) as any;
  }

  drop(count?: number): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.drop(${count ?? ""})`) as any;
  }
  dropUp(count?: number): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.dropUp(${count ?? ""})`) as any;
  }
  dropDown(count?: number): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.dropDown(${count ?? ""})`) as any;
  }

  async detect(): Promise<boolean> {
    return (await this.rconHandler.$(`turtle.detect()`))[0];
  }
  async detectUp(): Promise<boolean> {
    return (await this.rconHandler.$(`turtle.detectUp()`))[0];
  }
  async detectDown(): Promise<boolean> {
    return (await this.rconHandler.$(`turtle.detectDown()`))[0];
  }

  async compare(): Promise<boolean> {
    return (await this.rconHandler.$(`turtle.compare()`))[0];
  }
  async compareUp(): Promise<boolean> {
    return (await this.rconHandler.$(`turtle.compareUp()`))[0];
  }
  async compareDown(): Promise<boolean> {
    return (await this.rconHandler.$(`turtle.compareDown()`))[0];
  }

  attack(tool?: "left" | "right"): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.attack(${tool ?? ""})`) as any;
  }
  attackUp(tool?: "left" | "right"): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.attackUp(${tool ?? ""})`) as any;
  }
  attackDown(tool?: "left" | "right"): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.attackDown(${tool ?? ""})`) as any;
  }

  suck(count?: number): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.suck(${count ?? ""})`) as any;
  }
  suckUp(count?: number): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.suckUp(${count ?? ""})`) as any;
  }
  suckDown(count?: number): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.suckDown(${count ?? ""})`) as any;
  }

  inspect(): Promise<BlockInfoSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.inspect()`) as any;
  }
  inspectUp(): Promise<BlockInfoSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.inspectUp()`) as any;
  }
  inspectDown(): Promise<BlockInfoSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.inspectDown()`) as any;
  }

  async getFuelLevel(): Promise<number> {
    let fuel = (await this.rconHandler.$(`turtle.getFuelLevel()`))[0];
    if (fuel === "unlimited") return Infinity;
    return fuel;
  }
  async getFuelLimit(): Promise<number> {
    return (await this.rconHandler.$(`turtle.getFuelLimit()`))[0];
  }
  refuel(): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.refuel()`) as any;
  }

  async select(slot: SlotIndex): Promise<true> {
    return (await this.rconHandler.$(`turtle.select(${slot})`))[0];
  }
  async getSelectedSlot(): Promise<number> {
    return (await this.rconHandler.$(`turtle.getSelectedSlot()`))[0];
  }

  async getItemCount(slot?: SlotIndex): Promise<number> {
    return (await this.rconHandler.$(`turtle.getItemCount(${slot ?? ""})`))[0];
  }
  async getItemSpace(slot?: SlotIndex): Promise<number> {
    return (await this.rconHandler.$(`turtle.getItemSpace(${slot ?? ""})`))[0];
  }
  async getItemDetail(
    slot?: SlotIndex,
    detailed: boolean = false
  ): Promise<ItemInfo> {
    return (
      await this.rconHandler.$(
        `turtle.getItemSpace(${slot ?? ""}${detailed ? "" : ", true"})`
      )
    )[0];
  }

  async compareTo(slot: SlotIndex): Promise<boolean> {
    return (await this.rconHandler.$(`turtle.compareTo()`))[0];
  }

  transferTo(
    slot: SlotIndex,
    count?: number
  ): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(
      `turtle.transferTo(${slot}${count !== undefined ? ", " + count : ""})`
    ) as any;
  }

  equipLeft(): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.equipLeft()`) as any;
  }
  equipRight(): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.equipRight()`) as any;
  }

  craft(limit?: number): Promise<ActionSuccess | ActionFailure> {
    return this.rconHandler.$(`turtle.craft(${limit ?? ""})`) as any;
  }

  gpsLocate(): Promise<[number, number, number] | []> {
    return this.rconHandler.$(`gps.locate()`) as any;
  }

  $(command: string): Promise<any[]> {
    return this.rconHandler.dispatchCommand(command)
  }
}

export type ActionSuccess = [success: true];
export type ActionFailure = [success: false, reason: string];

export type BlockInfoSuccess = [success: true, info: BlockInfo];

// TODO: find better typings for these
export type ItemInfo = any;
export type BlockInfo = any;

export type SlotIndex =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16;
