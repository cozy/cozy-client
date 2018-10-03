const INIT_MUTATION = 'INIT_MUTATION'
const RECEIVE_MUTATION_RESULT = 'RECEIVE_MUTATION_RESULT'
const RECEIVE_MUTATION_ERROR = 'RECEIVE_MUTATION_ERROR'

export const isMutationAction = action =>
  [INIT_MUTATION, RECEIVE_MUTATION_RESULT, RECEIVE_MUTATION_ERROR].indexOf(
    action.type
  ) !== -1

export const isReceivingMutationResult = action =>
  action.type === RECEIVE_MUTATION_RESULT

// actions
export const initMutation = (mutationId, definition) => ({
  type: INIT_MUTATION,
  mutationId,
  definition
})

export const receiveMutationResult = (
  mutationId,
  response,
  options = {},
  definition = {}
) => ({
  type: RECEIVE_MUTATION_RESULT,
  mutationId,
  response,
  ...options,
  definition
})

export const receiveMutationError = (mutationId, error, definition = {}) => ({
  type: RECEIVE_MUTATION_ERROR,
  mutationId,
  error,
  definition
})
