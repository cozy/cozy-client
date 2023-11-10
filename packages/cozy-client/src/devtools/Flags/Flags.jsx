import React, { useState } from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography'
import List from 'cozy-ui/transpiled/react/List'

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
      <List dense className="u-maw-6">
        {flags.map(flag => (
          <FlagItem
            key={flag.key}
            flag={flag}
            onEdit={handleEdit}
            onTrash={handleTrash}
          />
        ))}
      </List>
      <FlagEdit flag={edited} />
    </PanelContent>
  )
}

export default Flags
