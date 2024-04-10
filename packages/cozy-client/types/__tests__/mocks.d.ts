export function client(implementations: any): {
    query: jest.Mock<any, any>;
    create: jest.Mock<any, any>;
    save: jest.Mock<any, any>;
    destroy: jest.Mock<any, any>;
    getAssociation: jest.Mock<any, any>;
    makeObservableQuery: jest.Mock<any, any>;
    requestQuery: jest.Mock<any, any>;
    all: jest.Mock<any, any>;
    setStore: jest.Mock<any, any>;
    fetchQueryAndGetFromState: jest.Mock<any, any>;
};
export function observableQuery(implementations: any): {
    currentResult: jest.Mock<any, any>;
    subscribe: jest.Mock<any, any>;
    fetchMore: jest.Mock<any, any>;
    fetch: jest.Mock<any, any>;
};
