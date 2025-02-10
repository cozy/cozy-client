"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultSchema = exports.marks = exports.nodes = void 0;
// taken from a debug of @atlakit/editor/editor-core/create-editor/create-editor
// L139 (new Schema({nodes ,marks}))
// static because the @atlaskit code base requires a real navigator
// TODO: either find and exclude plugins requiring interaction
//       or running a JSDOM faking a navigator
var nodes = [['doc', {
  content: '(block)+',
  marks: 'link'
}], ['paragraph', {
  content: 'inline*',
  group: 'block',
  marks: 'strong code em link strike subsup textColor typeAheadQuery underline',
  parseDOM: [{
    tag: 'p'
  }]
}], ['text', {
  group: 'inline'
}], ['bulletList', {
  group: 'block',
  content: 'listItem+',
  parseDOM: [{
    tag: 'ul'
  }]
}], ['orderedList', {
  group: 'block',
  content: 'listItem+',
  parseDOM: [{
    tag: 'ol'
  }]
}], ['listItem', {
  content: '(paragraph ) (paragraph | bulletList | orderedList )*',
  defining: true,
  parseDOM: [{
    tag: 'li'
  }]
}], ['heading', {
  attrs: {
    level: {
      default: 1
    }
  },
  content: 'inline*',
  group: 'block',
  defining: true,
  parseDOM: [{
    tag: 'h1',
    attrs: {
      level: 1
    }
  }, {
    tag: 'h2',
    attrs: {
      level: 2
    }
  }, {
    tag: 'h3',
    attrs: {
      level: 3
    }
  }, {
    tag: 'h4',
    attrs: {
      level: 4
    }
  }, {
    tag: 'h5',
    attrs: {
      level: 5
    }
  }, {
    tag: 'h6',
    attrs: {
      level: 6
    }
  }]
}], ['blockquote', {
  content: 'paragraph+',
  group: 'block',
  defining: true,
  selectable: false,
  parseDOM: [{
    tag: 'blockquote'
  }]
}], ['rule', {
  group: 'block',
  parseDOM: [{
    tag: 'hr'
  }]
}], ['panel', {
  group: 'block',
  content: '(paragraph | heading | bulletList | orderedList)+',
  attrs: {
    panelType: {
      default: 'info'
    }
  },
  parseDOM: [{
    tag: 'div[data-panel-type]'
  }]
}], ['confluenceUnsupportedBlock', {
  group: 'block',
  attrs: {
    cxhtml: {
      default: null
    }
  },
  parseDOM: [{
    tag: 'div[data-node-type="confluenceUnsupportedBlock"]'
  }]
}], ['confluenceUnsupportedInline', {
  group: 'inline',
  inline: true,
  atom: true,
  attrs: {
    cxhtml: {
      default: null
    }
  },
  parseDOM: [{
    tag: 'div[data-node-type="confluenceUnsupportedInline"]'
  }]
}], ['unsupportedBlock', {
  inline: false,
  group: 'block',
  atom: true,
  selectable: true,
  attrs: {
    originalValue: {
      default: {}
    }
  },
  parseDOM: [{
    tag: '[data-node-type="unsupportedBlock"]'
  }]
}], ['unsupportedInline', {
  inline: true,
  group: 'inline',
  selectable: true,
  attrs: {
    originalValue: {
      default: {}
    }
  },
  parseDOM: [{
    tag: '[data-node-type="unsupportedInline"]'
  }]
}], ['hardBreak', {
  inline: true,
  group: 'inline',
  selectable: false,
  parseDOM: [{
    tag: 'br'
  }]
}], ['table', {
  content: 'tableRow+',
  attrs: {
    isNumberColumnEnabled: {
      default: false
    },
    layout: {
      default: 'default'
    },
    __autoSize: {
      default: false
    }
  },
  tableRole: 'table',
  isolating: true,
  selectable: false,
  group: 'block',
  parseDOM: [{
    tag: 'table'
  }]
}], ['tableHeader', {
  content: '(paragraph | panel | blockquote | orderedList | bulletList | rule | heading )+',
  attrs: {
    colspan: {
      default: 1
    },
    rowspan: {
      default: 1
    },
    colwidth: {
      default: null
    },
    background: {
      default: null
    }
  },
  tableRole: 'header_cell',
  isolating: true,
  marks: '',
  parseDOM: [{
    tag: 'th'
  }]
}], ['tableRow', {
  content: '(tableCell | tableHeader)+',
  tableRole: 'row',
  parseDOM: [{
    tag: 'tr'
  }]
}], ['tableCell', {
  content: '(paragraph | panel | blockquote | orderedList | bulletList | rule | heading | unsupportedBlock)+',
  attrs: {
    colspan: {
      default: 1
    },
    rowspan: {
      default: 1
    },
    colwidth: {
      default: null
    },
    background: {
      default: null
    }
  },
  tableRole: 'cell',
  marks: '',
  isolating: true,
  parseDOM: [{
    tag: '.ak-renderer-table-number-column',
    ignore: true
  }, {
    tag: 'td'
  }]
}]];
exports.nodes = nodes;
var marks = [['link', {
  excludes: 'color',
  group: 'link',
  attrs: {
    href: {},
    __confluenceMetadata: {
      default: null
    }
  },
  inclusive: false,
  parseDOM: [{
    tag: 'a[href]'
  }]
}], ['em', {
  inclusive: true,
  group: 'fontStyle',
  parseDOM: [{
    tag: 'i'
  }, {
    tag: 'em'
  }, {
    style: 'font-style=italic'
  }]
}], ['strong', {
  inclusive: true,
  group: 'fontStyle',
  parseDOM: [{
    tag: 'strong'
  }, {
    tag: 'b'
  }, {
    style: 'font-weight'
  }]
}], ['textColor', {
  attrs: {
    color: {}
  },
  inclusive: true,
  group: 'color',
  parseDOM: [{
    style: 'color'
  }]
}], ['strike', {
  inclusive: true,
  group: 'fontStyle',
  parseDOM: [{
    tag: 'strike'
  }, {
    tag: 's'
  }, {
    tag: 'del'
  }, {
    style: 'text-decoration'
  }]
}], ['subsup', {
  inclusive: true,
  group: 'fontStyle',
  attrs: {
    type: {
      default: 'sub'
    }
  },
  parseDOM: [{
    tag: 'sub',
    attrs: {
      type: 'sub'
    }
  }, {
    tag: 'sup',
    attrs: {
      type: 'sup'
    }
  }]
}], ['underline', {
  inclusive: true,
  group: 'fontStyle',
  parseDOM: [{
    tag: 'u'
  }, {
    style: 'text-decoration'
  }]
}], ['code', {
  excludes: 'fontStyle link searchQuery color',
  inclusive: true,
  parseDOM: [{
    tag: 'span.code',
    preserveWhitespace: true
  }, {
    tag: 'code',
    preserveWhitespace: true
  }, {
    tag: 'tt',
    preserveWhitespace: true
  }, {
    tag: 'span',
    preserveWhitespace: true
  }]
}], ['typeAheadQuery', {
  excludes: 'searchQuery',
  inclusive: true,
  group: 'searchQuery',
  parseDOM: [{
    tag: 'span[data-type-ahead-query]'
  }],
  attrs: {
    trigger: {
      default: ''
    }
  }
}]];
exports.marks = marks;

var getDefaultSchema = function getDefaultSchema() {
  return {
    nodes: nodes,
    marks: marks
  };
};

exports.getDefaultSchema = getDefaultSchema;