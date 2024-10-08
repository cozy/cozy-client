export function getSettings<T extends string>(client: CozyClient, slug: string, keys: T[]): Promise<Record<T, any>>;
export function saveAfterFetchSettings<T extends string>(client: CozyClient, slug: string, itemsOrSetter: Record<string, any> | ((oldValue: any) => Record<T, any>), setterKeys?: T[]): Promise<any>;
export function normalizeSettings(data: any[] | any): any;
export function editSettings(slug: string, currentSettings: any, items: Record<string, unknown>): any;
export function extractKeys<T extends string>(settings: Record<T, any>, keys: T[]): Record<T, any>;
export function getQuery(slug: string): import('../types').Query;
import CozyClient from '../CozyClient';
