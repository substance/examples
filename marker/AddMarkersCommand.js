import { Command } from 'substance'

const words = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet']

class AddMarkers extends Command {
  getCommandState(params) {
    const sel = params.selection
    if (sel.surfaceId !== 'body') {
      return {
        disabled: true
      }
    }
  }
  execute(params) {
    const surface = params.surface
    if (!surface || !surface.isContainerEditor()) return true
    return this._createMarkers(surface)
  }

  _createMarkers(surface) {
    const word = words[0]
    const nodes = surface.getContainer().getNodes()
    let markers = []
    nodes.forEach(function(node) {
      if (!node.isText()) return
      const text = node.getText()
      const path = node.getTextPath()
      const indices = find(word, text, false)
      markers = markers.concat(indices.map(function(pos) {
        return {
          path: path,
          pos: pos
        }
      }))
    })
    console.log('Add Markers!', markers)
    return true
  }
}

function find(pattern, str, caseSensitive) {
  var len = pattern.length;
  if (len === 0) return []
  var startIndex = 0, index, indices = [];
  if (!caseSensitive) {
    str = str.toLowerCase();
    pattern = pattern.toLowerCase();
  }
  while ((index = str.indexOf(pattern, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + len;
  }
  return indices;
}

export default AddMarkers
