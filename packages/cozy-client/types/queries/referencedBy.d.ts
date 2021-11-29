export function isReferencedBy(file: IOCozyFile, referencedBy: Doctype): boolean;
export function isReferencedById(file: IOCozyFile, referencedBy: Doctype, referencedId: string): boolean;
export function getReferencedBy(file: IOCozyFile, referencedBy: Doctype): Reference[];
export function getReferencedById(file: IOCozyFile, referencedBy: Doctype, referencedId: string): Reference[];
import { IOCozyFile } from "../types";
import { Doctype } from "../types";
import { Reference } from "../types";
