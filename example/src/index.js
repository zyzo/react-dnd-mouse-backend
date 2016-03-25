import React from 'react'
import { render } from 'react-dom'

import Naive from './Naive'
import CSV from './CSV'

render(
  <div>
    <CSV />
  </div>,
  document.getElementById('root')
)
