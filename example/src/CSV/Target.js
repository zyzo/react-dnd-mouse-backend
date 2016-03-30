import React, { Component, PropTypes } from 'react'
import update from 'react/lib/update'
import ItemTypes from '../ItemTypes'
import Source from './Source'
import { DropTarget, DragDropContext } from 'react-dnd'
import MouseBackend from 'react-dnd-mouse-backend'
import Touch from 'react-dnd-touch-backend'
import { connect} from 'react-redux'
const styles = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative'
}

const boxTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem()
    const delta = monitor.getDifferenceFromInitialOffset()
    const left = Math.round(item.left + delta.x)
    const top = Math.round(item.top + delta.y)

    component.moveBox(item.id, left, top)
  }
}

class Container extends Component {

  constructor(props) {
    super(props)
    this.state = {
      boxes: {
        'a': { top: 20, left: 80, title: 'Drag me around' },
        'b': { top: 180, left: 20, title: 'Drag me too' }
      }
    }
  }

  moveBox(id, left, top) {
    this.setState(update(this.state, {
      boxes: {
        [id]: {
          $merge: {
            left: left,
            top: top
          }
        }
      }
    }))
  }

  render() {
    const { hideSourceOnDrag, connectDropTarget } = this.props
    const { boxes} = this.state

    return connectDropTarget(
      <div style={styles}>
        <div style={{height: '50%'}}>
        <svg><Source left={12} top={13}>adz</Source></svg>
        </div>
        <div style={{height: '50%'}}>
        <svg style={{width:'100%', height:'100%'}}>
        {Object.keys(boxes).map(key => {
          const { left, top, title } = boxes[key]
          return (
            <Source key={key}
                 id={key}
                 left={left}
                 top={top}
                 hideSourceOnDrag={hideSourceOnDrag}>
              {title}
            </Source>
          )
        })}
        </svg>
        </div>
      </div>
    )
  }
}

Container.propTypes = {
  hideSourceOnDrag: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired
}

export default connect()(DragDropContext(MouseBackend)(
DropTarget(ItemTypes.CSV, boxTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(Container)))
