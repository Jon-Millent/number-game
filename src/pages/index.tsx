import {useEffect, useRef, useState} from "react";
import PuzzleController from "@/components/PuzzleBox/lib/PuzzleController";
import {PuzzleBoxSourceData} from "@/components/PuzzleBox/types";
import {PuzzleBox} from "@/components/PuzzleBox";

export default function HomePage() {

  const size = 400
  const grid = 3

  const [powerData, setPowerData] = useState<PuzzleBoxSourceData[]>([])

  const puzzleController = useRef<PuzzleController>(
    new PuzzleController({
      size,
      grid
    })
  )

  useEffect(()=> {
    setPowerData(
      puzzleController.current.transformData(
        [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ]
      )
    )

  }, [])

  return (
    <div>
      <h1>Puzzle Box</h1>

      <PuzzleBox
       size={size}
       source={powerData}
       grid={grid}
      />
    </div>
  );
}
