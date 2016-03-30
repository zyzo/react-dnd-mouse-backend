import React, { Component, PropTypes } from 'react'
import ItemTypes from '../ItemTypes'
import { DragSource } from 'react-dnd'
import { connect} from 'react-redux'
const style = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
}

const boxSource = {
  beginDrag(props) {
    const { id, left, top } = props
    return { id, left, top }
  }
}

class Source extends Component {

  render() {
    const {
      hideSourceOnDrag, left, top, connectDragSource, isDragging, children
    } = this.props
    if (isDragging && hideSourceOnDrag) {
      return null
    }

    return connectDragSource(
        <circle cx={left} cy={top} r={12} fill="black"/>
    )
  }
}

Source.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  hideSourceOnDrag: PropTypes.bool.isRequired,
  children: PropTypes.node
}

export default DragSource(ItemTypes.CSV, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(connect()(Source))
