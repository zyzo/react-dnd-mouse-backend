import React, { PropTypes } from 'react'
import ItemTypes from '../ItemTypes'
import { DropTarget } from 'react-dnd'

const styles = {
  position: 'absolute',
  border: '1px solid #ccc',
  flex: 1
}

const boxTarget = {
  drop(props, monitor, component) {
    console.log(monitor.didDrop())
    if (monitor.didDrop()) return
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
    const { connectDropTarget, left, top, id, size } = this.props

    return connectDropTarget(
      <div style={{ ...styles, left, top, width: size, height: size }}>
        {id}
      </div>
    )
  }
})

Target.propTypes = {
  connectDropTarget: PropTypes.func.isRequired
}

export default DropTarget(ItemTypes.BOX, boxTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))(Target)
