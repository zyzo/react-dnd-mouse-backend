/* eslint-disable max-len */
import React from 'react'
import update from 'react/lib/update'

import Sources from './Sources'
import Targets from './Targets'

const DragAroundNaive = React.createClass({
  getInitialState() {
    return {
      boxes: {
        'a': { top: 50, left: 140, title: '0' },
        'b': { top: 180, left: 20, title: '0' },
        'c': { top: 90, left: 40, title: '0' },
        'd': { top: 230, left: 160, title: '0' },
        'e': { top: 140, left: 150, title: '0' }
      },
      hideSourceOnDrag: true
    }
  },

  moveBox(id, left, top, title) {
    this.setState(update(this.state, {
      boxes: {
        [id]: {
          $merge: {
            left: left,
            top: top,
            title: title
          }
        }
      }
    }))
  },

  isOccupied(id) {
    return Object.values(this.state.boxes).filter(box => box.title === id).length >= 1
  },

  handleHideSourceClick() {
    this.setState({
      hideSourceOnDrag: !this.state.hideSourceOnDrag
    })
  },

  render() {
    const { hideSourceOnDrag, boxes } = this.state

    return (
      <div><div style={{
        display: 'flex', flexDirection: 'column', flex: 1,
      }}>
        <h3>Multiple Drop Targets</h3>
        <div style={{ position: 'relative', width: '300px',
          height: '300px', border: '1px solid black' }}>
          <Sources hideSourceOnDrag={hideSourceOnDrag} boxes={boxes} />
          <Targets moveBox={this.moveBox} isOccupied={this.isOccupied} />
        </div>
        <p>
          <label>
            <input type="checkbox"
                   checked={hideSourceOnDrag}
                   onChange={this.handleHideSourceClick} />
            <small>Hide source while dragging</small>
          </label>
        </p>
      </div></div>
    )
  }
})

export default DragAroundNaive
