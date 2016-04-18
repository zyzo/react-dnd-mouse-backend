import React from 'react'
import { DragDropContext } from 'react-dnd'
import MouseBackend from 'react-dnd-mouse-backend'
import CSV from './CSV'
import NormalDiv from './NormalDiv'

const App = React.createClass({
  render() {
    return (
      <div>
        <h3>CSV Elements</h3>
        <CSV/>
        <h3>Normal Div</h3>
        <NormalDiv/>
      </div>
    )
  }
})

export default DragDropContext(MouseBackend)(App)
