
export default class MouseBackend {
  constructor(manager) {
    this.actions = manager.getActions()
    this.monitor = manager.getMonitor()
    this.registry = manager.getRegistry()

    this.sourceNodes = {}
    this.sourceNodesOptions = {}
    this.sourcePreviewNodes = {}
    this.sourcePreviewNodesOptions = {}

    this.handleMoveStart = this.handleMoveStart.bind(this)

  }

  setup() {
    if (typeof window === 'undefined') {
      return
    }

    if (this.constructor.isSetUp) {
      throw new Error('Cannot have two DnD Mouse backend at the same time')
    }

    this.constructor.isSetUp = true
    this.addEventListeners(window)
  }

  teardown() {
    if (typeof window === 'undefined') {
      return
    }

    this.constructor.isSetUp = false
    this.removeEventListeners(window)
  }

  connectDragSource(sourceId, node, options) {
    this.sourcesNodes[sourceId] = node
    this.sourceNodeOptions[sourceId] = options

    const handleMoveStart =
      () => this.handleMoveStart(sourceId)

    node.addEventListener('onmousedown',
      () => this.handleMoveStart(sourceId))

    return () => {
      delete this.sourceNodes[sourceId]
      delete this.sourceNodeOptions[sourceId]
      node.removeEventListener('onmousedown', handleMoveStart)
    }
  }

  connectDragPreview(sourceId, node, options) {
    this.sourcePreviewNodeOptions[sourceId] = options
    this.sourcePreviewNodes[sourceId] = node

    return () => {
      delete this.sourcePreviewNodes[sourceId]
      delete this.sourcePreviewNodeOptions[sourceId]
    }
  }

  connectDropTarget(targetId, node) {
    this.targetNodes[targetId] = node

    return () => {
      delete this.targetNodes[targetId]
    }
  }

}
