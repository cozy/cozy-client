import React from 'react'
import Typography from 'cozy-ui/transpiled/react/Typography'
import flag from 'cozy-flags'
import PanelContent from './PanelContent'

const Flags = () => {
  return (
    <PanelContent>
      <Typography variant="subtitle1">Flags</Typography>
      <flag.FlagSwitcher.List />
    </PanelContent>
  )
}

export default Flags
