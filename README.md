# react-dnd-mouse-backend

[![npm version](https://badge.fury.io/js/react-dnd-mouse-backend.svg)](https://badge.fury.io/js/react-dnd-mouse-backend)

Mouse Backend for React Drag and Drop library http://gaearon.github.io/react-dnd

### Usage

```js
import { DragDropContext } from 'react-dnd'
import MouseBackEnd from 'react-dnd-mouse-backend'

const App = {...}

const AppContainer = DragDropContext(MouseBackEnd)(App)
```

### Playground

First, prepare the playground:

```sh
cd example;
yarn; yarn start
```

Then head to `http://localhost:3030/` to start some fun drag and dropping.


### Credits
Inspired by [HTML5 Backend](https://github.com/gaearon/react-dnd-html5-backend) & [Touch Backend](https://github.com/yahoo/react-dnd-touch-backend) to support only mouse events.
