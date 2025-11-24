import { setupPrompts, buildPromptMessages } from './prompt'

describe('buildPromptMessages', () => {
  beforeEach(() => {
    setupPrompts({
      prompts: [
        {
          id: 'simple-prompt',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: 'Hello {{name}}' }
          ]
        },
        {
          id: 'translate-text',
          messages: [
            { role: 'system', content: 'You are a translator.' },
            { role: 'user', content: 'Translate to {{language}}:\n\n{{text}}' }
          ]
        },
        {
          id: 'generate-email',
          messages: [
            { role: 'system', content: 'You are a writer.' },
            {
              role: 'user',
              content: 'Generate an email:\n\n{{instruction}}'
            }
          ],
          directives: ['answer_in_user_language']
        },
        {
          id: 'generate-concise-email',
          messages: [
            { role: 'system', content: 'You are a writer.' },
            {
              role: 'user',
              content: 'Generate an email:\n\n{{instruction}}'
            }
          ],
          directives: ['answer_in_user_language', 'be_concise']
        },
        {
          id: 'prompt-with-consecutive-placeholders',
          messages: [{ role: 'user', content: '{{greeting}}{{name}}' }]
        },
        {
          id: 'prompt-with-repeated-placeholder',
          messages: [
            { role: 'user', content: '{{name}} says hello to {{name}}' }
          ]
        }
      ],
      directives: [
        {
          id: 'answer_in_user_language',
          messages: [{ role: 'user', content: 'Answer in {{userLanguage}}' }]
        },
        {
          id: 'be_concise',
          messages: [{ role: 'user', content: 'Be brief and concise' }]
        }
      ]
    })
  })

  describe('basic functionality', () => {
    it('should build messages using prompt ID', () => {
      const result = buildPromptMessages('simple-prompt', { name: 'World' })

      expect(result).toEqual([
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello World' }
      ])
    })

    it('should interpolate multiple variables', () => {
      const result = buildPromptMessages('translate-text', {
        language: 'French',
        text: 'Hello world'
      })

      expect(result).toEqual([
        { role: 'system', content: 'You are a translator.' },
        { role: 'user', content: 'Translate to French:\n\nHello world' }
      ])
    })

    it('should handle consecutive placeholders', () => {
      const result = buildPromptMessages(
        'prompt-with-consecutive-placeholders',
        {
          greeting: 'Hello',
          name: 'World'
        }
      )

      expect(result).toEqual([{ role: 'user', content: 'HelloWorld' }])
    })

    it('should handle same placeholder multiple times', () => {
      const result = buildPromptMessages('prompt-with-repeated-placeholder', {
        name: 'Alice'
      })

      expect(result).toEqual([
        { role: 'user', content: 'Alice says hello to Alice' }
      ])
    })
  })

  describe('directives in prompt object', () => {
    it('should apply directives from prompt object', () => {
      const result = buildPromptMessages('generate-email', {
        instruction: 'Ask how my friend is doing?',
        userLanguage: 'Spanish'
      })

      expect(result).toEqual([
        { role: 'system', content: 'You are a writer.' },
        {
          role: 'user',
          content: 'Generate an email:\n\nAsk how my friend is doing?'
        },
        { role: 'user', content: 'Answer in Spanish' }
      ])
    })

    it('should apply multiple directives from prompt object', () => {
      const result = buildPromptMessages('generate-concise-email', {
        instruction: 'Ask how my friend is doing?',
        userLanguage: 'Spanish'
      })

      expect(result).toEqual([
        { role: 'system', content: 'You are a writer.' },
        {
          role: 'user',
          content: 'Generate an email:\n\nAsk how my friend is doing?'
        },
        { role: 'user', content: 'Answer in Spanish' },
        { role: 'user', content: 'Be brief and concise' }
      ])
    })
  })

  describe('error handling', () => {
    it('should throw error for non-existent prompt ID', () => {
      expect(() => {
        buildPromptMessages('non-existent', {})
      }).toThrow('Prompt with id "non-existent" not found')
    })

    it('should throw error for non-existent directive ID', () => {
      setupPrompts({
        prompts: [
          {
            id: 'test-prompt',
            messages: [{ role: 'user', content: 'Test' }],
            directives: ['non-existent']
          }
        ],
        directives: []
      })

      expect(() => {
        buildPromptMessages('test-prompt', {})
      }).toThrow('Directive with id "non-existent" not found')
    })
  })

  it('should throw error when variable is missing', () => {
    expect(() => {
      buildPromptMessages('simple-prompt', {})
    }).toThrow('Variable "name" is missing in interpolation')
  })
})
