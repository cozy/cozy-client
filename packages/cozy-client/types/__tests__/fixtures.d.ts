export namespace TODO_1 {
    let _id: string;
    let _rev: string;
    let _type: string;
    let label: string;
    let done: boolean;
}
export namespace TODO_2 {
    let _id_1: string;
    export { _id_1 as _id };
    let _rev_1: string;
    export { _rev_1 as _rev };
    let _type_1: string;
    export { _type_1 as _type };
    let label_1: string;
    export { label_1 as label };
    let done_1: boolean;
    export { done_1 as done };
}
export namespace TODO_3 {
    let _id_2: string;
    export { _id_2 as _id };
    let _rev_2: string;
    export { _rev_2 as _rev };
    let _type_2: string;
    export { _type_2 as _type };
    let label_2: string;
    export { label_2 as label };
    let done_2: boolean;
    export { done_2 as done };
}
export namespace TODO_4 {
    let _id_3: string;
    export { _id_3 as _id };
    let _rev_3: string;
    export { _rev_3 as _rev };
    let _type_3: string;
    export { _type_3 as _type };
    let label_3: string;
    export { label_3 as label };
    let done_3: boolean;
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
    let _id_4: number;
    export { _id_4 as _id };
    let _rev_4: string;
    export { _rev_4 as _rev };
    let _type_4: string;
    export { _type_4 as _type };
    let label_4: string;
    export { label_4 as label };
    export namespace relationships {
        namespace attachments {
            let doctype: string;
            let files: {
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
    let _id_5: number;
    export { _id_5 as _id };
    let _rev_5: string;
    export { _rev_5 as _rev };
    let _type_5: string;
    export { _type_5 as _type };
    let label_5: string;
    export { label_5 as label };
    export namespace relationships_1 {
        namespace authors {
            let doctype_1: string;
            export { doctype_1 as doctype };
            export let data: {
                _type: string;
                _id: number;
            }[];
        }
    }
    export { relationships_1 as relationships };
}
export namespace FILE_1 {
    let _id_6: number;
    export { _id_6 as _id };
    let _rev_6: string;
    export { _rev_6 as _rev };
    let _type_6: string;
    export { _type_6 as _type };
    let label_6: string;
    export { label_6 as label };
    export let name: string;
}
export namespace FILE_2 {
    let _id_7: number;
    export { _id_7 as _id };
    let _rev_7: string;
    export { _rev_7 as _rev };
    let _type_7: string;
    export { _type_7 as _type };
    let label_7: string;
    export { label_7 as label };
}
export const APP_NAME: "cozy-client-test";
export const APP_VERSION: 2;
export const DOCTYPE_VERSION: 1;
export const SOURCE_ACCOUNT_ID: "123-456-abc";
export const SOURCE_ACCOUNT_IDENTIFIER: "testSourceAccountIdentifier";
export namespace SCHEMA {
    export namespace todos {
        let doctype_2: string;
        export { doctype_2 as doctype };
        export { DOCTYPE_VERSION as doctypeVersion };
        export namespace relationships_2 {
            export namespace attachments_1 {
                export let type: string;
                let doctype_3: string;
                export { doctype_3 as doctype };
            }
            export { attachments_1 as attachments };
            export namespace authors_1 {
                let type_1: string;
                export { type_1 as type };
                let doctype_4: string;
                export { doctype_4 as doctype };
            }
            export { authors_1 as authors };
        }
        export { relationships_2 as relationships };
    }
    export namespace files_1 {
        let doctype_5: string;
        export { doctype_5 as doctype };
        export namespace relationships_3 {
            namespace icons {
                let type_2: string;
                export { type_2 as type };
                let doctype_6: string;
                export { doctype_6 as doctype };
            }
        }
        export { relationships_3 as relationships };
    }
    export { files_1 as files };
}
