import React, { PropTypes } from 'react'
import update from 'react/lib/update'
import ItemTypes from '../ItemTypes'
import Source from './Source'
import { DropTarget } from 'react-dnd'

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

const Target = React.createClass({
  getInitialState() {
    return {
      circles: {
        'a': { top: 20, left: 80 },
        'b': { top: 180, left: 20 },
        'c': { top: 130, left: 250 }
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
    const { circles } = this.state

    return connectDropTarget(
      <div style={styles}>
        <svg style={{width:'100%', height:'100%'}}>
        {Object.keys(circles).map(key => {
          const { left, top } = circles[key]
          return (
            <Source key={key}
                 id={key}
                 left={left}
                 top={top}
                 hideSourceOnDrag={hideSourceOnDrag} />
          )
        })}
        </svg>
      </div>
    )
  }
})

Target.propTypes = {
  hideSourceOnDrag: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired
}

export default DropTarget(ItemTypes.CSV, boxTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(Target)
