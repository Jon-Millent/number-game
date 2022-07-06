import './index.less'
import {
  GameMoveDirection,
  NumberPointBoxItemProps,
  NumberPointBoxProps,
  PuzzleBoxProps,
  PuzzleItemCardProps
} from "@/components/PuzzleBox/types";
import {useEffect, useState} from "react";
import {useDrag} from '@use-gesture/react'

export function PuzzleBox(props: PuzzleBoxProps) {

  // 数字指示器
  // 包含左边的 * size
  //    下边的 * size

  return (
    <div
      className={'puzzle-box'}
      style={{width: props.size + 'px', height: props.size + 'px'}}
    >
      {
        props.renderData.map(item => {
          return (
            <PuzzleItemCard
              source={item}
              key={item.id}
              onGameMove={(info)=> {
                props.onGameMove(info)
              }}
              x={item.arrayParentIndex}
              y={item.arrayChildrenIndex}
            />
          )
        })
      }
      {/*渲染数字指示器*/}

      <NumberPointBox
        size={props.size}
        source={props.source}
        grid={props.grid}
      />
    </div>
  )
}

function NumberPointItem(info: NumberPointBoxItemProps) {
  return (
    <div
      className={'number-point-item'}
      style={{
        width: info.size + 'px',
        height: info.size + 'px',
        left: info.x + 'px',
        top: info.y + 'px',
      }}
    >
      <span>{info.label}</span>
    </div>
  )
}

function NumberPointBox(props: NumberPointBoxProps) {

  const [rightPoint, setRightPoint] = useState<NumberPointBoxItemProps[]>([])
  const [bottomPoint, setBottomPoint] = useState<NumberPointBoxItemProps[]>([])

  // 每当source变化的时候，重新计算
  useEffect(()=> {
    if (props.source.length === props.grid) {
      const rightBox:NumberPointBoxItemProps[] = []
      const bottomBox:NumberPointBoxItemProps[] = []
      const ev = props.size / props.grid
      for (let index=0; index < props.grid; index++) {

        const rightLine = props.source[index].children.reduce(
          (val, item)=> val + item.value, 0
        )

        let bottomLine = 0
        for (let y=0; y<props.grid; y++) {
          bottomLine += props.source[y].children[index].value
        }

        rightBox.push({
          x: props.size,
          y: ev * index,
          size: ev,
          label: rightLine
        })

        bottomBox.push({
          y: props.size,
          x: ev * index,
          size: ev,
          label: bottomLine
        })

      }

      setRightPoint(rightBox)
      setBottomPoint(bottomBox)
    }
  }, [props.source])

  return (
    <>
      {
        rightPoint.map((item, index) => {
          return (
            <NumberPointItem
              key={index}
              {...item}
            />
          )
        })
      }

      {
        bottomPoint.map((item, index) => {
          return (
            <NumberPointItem
              key={index}
              {...item}
            />
          )
        })
      }
    </>
  )
}

export function PuzzleItemCard(props: PuzzleItemCardProps) {

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    // 触发滑动的条件
    /*
    * target != ghost
    * target 所滑动的方向有ghost
    * */
    if (!down) {

      const arrayX = props.source.arrayChildrenIndex
      const arrayY = props.source.arrayParentIndex

      let targetX = -1
      let targetY = -1

      let direction = GameMoveDirection.none

      const absX = Math.abs(mx)
      const absY = Math.abs(my)

      if (absY < absX) {
        // y > x 水平手势
        if (mx > 0) {
          direction = GameMoveDirection.right
        } else {
          // left
          direction = GameMoveDirection.left
        }
      } else {
        if (my > 0) {
          // top
          direction = GameMoveDirection.bottom
        } else {
          // bottom
          direction = GameMoveDirection.top
        }
      }

      // 并且找到目标
      switch (direction) {
        case GameMoveDirection.top:
          targetX = arrayX
          targetY = arrayY - 1
          break
        case GameMoveDirection.left:
          targetX = arrayX - 1
          targetY = arrayY
          break
        case GameMoveDirection.right:
          targetX = arrayX + 1
          targetY = arrayY
          break
        case GameMoveDirection.bottom:
          targetX = arrayX
          targetY = arrayY + 1
          break
      }

      props.onGameMove({
        arrayX,
        arrayY,
        targetX,
        targetY,
        direction
      })
    }
  })

  return (
    <div
      className={
        'puzzle-item-box ' + (props.source.isGhost ? 'ghost' : '')
      }
      data-x={props.source.arrayParentIndex}
      data-y={props.source.arrayChildrenIndex}
      style={{
        width: props.source.size + 'px',
        height: props.source.size + 'px',
        left: props.source.x + 'px',
        top: props.source.y + 'px',
        backgroundColor: props.source.color,
      }}
    >
      {
        <div className={'guest-full'} {...bind()}>
          <span>{props.source.value}</span>
        </div>
      }
    </div>
  )
}