import { createStore, combineReducers } from 'redux'
import CozyLink from '../CozyLink'
import CozyClient from '../CozyClient'

export const queryResultFromData = (data, opts = {}) => ({
  data: data,
  meta: { count: data.length },
  skip: 0,
  next: false,
  ...opts
})

