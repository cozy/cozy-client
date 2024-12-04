export default class CozyProvider extends React.Component<any, any, any> {
    static propTypes: {
        store: PropTypes.Requireable<PropTypes.InferProps<{
            subscribe: PropTypes.Validator<(...args: any[]) => any>;
            dispatch: PropTypes.Validator<(...args: any[]) => any>;
            getState: PropTypes.Validator<(...args: any[]) => any>;
        }>>;
        client: PropTypes.Validator<object>;
        children: PropTypes.Validator<PropTypes.ReactElementLike | PropTypes.ReactElementLike[]>;
    };
    static childContextTypes: {
        store: PropTypes.Requireable<object>;
        client: PropTypes.Validator<object>;
    };
    static contextTypes: {
        store: PropTypes.Requireable<object>;
    };
    constructor(props: any, context: any);
    getChildContext(): {
        store: any;
        client: any;
    };
}
import React from "react";
import PropTypes from "prop-types";
