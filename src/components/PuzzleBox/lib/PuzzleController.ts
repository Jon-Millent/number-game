// to power puzzle
import { nanoid } from 'nanoid'
import {PuzzleBoxSourceData} from "@/components/PuzzleBox/types";
// @ts-ignore
import randomColor from 'randomcolor'

interface PuzzleControllerProps {
  size: number;
  grid: number;
}

export default class PuzzleController {
  private props: PuzzleControllerProps;

  constructor(props: PuzzleControllerProps) {
    this.props = props
  }

  transformData(data: number[][]): PuzzleBoxSourceData[] {
    // feed data
    const feedData: PuzzleBoxSourceData[] = []

    try {
      if (data.length != data[0].length) {
        return []
      }
    } catch (e) {
      throw new Error('传入了不规范的数据')
    }

    const xCount = data.length
    const size = this.props.size / xCount

    data.forEach((item, index) => {

      const itemData: PuzzleBoxSourceData = {
        id: nanoid(),
        x: index * size,
        y: 0,
        height: size,
        children: []
      }

      item.forEach((item2, index2) => {
        itemData.children.push({
          id: nanoid(),
          value: item2,
          size,
          x: index2 * size,
          y: index * size,
          color: randomColor({
            luminosity: 'light',
            format: 'rgb' // e.g. 'rgba(9, 1, 107, 0.6482447960879654)'
          }),
          isGhost: item2 == Math.pow(this.props.grid, 2)
        })
      })

      feedData.push(itemData)
    })

    return feedData
  }
}