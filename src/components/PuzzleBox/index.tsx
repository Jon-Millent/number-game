import './index.less'
import {PuzzleBoxProps, PuzzleItemCardProps} from "@/components/PuzzleBox/types";

export function PuzzleBox(props: PuzzleBoxProps) {
  return (
    <div
      className={'puzzle-box'}
      style={{width: props.size + 'px', height: props.size + 'px'}}
    >
      {
        props.source.map(item=> {
          return item.children.map(item2 => {
            console.log(item2, 'item22222')
            return (
              <PuzzleItemCard source={item2} key={item2.id} />
            )
          })
        })
      }
    </div>
  )
}

export function PuzzleItemCard(props: PuzzleItemCardProps) {
  return (
    <div
      className={
        'puzzle-item-box'
      }
      style={{
        width: props.source.size + 'px',
        height: props.source.size + 'px',
        left: props.source.x + 'px',
        top: props.source.y + 'px',
        backgroundColor: props.source.color,
        display: `${props.source.isGhost ? 'none' : 'flex'}`
      }}
    >
      <span>{props.source.label}</span>
    </div>
  )
}