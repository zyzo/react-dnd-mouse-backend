import React, { PropTypes } from 'react'
import ItemTypes from '../ItemTypes'
import { DragSource } from 'react-dnd'

const rand0To255 = () => Math.floor(Math.random() * 256)
const randomColor = () =>
  `rgb(${rand0To255()}, ${rand0To255()}, ${rand0To255()})`

const boxSource = {
  beginDrag(props) {
    const { id, left, top } = props
    return { id, left, top }
  }
}

const Source = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    hideSourceOnDrag: PropTypes.bool.isRequired,
    children: PropTypes.node
  },

  render() {
    const {
      hideSourceOnDrag, left, top, connectDragSource, isDragging
    } = this.props
    if (isDragging && hideSourceOnDrag) {
      return null
    }

    return connectDragSource(
        <circle cx={left} cy={top} r={12} fill={randomColor()} stroke="black"
          strokeWidth={2}/>
    )
  }
})

const connect = (connect, monitor) => (
  {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
)

export default DragSource(ItemTypes.CSV, boxSource, connect)(Source)
