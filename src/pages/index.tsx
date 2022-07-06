import {useEffect, useRef, useState} from "react";
import PuzzleController from "@/components/PuzzleBox/lib/PuzzleController";
import {PuzzleBoxSourceData, PuzzleBoxSourceItemData} from "@/components/PuzzleBox/types";
import {PuzzleBox} from "@/components/PuzzleBox";

export default function HomePage() {

  const size = 400
  const grid = 3

  // 原始数据
  const [rawData, setRawData] = useState<number[][]>(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]
  )

  // 驱动数据
  const [powerData, setPowerData] = useState<PuzzleBoxSourceData[]>([])

  // 渲染数据
  const [renderData, setRenderData] = useState<PuzzleBoxSourceItemData[]>([])

  const puzzleController = useRef<PuzzleController>(
    new PuzzleController({
      size,
      grid
    })
  )

  const updateRenderData = ()=> {
    // 对数据进行重新计算

    // 不修改位置的情况下，修改数据
    const coData = puzzleController.current.getRenderData(
      powerData
    )

    if (renderData.length == 0) {
      setRenderData(
        [
          ...coData
        ]
      )
    } else {
      renderData.forEach(item=> {
        coData.forEach(cItem=> {
          if (item.id == cItem.id) {
            item.x = cItem.x
            item.y = cItem.y
            item.arrayParentIndex = cItem.arrayParentIndex
            item.arrayChildrenIndex = cItem.arrayChildrenIndex
          }
        })
      })
      setRenderData(
        [
          ...renderData
        ]
      )
    }

  }

  useEffect(()=> {
    updateRenderData()
  }, [powerData])

  useEffect(()=> {
    setPowerData(
      puzzleController.current.transformData(
        rawData
      )
    )
  }, [])

  return (
    <div>
      <h1>Puzzle Box</h1>
      <PuzzleBox
       size={size}
       renderData={renderData}
       source={powerData}
       grid={grid}
       onGameMove={(info)=> {
         // 移动逻辑
         try {
           const moveParent = powerData[info.arrayY]
           const targetParent = powerData[info.targetY]

           if (moveParent && targetParent) {
             const move = moveParent.children[info.arrayX]
             const target = targetParent.children[info.targetX]

             if (!target.isGhost) {
               return
             }

             if (move && target) {
               // 交换位置
               moveParent.children.splice(info.arrayX, 1, target)
               targetParent.children.splice(info.targetX, 1, move)

               setPowerData(
                 [...puzzleController.current.resizeCubeData(powerData)]
               )
             }
           }
         } catch (e) {
           // move error
         }
       }}
      />
    </div>
  );
}
