export function getSetting(client: CozyClient, slug: string, key: string): Promise<any>;
export function saveAfterFetchSetting(client: CozyClient, slug: string, key: string, valueOrSetter: any): Promise<any>;
export function normalizeSettings(data: any[] | any): any;
export function editSettings(slug: string, currentSettings: any, key: string, value: any): any;
export function getQuery(slug: string): import('../types').Query;
import CozyClient from "../CozyClient";
