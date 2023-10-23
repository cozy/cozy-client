import React, { useState } from 'react'
import { ObjectInspector, TableInspector } from 'react-inspector'

import Typography from 'cozy-ui/transpiled/react/Typography'
import TextField from 'cozy-ui/transpiled/react/TextField'
import Button from 'cozy-ui/transpiled/react/Buttons'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PenIcon from 'cozy-ui/transpiled/react/Icons/Pen'
import TrashIcon from 'cozy-ui/transpiled/react/Icons/Trash'

import flag from 'cozy-flags'
import PanelContent from './PanelContent'

const human = name => {
  return name.replace(/[a-z][A-Z]/g, str => str[0] + ' ' + str[1].toLowerCase())
}

const Flags = () => {
  const [flagName, setFlagName] = useState('')
  const [flagValue, setFlagValue] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!flagName || !flagValue) return

    let value = flagValue
    if (isJSONString(flagValue)) {
      console.log('isJSONString')
      value = JSON.parse(flagValue)
    } else if (value === 'true' || value === 'false') {
      value = Boolean(value)
    }

    flag(flagName, value)
    location.reload()
  }

  const allFlags = flag.list()

  const handleFlagNameChange = e => {
    setFlagName(e.target.value)
  }

  const isJSONString = str => {
    try {
      JSON.parse(str)
      return true
    } catch (e) {
      return false
    }
  }

  const handleFlagValueChange = e => {
    let value = e.target.value
    if (Number.isInteger(value)) {
      value = parseInt(value)
    }
    setFlagValue(value)
  }

  const handleEdit = name => {
    setFlagName(name)
    const flagValue = flag(name)
    const flagValueHuman =
      typeof flagValue === 'object'
        ? JSON.stringify(flagValue)
        : flagValue.toString()
    setFlagValue(flagValueHuman)
  }

  const handleTrash = name => {
    const key = `flag__${name}`
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key)
      location.reload()
    }
  }

  return (
    <PanelContent>
      <Typography variant="subtitle1">Flags</Typography>
      {allFlags.map(name => {
        console.log(name)

        const flagValue = flag(name)
        const flagValueHuman =
          typeof flagValue === 'object'
            ? JSON.stringify(flagValue)
            : flagValue.toString()
        return (
          <div key={name}>
            {human(name)} :
            {typeof flagValue === 'object' ? (
              <ObjectInspector data={flagValue} />
            ) : (
              flagValueHuman
            )}
            <IconButton size="small" onClick={() => handleEdit(name)}>
              <Icon icon={PenIcon} />
            </IconButton>
            <IconButton size="small" onClick={() => handleTrash(name)}>
              <Icon icon={TrashIcon} />
            </IconButton>
          </div>
        )
      })}
      <form
        onSubmit={handleSubmit}
        className="u-mt-1 u-flex-items-center u-flex"
      >
        <TextField
          label="Name"
          name="name"
          onChange={handleFlagNameChange}
          value={flagName}
          size="small"
          variant="outlined"
        />
        <TextField
          label="Value"
          name="value"
          onChange={handleFlagValueChange}
          value={flagValue}
          size="small"
          variant="outlined"
          className="u-ml-1"
        />
        <Button type="submit" label="Edit" className="u-ml-1" />
      </form>
    </PanelContent>
  )
}

export default Flags
