export function extractText(client: CozyClient, fileBlob: Blob, fileMetadata: FileMetadata): Promise<string>;
export function chatCompletion(client: CozyClient, messages: ChatMessage[], options?: ChatCompletionOptions): Promise<ChatCompletionResponse>;
export type FileMetadata = {
    /**
     * - File name
     */
    name: string;
    /**
     * - File MIME type
     */
    mime: string;
};
export type ChatMessage = {
    /**
     * - Role of the message sender (e.g., 'system', 'user', 'assistant')
     */
    role: string;
    /**
     * - Content of the message
     */
    content: string;
};
export type ChatCompletionMessage = {
    /**
     * - Message content
     */
    content: string;
    /**
     * - Message role
     */
    role: string;
    /**
     * - Tool calls (if any)
     */
    tool_calls?: any;
    /**
     * - Function call (if any)
     */
    function_call?: any;
};
export type ChatCompletionChoice = {
    /**
     * - Reason for finishing
     */
    finish_reason: string;
    /**
     * - Choice index
     */
    index: number;
    /**
     * - Message content
     */
    message: ChatCompletionMessage;
};
export type ChatCompletionUsage = {
    /**
     * - Number of tokens in completion
     */
    completion_tokens: number;
    /**
     * - Number of tokens in prompt
     */
    prompt_tokens: number;
    /**
     * - Total tokens used
     */
    total_tokens: number;
    /**
     * - Completion tokens details
     */
    completion_tokens_details?: any;
    /**
     * - Prompt tokens details
     */
    prompt_tokens_details?: any;
};
export type ChatCompletionResponse = {
    /**
     * - Completion ID
     */
    id: string;
    /**
     * - Creation timestamp
     */
    created: number;
    /**
     * - Model used (may be null)
     */
    model: string | null;
    /**
     * - Object type
     */
    object: string;
    /**
     * - System fingerprint
     */
    system_fingerprint: string | null;
    /**
     * - Array of completion choices
     */
    choices: ChatCompletionChoice[];
    /**
     * - Token usage statistics
     */
    usage: ChatCompletionUsage;
    /**
     * - Service tier
     */
    service_tier?: string | null;
    /**
     * - Prompt log probabilities
     */
    prompt_logprobs?: any;
    /**
     * - Extra data (e.g., sources)
     */
    extra?: string;
};
export type ChatCompletionOptions = {
    /**
     * - Whether to stream the response
     */
    stream?: boolean;
    /**
     * - Optional model to use
     */
    model?: string;
    /**
     * - Temperature for randomness (0-2)
     */
    temperature?: number;
    /**
     * - Top-p sampling
     */
    top_p?: number;
    /**
     * - Maximum tokens to generate
     */
    max_tokens?: number;
    /**
     * - Presence penalty
     */
    presence_penalty?: number;
    /**
     * - Frequency penalty
     */
    frequency_penalty?: number;
};
import CozyClient from "../CozyClient";
