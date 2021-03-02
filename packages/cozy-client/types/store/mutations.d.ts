export function isMutationAction(action: any): boolean;
export function isReceivingMutationResult(action: any): boolean;
export function initMutation(mutationId: any, definition: any): {
    type: string;
    mutationId: any;
    definition: any;
};
export function receiveMutationResult(mutationId: any, response: any, options?: {}, definition?: {}): {
    definition: {};
    type: string;
    mutationId: any;
    response: any;
};
export function receiveMutationError(mutationId: any, error: any, definition?: {}): {
    type: string;
    mutationId: any;
    error: any;
    definition: {};
};
