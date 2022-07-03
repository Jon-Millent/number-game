
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

  label: string;
  color: string;
  isGhost: boolean;
}

export interface PuzzleBoxProps {

  // 拼图尺寸
  size: number;

  // 拼图数据
  source: PuzzleBoxSourceData[];

}

export interface PuzzleItemCardProps {
  source: PuzzleBoxSourceItemData;
}