/**
 * This hook manages the state during the saving of a document
 *
 * @returns {import("../types").UseMutationReturnValue}
 */
export function useMutation({ onSuccess, onError }?: {
    onSuccess?: any;
    onError?: any;
}): import("../types").UseMutationReturnValue;
export namespace useMutation {
    namespace propTypes {
        let onSuccess: any;
        let onError: any;
    }
}
