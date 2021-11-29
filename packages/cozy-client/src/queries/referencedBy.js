import { IOCozyFile, Doctype, Reference } from '../types'

/**
 * Checks if the file is referenced by a specific doctype
 *
 * @param {IOCozyFile} file - io.cozy.files document
 * @param {Doctype} referencedBy - Doctype where document is referenced
 * @returns {boolean} If a reference is found
 */
export const isReferencedBy = (file, referencedBy) => {
  const references =
    file?.relationships?.referenced_by?.data || file?.referenced_by || []

  return !!references.find(reference => reference.type === referencedBy)
}

/**
 * Checks if the file is referenced by a specific doctype and a specific Id of that reference
 *
 * @param {IOCozyFile} file - io.cozy.files document
 * @param {Doctype} referencedBy - Doctype where document is referenced
 * @param {string} referencedId - Id of the referenced document
 * @returns {boolean} If a reference is found
 */
export const isReferencedById = (file, referencedBy, referencedId) => {
  const references =
    file?.relationships?.referenced_by?.data || file?.referenced_by || []

  return !!references.find(
    reference =>
      reference.type === referencedBy && reference.id === referencedId
  )
}

/**
 * Get array of reference by an specific doctype
 *
 * @param {IOCozyFile} file - io.cozy.files document
 * @param {Doctype} referencedBy - Doctype where document is referenced
 * @returns {Reference[]} Array of references found
 */
export const getReferencedBy = (file, referencedBy) => {
  const references =
    file?.relationships?.referenced_by?.data || file?.referenced_by || []
  return references.filter(reference => reference.type === referencedBy)
}

/**
 * Get array of reference by an specific doctype and a specific Id of that reference
 *
 * @param {IOCozyFile} file - io.cozy.files document
 * @param {Doctype} referencedBy - Doctype where document is referenced
 * @param {string} referencedId - Id of the referenced document
 * @returns {Reference[]} Array of the reference found
 */
export const getReferencedById = (file, referencedBy, referencedId) => {
  const references =
    file?.relationships?.referenced_by?.data || file?.referenced_by || []
  return references.filter(
    reference =>
      reference.type === referencedBy && reference.id === referencedId
  )
}
