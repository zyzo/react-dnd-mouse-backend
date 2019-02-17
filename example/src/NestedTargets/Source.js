import React, { PropTypes } from 'react'
import ItemTypes from '../ItemTypes'
import { DragSource } from 'react-dnd'

const style = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '4px',
  cursor: 'move',
  zIndex: 1,
  cursor: 'pointer',
  userSelect: 'none'
}

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
      hideSourceOnDrag, left, top, connectDragSource, isDragging, children
    } = this.props
    if (isDragging && hideSourceOnDrag) {
      return null
    }

    return connectDragSource(
      <div style={{ ...style, left, top }}>
        {children}
      </div>
    )
  }
})

export default DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Source)
