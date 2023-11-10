import React, { useState } from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography'

import PanelContent from '../PanelContent'
import { FlagEdit } from './FlagEdit'
import { computeFlags } from './helpers'
import FlagItem from './FlagItem'

const Flags = () => {
  const [edited, setEdited] = useState(null)

  const flags = computeFlags()

  const handleEdit = flag => {
    setEdited(flag)
  }

  const handleTrash = flag => {
    if (localStorage.getItem(flag.key)) {
      localStorage.removeItem(flag.key)
      location.reload()
    }
  }

  return (
    <PanelContent>
      <Typography variant="subtitle1">Flags</Typography>
      {flags.map(flag => (
        <FlagItem
          key={flag.key}
          flag={flag}
          onEdit={handleEdit}
          onTrash={handleTrash}
        />
      ))}
      <FlagEdit flag={edited} />
    </PanelContent>
  )
}

export default Flags
