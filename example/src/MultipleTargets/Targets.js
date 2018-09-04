import React from 'react'
import Target from './Target'

const Targets = React.createClass({

  render() {
    const { moveBox, isOccupied, } = this.props
    const targets = [{
      left: 10, top: 10, id: '1'
    }, {
      left: 10, top: 205, id: '2'
    }, {
      left: 205, top: 205, id: '3'
    }, {
      left: 205, top: 10, id: '4'
    }]

    return (
      <div>
        {targets.map(target => {
          return (
            <Target
              moveBox={moveBox} key={target.id} left={target.left} top={target.top}
              id={target.id}
              isOccupied={() => isOccupied(target.id)}
            />
          )
        })}
      </div>
    )
  }
})

export default Targets
