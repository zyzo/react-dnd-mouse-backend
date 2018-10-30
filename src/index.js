import MouseBackend from './MouseBackend'
import { NativeTypes } from './NativeDragSources'

const createMouseBackend = (manager) => new MouseBackend(manager)

export default createMouseBackend

export { NativeTypes }
