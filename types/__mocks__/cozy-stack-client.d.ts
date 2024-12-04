declare const OAuthClient_base: any;
export class OAuthClient extends OAuthClient_base {
    [x: string]: any;
    constructor(opts: any);
    collection: jest.Mock<{
        all: jest.Mock<Promise<void>, []>;
        get: jest.Mock<Promise<{
            data: any[];
        }>, []>;
        find: jest.Mock<Promise<void>, []>;
        create: jest.Mock<Promise<void>, []>;
        update: jest.Mock<Promise<void>, []>;
        updateAll: jest.Mock<Promise<void>, []>;
        destroy: jest.Mock<Promise<void>, []>;
        findReferencedBy: jest.Mock<Promise<void>, []>;
    }, []>;
}
export default MockedStackClient;
declare const MockedStackClient_base: any;
declare class MockedStackClient extends MockedStackClient_base {
    [x: string]: any;
    constructor(opts: any);
    collection: jest.Mock<{
        all: jest.Mock<Promise<void>, []>;
        get: jest.Mock<Promise<{
            data: any[];
        }>, []>;
        find: jest.Mock<Promise<void>, []>;
        create: jest.Mock<Promise<void>, []>;
        update: jest.Mock<Promise<void>, []>;
        updateAll: jest.Mock<Promise<void>, []>;
        destroy: jest.Mock<Promise<void>, []>;
        findReferencedBy: jest.Mock<Promise<void>, []>;
    }, []>;
}
export const normalizeDoc: any;
export const FetchError: any;
