export interface PuzzleBoxSourceData {
  id: string;
  x: number;
  y: 0;
  height: number;
  children: PuzzleBoxSourceItemData[];
}

export interface PuzzleBoxSourceItemData {
  id: string;
  x: number;
  y: number;
  size: number;

  value: number;
  color: string;
  isGhost: boolean;

  arrayParentIndex: number;
  arrayChildrenIndex: number;
}

export interface PuzzleBoxProps {
  // 拼图尺寸
  size: number;

  // 拼图数据
  source: PuzzleBoxSourceData[];

  grid: number;

  onGameMove: (props: OnGameMoveProps)=> void;

  renderData: PuzzleBoxSourceItemData[];
}

export interface PuzzleItemCardProps {
  source: PuzzleBoxSourceItemData;

  onGameMove: (props: OnGameMoveProps)=> void;

  x: number;
  y: number;
}


export interface NumberPointBoxProps {
  grid: number;

  size: number;

  source: PuzzleBoxSourceData[];
}

export interface NumberPointBoxItemProps {
  x: number;
  y: number;
  label: number;
  size: number;
}

export enum GameMoveDirection {
  top,
  right,
  bottom,
  left,
  none
}

export interface OnGameMoveProps {
  direction: GameMoveDirection;
  arrayX: number;
  arrayY: number;

  targetX: number;
  targetY: number;
}