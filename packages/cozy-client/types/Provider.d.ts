export default class CozyProvider {
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
    render(): any;
}
