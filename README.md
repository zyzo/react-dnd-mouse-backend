# react-dnd-mouse-backend

<img width="1280" alt="capture d ecran 2018-09-11 a 22 08 09" src="https://user-images.githubusercontent.com/6483446/45384770-3b45e080-b60f-11e8-973c-ee112d8a4129.png">

[![npm version](https://badge.fury.io/js/react-dnd-mouse-backend.svg)](https://badge.fury.io/js/react-dnd-mouse-backend)

Mouse Backend for React Drag and Drop library http://gaearon.github.io/react-dnd

- [Usage](#Usage)
- [Playground](#Playground)
- [Development](#Development)
- [Credits](#Credits)

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

### Development

First, install the project locally:

```sh
git clone git@github.com:zyzo/react-dnd-mouse-backend.git
cd react-dnd-mouse-backend; npm install
# (Optional) prepare example project
cd example; npm install
```

Then, link react-dnd-mouse-backend to example project (or your js project):
```sh
# in ./react-dnd-mouse-backend
npm link
cd example; npm link react-dnd-mouse-backend
```

Finally you can begin to make changes in `src` folder, and rebuild the lib:

```sh
npm run build
```


### Credits
Inspired by [HTML5 Backend](https://github.com/gaearon/react-dnd-html5-backend) & [Touch Backend](https://github.com/yahoo/react-dnd-touch-backend) to support only mouse events, which work much better in some cases, like svg.
