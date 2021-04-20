import React, { useState, useMemo, useCallback } from 'react'
import sortBy from 'lodash/sortBy'
import overEvery from 'lodash/overEvery'
import get from 'lodash/get'
import format from 'date-fns/format'
import { createSelectorHook } from 'react-redux'
import { TableInspector, ObjectInspector } from 'react-inspector'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import MuiTableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import Typography from 'cozy-ui/transpiled/react/Typography'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

import CozyContext from '../context'
import useClient from '../hooks/useClient'

import { NavSecondaryAction, ListGridItem } from './common'
import PanelContent from './PanelContent'

/**
 * @type {Object.<string, React.CSSProperties>}
 * @private
 */
const styles = {
  panelRight: { height: '100%', overflow: 'scroll', flexGrow: 1 },
  mono: { fontFamily: 'monospace' },
  input: { width: 400 }
}

const TableCell = withStyles({
  root: {
    fontFamily: 'inherit',
    fontSize: 'small'
  }
})(MuiTableCell)

const getClassNameForExecutedTimesQuery = time => {
  if (time <= 100) {
    return 'u-valid u-success'
  } else if (time > 100 && time < 250) {
    return 'u-warn u-warning'
  } else {
    return 'u-danger u-error'
  }
}
const FetchStatus = ({ fetchStatus }) => {
  return (
    <span
      className={
        fetchStatus === 'loaded'
          ? 'u-valid'
          : fetchStatus === 'pending'
          ? 'u-warn'
          : fetchStatus === 'error'
          ? 'u-error'
          : ''
      }
    >
      {fetchStatus}
    </span>
  )
}

const makeMatcher = search => {
  const specs = search.split(';')
  const conditions = specs.map(spec => {
    const [key, value] = spec.split(':')
    return obj => {
      if (!value) {
        return false
      }
      const attr = get(obj, key)
      return (
        attr &&
        attr
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    }
  })
  return overEvery(conditions)
}

const useCozySelector = createSelectorHook(CozyContext)

const QueryData = ({ data, doctype }) => {
  const client = useClient()
  const [showTable, setShowTable] = useState(false)
  const documents = useCozySelector(state => state.cozy.documents[doctype])

  const storeData = useMemo(() => {
    return data.map(id => client.hydrateDocument(documents[id]))
  }, [client, data, documents])

  const handleShowTable = useCallback(() => setShowTable(value => !value), [
    setShowTable
  ])

  const [results, setResults] = useState(null)
  const [search, setSearch] = useState('')
  const handleSearch = useCallback(
    ev => {
      const searchValue = ev.target.value
      const matcher = searchValue !== '' ? makeMatcher(searchValue) : null
      const results = matcher ? storeData.filter(matcher) : null
      setSearch(searchValue)
      setResults(results)
    },
    [storeData]
  )

  const viewData = results || storeData

  return (
    <div className="u-pb-3">
      Table:{' '}
      <input type="checkbox" onChange={handleShowTable} checked={showTable} />
      <br />
      Search:{' '}
      <input
        type="text"
        placeholder="field.nested_field:value;other_field:other_value"
        onChange={handleSearch}
        value={search}
        style={styles.input}
      />
      <br />
      {showTable ? (
        <TableInspector data={viewData} />
      ) : (
        <ObjectInspector data={viewData} />
      )}
    </div>
  )
}

const ObjectInspectorAndStringificator = ({ object }) => {
  const [showStringify, setShowStringify] = useState(false)
  const handleStringify = useCallback(() => setShowStringify(value => !value), [
    setShowStringify
  ])
  return (
    <>
      Stringify:{' '}
      <input
        type="checkbox"
        onChange={handleStringify}
        checked={showStringify}
      />
      {showStringify ? (
        <pre>{JSON.stringify(object, null, 2)}</pre>
      ) : (
        <ObjectInspector data={object} />
      )}
    </>
  )
}
const QueryState = ({ name }) => {
  const queryState = useCozySelector(state => state.cozy.queries[name])
  const { data } = queryState
  const { lastFetch, lastUpdate } = useMemo(() => {
    return {
      lastFetch: new Date(queryState.lastFetch),
      lastUpdate: new Date(queryState.lastUpdate)
    }
  }, [queryState])
  return (
    <>
      <TableContainer component={Paper} elevation={0}>
        <Table style={styles.mono} size="small" className="u-w-auto">
          <TableBody>
            <TableRow>
              <TableCell>doctype</TableCell>
              <TableCell>{queryState.definition.doctype}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>definition</TableCell>
              <TableCell>
                <ObjectInspectorAndStringificator
                  object={queryState.definition}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>fetchStatus</TableCell>
              <TableCell>
                <FetchStatus fetchStatus={queryState.fetchStatus} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>lastFetch</TableCell>
              <TableCell>{format(lastFetch, 'HH:mm:ss')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>lastUpdate</TableCell>
              <TableCell>{format(lastUpdate, 'HH:mm:ss')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>documents</TableCell>
              <TableCell>
                {data && data.length !== undefined ? data.length : data ? 1 : 0}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Exec. time</TableCell>
              <TableCell>
                <ObjectInspectorAndStringificator
                  object={queryState.execution_stats}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <QueryData data={data} doctype={queryState.definition.doctype} />
    </>
  )
}
const QueryListItem = ({ name, selected, onClick }) => {
  const queryState = useCozySelector(state => state.cozy.queries[name])
  const lastUpdate = useMemo(
    () => format(new Date(queryState.lastUpdate), 'HH:mm:ss'),
    [queryState]
  )

  return (
    <ListItem dense button selected={selected} onClick={onClick}>
      <ListItemText
        primary={name}
        secondary={
          <>
            {lastUpdate} - {queryState.data.length} docs
            {queryState.execution_stats && (
              <ExecutionTime queryState={queryState} />
            )}
          </>
        }
      />
      <NavSecondaryAction />
    </ListItem>
  )
}

const ExecutionTime = ({ queryState }) => {
  if (!queryState.execution_stats) return null
  const classCSS = getClassNameForExecutedTimesQuery(
    queryState.execution_stats.execution_time_ms
  )
  return (
    <>
      {' - '}
      <span className={classCSS}>
        {Math.round(queryState.execution_stats.execution_time_ms)} ms
      </span>
    </>
  )
}
const QueryPanels = () => {
  const queries = useCozySelector(state => state.cozy.queries)
  const sortedQueries = useMemo(() => {
    return sortBy(
      queries ? Object.values(queries) : [],
      queryState => queryState.lastUpdate
    )
      .map(queryState => queryState.id)
      .reverse()
  }, [queries])

  const [selectedQuery, setSelectedQuery] = useState(() => sortedQueries[0])

  return (
    <>
      <ListGridItem>
        {sortedQueries.map(queryName => {
          return (
            <QueryListItem
              name={queryName}
              key={queryName}
              onClick={() => setSelectedQuery(queryName)}
              selected={name === selectedQuery}
            />
          )
        })}
        {sortedQueries.length === 0 ? (
          <PanelContent>
            <Typography variant="body1">No queries yet.</Typography>
          </PanelContent>
        ) : null}
      </ListGridItem>
      <Box clone p={1}>
        <Grid item style={styles.panelRight}>
          <Typography variant="subtitle1">{selectedQuery}</Typography>
          {selectedQuery ? <QueryState name={selectedQuery} /> : null}
        </Grid>
      </Box>
    </>
  )
}

export default QueryPanels
