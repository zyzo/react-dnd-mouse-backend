import React from 'react'
import { DragLayer } from 'react-dnd'

const defaultStyle = (item, currentOffset) => (
  {
    left: currentOffset.x,
    top: currentOffset.y,
    position: 'fixed'
  }
)

const DragPreview = React.createClass({
  render() {
    const {
      isDragging,
      currentOffset,
      item
    } = this.props
    return !isDragging || !currentOffset || !item.withDragPreview ?
      null
    :
      <svg style={defaultStyle(item, currentOffset)}>
        <circle cx={14} cy={14} r={12} fill={item.color} stroke="black"
          strokeWidth={2}/>
      </svg>

  }
})

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))(DragPreview)
