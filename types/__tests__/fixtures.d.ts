export namespace TODO_1 {
    const _id: string;
    const _rev: string;
    const _type: string;
    const label: string;
    const done: boolean;
}
export namespace TODO_2 {
    const _id_1: string;
    export { _id_1 as _id };
    const _rev_1: string;
    export { _rev_1 as _rev };
    const _type_1: string;
    export { _type_1 as _type };
    const label_1: string;
    export { label_1 as label };
    const done_1: boolean;
    export { done_1 as done };
}
export namespace TODO_3 {
    const _id_2: string;
    export { _id_2 as _id };
    const _rev_2: string;
    export { _rev_2 as _rev };
    const _type_2: string;
    export { _type_2 as _type };
    const label_2: string;
    export { label_2 as label };
    const done_2: boolean;
    export { done_2 as done };
}
export namespace TODO_4 {
    const _id_3: string;
    export { _id_3 as _id };
    const _rev_3: string;
    export { _rev_3 as _rev };
    const _type_3: string;
    export { _type_3 as _type };
    const label_3: string;
    export { label_3 as label };
    const done_3: boolean;
    export { done_3 as done };
}
export const TODOS: {
    _id: string;
    _rev: string;
    _type: string;
    label: string;
    done: boolean;
}[];
export namespace TODO_WITH_RELATION {
    const _id_4: number;
    export { _id_4 as _id };
    const _rev_4: string;
    export { _rev_4 as _rev };
    const _type_4: string;
    export { _type_4 as _type };
    const label_4: string;
    export { label_4 as label };
    export namespace relationships {
        namespace attachments {
            const doctype: string;
            const files: {
                _type: string;
                _id: number;
            }[];
        }
    }
}
export const AUTHORS: {
    id: number;
    _id: number;
    _type: string;
    name: string;
}[];
export namespace TODO_WITH_AUTHOR {
    const _id_5: number;
    export { _id_5 as _id };
    const _rev_5: string;
    export { _rev_5 as _rev };
    const _type_5: string;
    export { _type_5 as _type };
    const label_5: string;
    export { label_5 as label };
    export namespace relationships_1 {
        namespace authors {
            const doctype_1: string;
            export { doctype_1 as doctype };
            export const data: {
                _type: string;
                _id: number;
            }[];
        }
    }
    export { relationships_1 as relationships };
}
export namespace FILE_1 {
    const _id_6: number;
    export { _id_6 as _id };
    const _rev_6: string;
    export { _rev_6 as _rev };
    const _type_6: string;
    export { _type_6 as _type };
    const label_6: string;
    export { label_6 as label };
    export const name: string;
}
export namespace FILE_2 {
    const _id_7: number;
    export { _id_7 as _id };
    const _rev_7: string;
    export { _rev_7 as _rev };
    const _type_7: string;
    export { _type_7 as _type };
    const label_7: string;
    export { label_7 as label };
}
export const APP_NAME: "cozy-client-test";
export const APP_VERSION: 2;
export const DOCTYPE_VERSION: 1;
export const SOURCE_ACCOUNT_ID: "123-456-abc";
export const SOURCE_ACCOUNT_IDENTIFIER: "testSourceAccountIdentifier";
export namespace SCHEMA {
    export namespace todos {
        const doctype_2: string;
        export { doctype_2 as doctype };
        export { DOCTYPE_VERSION as doctypeVersion };
        export namespace relationships_2 {
            export namespace attachments_1 {
                export const type: string;
                const doctype_3: string;
                export { doctype_3 as doctype };
            }
            export { attachments_1 as attachments };
            export namespace authors_1 {
                const type_1: string;
                export { type_1 as type };
                const doctype_4: string;
                export { doctype_4 as doctype };
            }
            export { authors_1 as authors };
        }
        export { relationships_2 as relationships };
    }
    export namespace files_1 {
        const doctype_5: string;
        export { doctype_5 as doctype };
        export namespace relationships_3 {
            namespace icons {
                const type_2: string;
                export { type_2 as type };
                const doctype_6: string;
                export { doctype_6 as doctype };
            }
        }
        export { relationships_3 as relationships };
    }
    export { files_1 as files };
}
