/* eslint-disable max-len */
import React from 'react'

import DragPreview from './DragPreview'
import Target from './Target'

const DragAroundCSV = React.createClass({

  render() {

    return (
      <div style={{ flex: 1 }}><div style={{ display: 'flex', flexDirection: 'column', }}>
        <h3>Custom Drag Preview</h3>
        <Target hideSourceOnDrag={true} />
        <DragPreview />
      </div></div>
    )
  }
})

export default DragAroundCSV
