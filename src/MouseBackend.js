import { createNativeDragSource, matchNativeItemType } from './NativeDragSources'

function getEventClientOffset (e) {
  return {
    x: e.clientX,
    y: e.clientY
  }
}

const ELEMENT_NODE = 1
function getNodeClientOffset (node) {
  const el = node.nodeType === ELEMENT_NODE
    ? node
    : node.parentElement

  if (!el) {
    return null
  }

  const { top, left } = el.getBoundingClientRect()
  return { x: left, y: top }
}

function isRightClick (e) {
  if ('which' in e) {
    return e.which === 3
  } else if ('button' in e) {
    return e.button === 2
  }
  return false
}

export default class MouseBackend {
  constructor(manager) {
    this.actions = manager.getActions()
    this.monitor = manager.getMonitor()
    this.registry = manager.getRegistry()

    this.sourceNodes = {}
    this.sourceNodesOptions = {}
    this.sourcePreviewNodes = {}
    this.sourcePreviewNodesOptions = {}
    this.targetNodes = {}
    this.targetNodeOptions = {}
    this.mouseClientOffset = {}
    this.currentNativeSource = null;
    this.currentNativeHandle = null;

    this.getSourceClientOffset = this.getSourceClientOffset.bind(this)

    this.handleWindowMoveStart =
      this.handleWindowMoveStart.bind(this)
    this.handleWindowMoveStartCapture =
      this.handleWindowMoveStartCapture.bind(this)
    this.handleWindowMoveCapture =
      this.handleWindowMoveCapture.bind(this)
    this.handleWindowMoveEndCapture =
      this.handleWindowMoveEndCapture.bind(this)
    this.handleWindowClick =
      this.handleWindowClick.bind(this)
    this.handleWindowDragstart =
      this.handleWindowDragstart.bind(this)
    this.handleWindowNativeDrag =
      this.handleWindowNativeDrag.bind(this)
    this.handleWindowNativeEndDrag =
      this.handleWindowNativeEndDrag.bind(this)
  }

  setup() {
    if (typeof window === 'undefined') {
      return
    }

    if (this.constructor.isSetUp) {
      throw new Error('Cannot have two DnD Mouse backend at the same time')
    }

    this.constructor.isSetUp = true
    window.addEventListener('mousedown',
      this.handleWindowMoveStartCapture, true)
    window.addEventListener('mousedown',
      this.handleWindowMoveStart)
    window.addEventListener('mousemove',
      this.handleWindowMoveCapture, true)
    window.addEventListener('mouseup',
      this.handleWindowMoveEndCapture, true)
    window.addEventListener('click',
      this.handleWindowClick, true)
    window.addEventListener('dragstart',
      this.handleWindowDragstart, true)
    window.addEventListener('dragover',
      this.handleWindowNativeDrag, true)
    window.addEventListener('dragleave',
      this.handleWindowNativeEndDrag, true)
    window.addEventListener('drop',
      this.handleWindowNativeEndDrag, true)
  }

  getSourceClientOffset (sourceId) {
    return getNodeClientOffset(this.sourceNodes[sourceId])
  }

  teardown() {
    if (typeof window === 'undefined') {
      return
    }

    this.constructor.isSetUp = false

    this.mouseClientOffset = {}
    window.removeEventListener(
      'mousedown', this.handleWindowMoveStartCapture, true)
    window.removeEventListener(
      'mousedown', this.handleWindowMoveStart)
    window.removeEventListener(
      'mousemove', this.handleWindowMoveCapture, true)
    window.removeEventListener(
      'mouseup', this.handleWindowMoveEndCapture, true)
    window.removeEventListener(
      'click', this.handleWindowClick, true)
    window.removeEventListener(
      'dragstart', this.handleWindowDragstart, true)
    window.removeEventListener(
      'dragover', this.handleWindowNativeDrag, true)
    window.removeEventListener(
      'dragleave', this.handleWindowNativeEndDrag, true)
    window.removeEventListener(
      'drop', this.handleWindowNativeEndDrag, true)
  }

  connectDragSource(sourceId, node) {
    this.sourceNodes[sourceId] = node

    const handleMoveStart =
      this.handleMoveStart.bind(this, sourceId)
    node.addEventListener('mousedown',
      handleMoveStart)

    return () => {
      delete this.sourceNodes[sourceId]
      node.removeEventListener('mousedown', handleMoveStart)
    }
  }

  connectDragPreview(sourceId, node, options) {
    this.sourcePreviewNodesOptions[sourceId] = options
    this.sourcePreviewNodes[sourceId] = node

    return () => {
      delete this.sourcePreviewNodes[sourceId]
      delete this.sourcePreviewNodesOptions[sourceId]
    }
  }

  connectDropTarget(targetId, node) {
    this.targetNodes[targetId] = node

    return () => {
      delete this.targetNodes[targetId]
    }
  }

  handleWindowMoveStartCapture() {
    this.moveStartSourceIds = []
  }

