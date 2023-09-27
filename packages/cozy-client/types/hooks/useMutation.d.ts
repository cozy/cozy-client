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
        const onSuccess: PropTypes.Requireable<(...args: any[]) => any>;
        const onError: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
