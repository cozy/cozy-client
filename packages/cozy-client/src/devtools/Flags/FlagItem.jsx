import React from 'react'
import { ObjectInspector } from 'react-inspector'

import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PenIcon from 'cozy-ui/transpiled/react/Icons/Pen'
import TrashIcon from 'cozy-ui/transpiled/react/Icons/Trash'

const FlagItem = ({ flag, onEdit, onTrash }) => {
  return (
    <div key={flag.name}>
      {flag.humanName} :
      {typeof flag.value === 'object' ? (
        <ObjectInspector data={flag.value} />
      ) : (
        flag.humanValue
      )}
      <IconButton size="small" onClick={() => onEdit(flag)}>
        <Icon icon={PenIcon} />
      </IconButton>
      <IconButton size="small" onClick={() => onTrash(flag)}>
        <Icon icon={TrashIcon} />
      </IconButton>
    </div>
  )
}

export default FlagItem
