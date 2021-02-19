export default class CozyProvider extends Component<any, any, any> {
    static propTypes: {
        store: any;
        client: any;
        children: any;
    };
    static childContextTypes: {
        store: any;
        client: any;
    };
    static contextTypes: {
        store: any;
    };
    constructor(props: any, context: any);
    getChildContext(): {
        store: any;
        client: any;
    };
}
import { Component } from "react";