  handleMoveStart (sourceId, e) {
    // Ignore right mouse button.
    if (isRightClick(e)) return
    this.moveStartSourceIds.unshift(sourceId)
  }

  handleWindowMoveStart(e) {
    const clientOffset = getEventClientOffset(e)
    if (clientOffset) {
      this.mouseClientOffset = clientOffset
    }
  }

  handleWindowMoveCapture (e) {
    const { moveStartSourceIds } = this
    const clientOffset = getEventClientOffset(e)
    if (!clientOffset)
      return
    if (!this.monitor.isDragging()
      && this.mouseClientOffset.hasOwnProperty('x') && moveStartSourceIds &&
    (
      this.mouseClientOffset.x !== clientOffset.x ||
      this.mouseClientOffset.y !== clientOffset.y
    )) {
      this.moveStartSourceIds = null
      this.actions.beginDrag(moveStartSourceIds, {
        clientOffset: this.mouseClientOffset,
        getSourceClientOffset: this.getSourceClientOffset,
        publishSource: false
      })
    }
    if (!this.monitor.isDragging()) {
      return
    }

    const sourceNode = this.sourceNodes[this.monitor.getSourceId()]
    this.installSourceNodeRemovalObserver(sourceNode)

    this.actions.publishDragSource()

    e.preventDefault()

    const matchingTargetIds = this.getMatchingTargetIds(clientOffset)

    this.actions.hover(matchingTargetIds, {
      clientOffset
    })
  }

  getMatchingTargetIds(clientOffset) {
    return Object.keys(this.targetNodes)
      .filter((targetId) =>
      {
        const boundingRect =
          this.targetNodes[targetId].getBoundingClientRect()
        return clientOffset.x >= boundingRect.left &&
          clientOffset.x <= boundingRect.right &&
          clientOffset.y >= boundingRect.top &&
          clientOffset.y <= boundingRect.bottom
      })
  }

  handleWindowMoveEndCapture (e) {
    if (!this.monitor.isDragging() || this.monitor.didDrop()) {
      this.moveStartSourceIds = null
      return
    }
    this.preventClick = true

    e.preventDefault()

    this.mouseClientOffset = {}

    this.uninstallSourceNodeRemovalObserver()
    this.actions.drop()
    this.actions.endDrag()
  }

  handleWindowClick(e) {
    if (this.preventClick) e.stopPropagation()
    this.preventClick = false
  }

  // Disable drag on images (Firefox)
  handleWindowDragstart(e) {
    e.preventDefault()
  }

  installSourceNodeRemovalObserver (node) {
    this.uninstallSourceNodeRemovalObserver()

    this.draggedSourceNode = node
    this.draggedSourceNodeRemovalObserver = new window.MutationObserver(() => {
      if (!node.parentElement) {
        this.resurrectSourceNode()
        this.uninstallSourceNodeRemovalObserver()
      }
    })

    if (!node || !node.parentElement) {
      return
    }

    this.draggedSourceNodeRemovalObserver.observe(
      node.parentElement,
      { childList: true }
    )
  }

  resurrectSourceNode () {
    this.draggedSourceNode.style.display = 'none'
    this.draggedSourceNode.removeAttribute('data-reactid')
    document.body.appendChild(this.draggedSourceNode)
  }

  uninstallSourceNodeRemovalObserver () {
    if (this.draggedSourceNodeRemovalObserver) {
      this.draggedSourceNodeRemovalObserver.disconnect()
    }

    this.draggedSourceNodeRemovalObserver = null
    this.draggedSourceNode = null
  }

  handleWindowNativeDrag(e) {
    const nativeType = matchNativeItemType(e.dataTransfer)
    if (!nativeType) {
      return
    }

    if (!this.monitor.isDragging()) {
      const SourceType = createNativeDragSource(nativeType)
      this.currentNativeSource = new SourceType()
      this.currentNativeHandle = this.registry.addSource(
        nativeType,
        this.currentNativeSource
      )

      this.actions.beginDrag([this.currentNativeHandle])
    }

    const clientOffset = getEventClientOffset(e)
    this.actions.publishDragSource()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy';

    const matchingTargetIds = this.getMatchingTargetIds(clientOffset)
    this.actions.hover(matchingTargetIds, {
      clientOffset
    })
  }

  handleWindowNativeEndDrag(e) {
    const nativeType = matchNativeItemType(e.dataTransfer)
    if (!nativeType) {
      return null
    }

    if (e.type !== 'drop' && e.relatedTarget !== null) {
      return
    }

    if (e.type == 'drop') {
      e.preventDefault()
      this.currentNativeSource.mutateItemByReadingDataTransfer(e.dataTransfer)
      this.actions.drop()
    }

    this.actions.endDrag()
    this.registry.removeSource(this.currentNativeHandle)

    this.currentNativeSource = null
    this.currentNativeHandle = null
  }
}
