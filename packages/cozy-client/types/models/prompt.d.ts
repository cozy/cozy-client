export function setupPrompts(promptData: {
    prompts: any[];
    directives: any[];
}): void;
export function getPrompt(promptId: string): any | undefined;
export function getDirective(directiveId: string): any | undefined;
export function getAllPrompts(): any[];
export function getAllDirectives(): any[];
export function buildPromptMessages(promptId: string, variables?: any): any[];
