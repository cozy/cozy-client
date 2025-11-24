let promptsStore = {
  prompts: [],
  directives: []
}

/**
 * Replaces {{variable}} placeholders with actual values
 *
 * @param {string} template - The template string containing placeholders
 * @param {Object} variables - Key-value pairs for interpolation
 * @returns {string} The interpolated string
 * @throws {Error} If a variable is not provided
 */
const interpolateVariables = (template, variables) => {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, key) => {
    if (variables[key] === undefined) {
      throw new Error(`Variable "${key}" is missing in interpolation`)
    }
    return variables[key]
  })
}

/**
 * Sets up prompts and directives from prompt data
 *
 * @param {Object} promptData - The JSON object containing prompts and directives
 * @param {Array} promptData.prompts - Array of prompt objects
 * @param {Array} [promptData.directives] - Array of directive objects
 */
export const setupPrompts = promptData => {
  promptsStore = {
    prompts: promptData.prompts || [],
    directives: promptData.directives || []
  }
}

/**
 * Gets a prompt by its ID
 *
 * @param {string} promptId - The ID of the prompt to retrieve
 * @returns {Object|undefined} The prompt object or undefined if not found
 */
export const getPrompt = promptId => {
  return promptsStore.prompts.find(prompt => prompt.id === promptId)
}

/**
 * Gets a directive by its ID
 *
 * @param {string} directiveId - The ID of the directive to retrieve
 * @returns {Object|undefined} The directive object or undefined if not found
 */
export const getDirective = directiveId => {
  return promptsStore.directives.find(directive => directive.id === directiveId)
}

/**
 * Gets all prompts
 *
 * @returns {Array} Array of all prompt objects
 */
export const getAllPrompts = () => {
  return promptsStore.prompts
}

/**
 * Gets all directives
 *
 * @returns {Array} Array of all directive objects
 */
export const getAllDirectives = () => {
  return promptsStore.directives
}

/**
 * Generates messages array with interpolated variables
 *
 * @param {string} promptId - The prompt ID
 * @param {Object} variables - Key-value pairs for variable interpolation
 * @returns {Array} Messages array with interpolated variables
 */
export const buildPromptMessages = (promptId, variables = {}) => {
  const prompt = getPrompt(promptId)
  if (!prompt) {
    throw new Error(`Prompt with id "${promptId}" not found`)
  }

  let messages = [...prompt.messages]

  if (prompt.directives) {
    const directiveMessages = prompt.directives.flatMap(directiveId => {
      const directive = getDirective(directiveId)
      if (!directive) {
        throw new Error(`Directive with id "${directiveId}" not found`)
      }
      return directive.messages || []
    })
    messages = [...messages, ...directiveMessages]
  }

  return messages.map(message => ({
    ...message,
    content: interpolateVariables(message.content, variables)
  }))
}
