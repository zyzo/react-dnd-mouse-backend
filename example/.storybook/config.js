import { withOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';

addDecorator(
  withOptions({
    name: 'Mouse Backend for react-dnd',
    showAddonPanel: false,
  })
)
// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
