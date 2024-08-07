export default class AccessToken {
    static fromJSON(data: any): AccessToken;
    constructor(opts: any);
    tokenType: any;
    accessToken: any;
    refreshToken: any;
    scope: any;
    toAuthHeader(): string;
    toBasicAuth(): string;
    toJSON(): {
        tokenType: any;
        accessToken: any;
        refreshToken: any;
        scope: any;
    };
}
