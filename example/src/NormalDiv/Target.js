import React, { PropTypes } from 'react'
import update from 'react/lib/update'
import ItemTypes from '../ItemTypes'
import Source from './Source'
import { DropTarget } from 'react-dnd'

const styles = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative',
  flex: 1
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

const Target = React.createClass({

  getInitialState() {
    return {
      boxes: {
        'a': { top: 20, left: 80, title: 'Drag me around' },
        'b': { top: 180, left: 20, title: 'Drag me too' }
      }
    }
  },

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
  },

  render() {
    const { hideSourceOnDrag, connectDropTarget } = this.props
    const { boxes} = this.state

    return connectDropTarget(
      <div style={styles}>
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
      </div>
    )
  }
})

Target.propTypes = {
  hideSourceOnDrag: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired
}

export default DropTarget(ItemTypes.BOX, boxTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))(Target)
