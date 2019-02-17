import React from 'react'

import { DragDropContext } from 'react-dnd'
import MouseBackend from 'react-dnd-mouse-backend'
import { storiesOf } from '@storybook/react'
import CSV from '../src/CSV'
import NormalDiv from '../src/NormalDiv'
import MultipleTargets from '../src/MultipleTargets'
import WithDragPreview from '../src/WithDragPreview'
import NestedTargets from '../src/NestedTargets'

const withDnDContext = (Component) => {
  return DragDropContext(MouseBackend)(Component)
}

const CSVStory = withDnDContext(CSV)
const NormalDivStory = withDnDContext(NormalDiv)
const MultipleTargetsStory = withDnDContext(MultipleTargets)
const WithDragPreviewStory = withDnDContext(WithDragPreview)
const NestedTargetsStory = withDnDContext(NestedTargets)

storiesOf('Basic', module)
  .add('CSV', () => <CSVStory />)
  .add('Normal Div', () => <NormalDivStory />)

storiesOf('With Drag Preview', module)
  .add('Custom Drag Preview', () => <WithDragPreviewStory />)

storiesOf('Advanced', module)
  .add('Multiple Targets', () => <MultipleTargetsStory />)
  .add('Nested / Overlapping Targets', () => <NestedTargetsStory />)
