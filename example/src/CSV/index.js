/* eslint-disable max-len */
import React from 'react'

import Target from './Target'

const DragAroundCSV = React.createClass({
  getInitialState() {
    return {
      hideSourceOnDrag: true
    }
  },

  handleHideSourceClick() {
    this.setState({
      hideSourceOnDrag: !this.state.hideSourceOnDrag
    })
  },

  render() {
    const { hideSourceOnDrag } = this.state

    return (
      <div>
        <Target hideSourceOnDrag={hideSourceOnDrag} />
        <p>
          <label>
            <input type="checkbox"
                   checked={hideSourceOnDrag}
                   onChange={this.handleHideSourceClick} />
            <small>Hide source while dragging</small>
          </label>
        </p>
      </div>
    )
  }
})

export default DragAroundCSV
