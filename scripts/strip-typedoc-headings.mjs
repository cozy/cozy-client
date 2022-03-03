/**
 * Used to replace typedoc headings level 4/5 by emphasis text.
 * Otherwise, the headings are present in the right navigation and
 * this is too much.
 */

'use strict';

import { visit } from 'unist-util-visit'
import find from 'unist-util-find'

const typedocHeadingsToStrip = {
  'Defined in': true,
  'Parameters': true,
  'Returns': true,
  'Type declaration': true,
  'Inherited from': true,
  'Overrides': true
}

const isTypedocHeadingToStrip = (node) => {
  return node.type === 'heading' && node.children.length == 1 &&
    (node.depth == 4 || node.depth == 5) && typedocHeadingsToStrip[node.children[0].value] 
}

export default function (options) {
  const settings = options || {};

  function transform(node) {
    if (isTypedocHeadingToStrip(node)) {
      node.type = 'emphasis'
    }
    return node;
  }

  function getNode(tree, value) {
    if (typeof value === 'string') {
      return find(tree, {type: 'heading', children: [{value}]});
    }
    if (typeof value === 'number') {
      return tree.children[value];
    }
    return find(tree, value);
  }

  function transformer(tree) {
    visit(tree, n => {
      return transform(n);
    });
  }

  return transformer;
};
