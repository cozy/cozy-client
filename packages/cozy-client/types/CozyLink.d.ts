export default class CozyLink {
    constructor(requestHandler: any, persistHandler: any);
    request(operation: any, result: any, forward: any): void;
    persistData(data: any, forward: any): void;
}
export function chain(links: any): any;
