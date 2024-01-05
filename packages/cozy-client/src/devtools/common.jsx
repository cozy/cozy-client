import React from 'react'

import Grid from 'cozy-ui/transpiled/react/Grid'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/ListItemSecondaryAction'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'

/**
 * @type {Object.<string, React.CSSProperties>}
 * @private
 */
const styles = {
  listGridItem: {
    height: '100%',
    overflow: 'scroll',
    flexBasis: 240,
    flexShrink: 0,
    flexGrow: 0,
    boxShadow: '4px 0 8px rgba(0, 0, 0, 0.10)'
  }
}

const NavSecondaryAction = () => {
  return (
    <ListItemSecondaryAction>
      <Icon
        icon={RightIcon}
        className="u-mr-half"
        color="var(--secondaryTextColor)"
      />
    </ListItemSecondaryAction>
  )
}

const ListGridItem = ({ children }) => {
  return (
    <Grid item style={styles.listGridItem}>
      {children}
    </Grid>
  )
}

export { NavSecondaryAction, ListGridItem }
