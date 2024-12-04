export function getRootPath(): string;
export function getTemporaryRootPath(): any;
export function getCozyPath(): string;
export function getEntry(path: string): Promise<FilesystemEntry>;
export function getCozyEntry(): Promise<any>;
export function createCozyPath(): Promise<any>;
export function getDirectory(rootDirEntry: object, folderName: string): Promise<any>;
export function writeFile(fileEntry: object, dataObj: object): Promise<any>;
export function openFileWithCordova(URI: any, mimetype: any): Promise<any>;
export function deleteOfflineFile(fileName: string): Promise<any>;
export function saveFileWithCordova(fileData: object, fileName: string): Promise<any>;
export function temporarySave(file: object, fileName: string): Promise<any>;
export function saveAndOpenWithCordova(blob: Blob, file: object): Promise<any>;
export function getNativeFile(file: object): Promise<any>;
export function openOfflineFile(file: object): Promise<any>;
export function openFileWith(client: CozyClient, file: object): Promise<void>;
export default fsnative;
export type FilesystemEntry = any;
import CozyClient from "../CozyClient";
declare namespace fsnative {
    export { saveAndOpenWithCordova };
}
