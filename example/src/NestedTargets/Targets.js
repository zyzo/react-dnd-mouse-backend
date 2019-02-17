import React from 'react'
import Target from './Target'

const Targets = React.createClass({

  render() {
    const { moveBox, isOccupied, } = this.props
    const targets = [{
      left: 60, top: 60, size: 180, id: '2'
    }, {
      left: 30, top: 30, size: 240, id: '1'
    }, {
      left: 90, top: 90, size: 120, id: '3'
    },  {
      left: 120, top: 120, size: 60, id: '4'
    }, {
      left: 170, top: 40, size: 80, id: '5'
    },]

    return (
      <div>
        {targets.map(target => {
          return (
            <Target
              moveBox={moveBox} key={target.id}
              {...target}
              isOccupied={() => isOccupied(target.id)}
            />
          )
        })}
      </div>
    )
  }
})

export default Targets
