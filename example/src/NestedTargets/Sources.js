import React from 'react'
import Source from './Source'

const Sources = React.createClass({

  render() {
    const { hideSourceOnDrag, boxes } = this.props

    return (
      <div>
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

export default Sources
