import './index.less'
import {
  NumberPointBoxItemProps,
  NumberPointBoxProps,
  PuzzleBoxProps,
  PuzzleItemCardProps
} from "@/components/PuzzleBox/types";
import {useEffect, useState} from "react";
import { useDrag } from '@use-gesture/react'

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
        props.source.map(item=> {
          return item.children.map(item2 => {
            return (
              <PuzzleItemCard source={item2} key={item2.id} />
            )
          })
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

        console.log(index, props.source, '========')

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

    // 拖动结束后
    // 判断滑动方向
    // left
    // top
    // right
    // bottom

    if (!down) {

    }

    console.log(
      {
        down,
        mx,
        my
      }
    )

  })

  return (
    <div
      className={
        'puzzle-item-box ' + (props.source.isGhost ? 'ghost' : '')
      }
      style={{
        width: props.source.size + 'px',
        height: props.source.size + 'px',
        left: props.source.x + 'px',
        top: props.source.y + 'px',
        backgroundColor: props.source.color,
      }}
    >
      {
        props.source.isGhost ? (
          <div className={'ghost-full'} {...bind()}>
            <span>{props.source.value}</span>
          </div>
        ) : (
          <span>{props.source.value}</span>
        )
      }
    </div>
  )
}