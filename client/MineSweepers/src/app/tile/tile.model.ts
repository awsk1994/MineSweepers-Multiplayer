export enum TileState {
  UnTouched,
  Revealed,
  Flagged
}

export enum TileMsg{
  ClickedOnNumber,
  ClickedOnBomb,
  Flagged,
  UnFlagged,
  SpreadRevealed
}

export class Tile {
  constructor(
  public isBomb: boolean,
  public state: TileState,
  public value: number){};
}