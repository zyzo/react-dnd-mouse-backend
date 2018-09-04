import React, { PropTypes } from 'react'
import ItemTypes from '../ItemTypes'
import { DropTarget } from 'react-dnd'

const styles = {
  position: 'absolute',
  width: 80,
  height: 80,
  border: '1px solid #ccc',
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
  moveBox(id, left, top) {
    if (this.props.isOccupied()) {
      alert('This box is occupied !')
      return
    }
    this.props.moveBox(id, left, top, this.props.id)
  },
  render() {
    const { connectDropTarget, left, top } = this.props

    return connectDropTarget(
      <div style={{ ...styles, left, top }}>

      </div>
    )
  }
})

Target.propTypes = {
  connectDropTarget: PropTypes.func.isRequired
}

export default DropTarget(ItemTypes.BOX, boxTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(Target)
