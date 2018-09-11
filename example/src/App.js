import React from 'react'
import { DragDropContext } from 'react-dnd'
import MouseBackend from 'react-dnd-mouse-backend'
import CSV from './CSV'
import NormalDiv from './NormalDiv'
import MultipleTargets from './MultipleTargets'
import WithDragPreview from './WithDragPreview'

const App = React.createClass({
  render() {
    return (
      <div style={{ display: 'flex', height: '50vh', justifyContent: 'space-between' }}>
        <CSV/>
        <NormalDiv/>
        <MultipleTargets />
        <WithDragPreview />
      </div>
    )
  }
})

export default DragDropContext(MouseBackend)(App)
