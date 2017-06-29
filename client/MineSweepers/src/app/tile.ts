export enum TileState {
  UnTouched,
  Numbered,
  Flagged,
  Bombed
}

export enum Bomb {
  NotExist,
  Exist
}

export class Tile {
  constructor(
  public bomb: Bomb,
  public state: TileState,
  public value: number){};
}
