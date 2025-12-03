import CozyClient from '../CozyClient'

/**
 * @typedef {object} FileMetadata
 * @property {string} name - File name
 * @property {string} mime - File MIME type
 */

/**
 * @typedef {object} ChatMessage
 * @property {string} role - Role of the message sender (e.g., 'system', 'user', 'assistant')
 * @property {string} content - Content of the message
 */

/**
 * @typedef {object} ChatCompletionMessage
 * @property {string} content - Message content
 * @property {string} role - Message role
 * @property {*} [tool_calls] - Tool calls (if any)
 * @property {*} [function_call] - Function call (if any)
 */

/**
 * @typedef {object} ChatCompletionChoice
 * @property {string} finish_reason - Reason for finishing
 * @property {number} index - Choice index
 * @property {ChatCompletionMessage} message - Message content
 */

/**
 * @typedef {object} ChatCompletionUsage
 * @property {number} completion_tokens - Number of tokens in completion
 * @property {number} prompt_tokens - Number of tokens in prompt
 * @property {number} total_tokens - Total tokens used
 * @property {*} [completion_tokens_details] - Completion tokens details
 * @property {*} [prompt_tokens_details] - Prompt tokens details
 */

/**
 * @typedef {object} ChatCompletionResponse
 * @property {string} id - Completion ID
 * @property {number} created - Creation timestamp
 * @property {string|null} model - Model used (may be null)
 * @property {string} object - Object type
 * @property {string|null} system_fingerprint - System fingerprint
 * @property {ChatCompletionChoice[]} choices - Array of completion choices
 * @property {ChatCompletionUsage} usage - Token usage statistics
 * @property {string|null} [service_tier] - Service tier
 * @property {*} [prompt_logprobs] - Prompt log probabilities
 * @property {string} [extra] - Extra data (e.g., sources)
 */

/**
 * @typedef {object} ChatCompletionOptions
 * @property {boolean} [stream=false] - Whether to stream the response
 * @property {string} [model] - Optional model to use
 * @property {number} [temperature] - Temperature for randomness (0-2)
 * @property {number} [top_p] - Top-p sampling
 * @property {number} [max_tokens] - Maximum tokens to generate
 * @property {number} [presence_penalty] - Presence penalty
 * @property {number} [frequency_penalty] - Frequency penalty
 */

/**
 * Extract text from a file using AI tools
 *
 * @param {CozyClient} client - Instance of CozyClient
 * @param {Blob} fileBlob - File content as Blob
 * @param {FileMetadata} fileMetadata - File metadata (name, mime)
 * @returns {Promise<string>} Extracted text content
 */
export const extractText = async (client, fileBlob, fileMetadata) => {
  const formData = new FormData()
  formData.append('file', fileBlob, fileMetadata.name)
  formData.append('tool', JSON.stringify({ name: 'extractText' }))
  formData.append(
    'metadata',
    JSON.stringify({
      mime: fileMetadata.mime,
      name: fileMetadata.name
    })
  )

  const response = await client.stackClient.fetch(
    'POST',
    '/ai/v1/tools/execute',
    formData,
    {
      body: formData
    }
  )

  if (!response.ok) {
    const errorText = await response.text?.()
    throw new Error(
      `Failed to extract text: ${response.statusText}. ${errorText}`
    )
  }

  const result = await response.json()
  return result.message
}

/**
 * Generate AI chat completion
 *
 * @param {CozyClient} client - Instance of CozyClient
 * @param {ChatMessage[]} messages - Array of message objects with role and content
 * @param {ChatCompletionOptions} [options={}] - Additional options
 * @returns {Promise<ChatCompletionResponse>} AI response following OpenAI chat completion format
 */
export const chatCompletion = async (client, messages, options = {}) => {
  const requestBody = {
    messages,
    ...options
  }

  try {
    const response = await client.stackClient.fetchJSON(
      'POST',
      '/ai/v1/chat/completions',
      requestBody
    )

    return response
  } catch (error) {
    throw new Error(`Failed to generate chat completion: ${error.message}`)
  }
}
