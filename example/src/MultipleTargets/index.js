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
      }
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

  render() {
    const { boxes } = this.state

    return (
      <div><div style={{
        display: 'flex', flexDirection: 'column', flex: 1,
      }}>
        <h3>Multiple Drop Targets</h3>
        <div style={{ position: 'relative', width: '300px',
          height: '300px', border: '1px solid black' }}>
          <Sources hideSourceOnDrag={true} boxes={boxes} />
          <Targets moveBox={this.moveBox} isOccupied={this.isOccupied} />
        </div>
      </div></div>
    )
  }
})

export default DragAroundNaive
