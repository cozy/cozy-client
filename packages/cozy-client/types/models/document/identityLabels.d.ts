export namespace national_id_card {
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {boolean}
     */
    function expirationCondition(file: IOCozyFile): boolean;
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {boolean}
     */
    function expirationCondition(file: IOCozyFile): boolean;
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {Date}
     */
    function expirationDate(file: IOCozyFile): Date;
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {Date}
     */
    function expirationDate(file: IOCozyFile): Date;
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {string}
     */
    function noticeLink(file: IOCozyFile): string;
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {string}
     */
    function noticeLink(file: IOCozyFile): string;
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {number}
     */
    function noticePeriod(file: IOCozyFile): number;
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {number}
     */
    function noticePeriod(file: IOCozyFile): number;
}
export namespace residence_permit {
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {boolean}
     */
    export function expirationCondition(file: IOCozyFile): boolean;
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {boolean}
     */
    export function expirationCondition(file: IOCozyFile): boolean;
    import expirationDate = national_id_card.expirationDate;
    export { expirationDate };
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {string}
     */
    export function noticeLink(file: IOCozyFile): string;
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {string}
     */
    export function noticeLink(file: IOCozyFile): string;
    import noticePeriod = national_id_card.noticePeriod;
    export { noticePeriod };
}
export namespace personal_sporting_licence {
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {boolean}
     */
    function expirationCondition(file: IOCozyFile): boolean;
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {boolean}
     */
    function expirationCondition(file: IOCozyFile): boolean;
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {Date}
     */
    function expirationDate(file: IOCozyFile): Date;
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {Date}
     */
    function expirationDate(file: IOCozyFile): Date;
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {number}
     */
    function noticePeriod(file: IOCozyFile): number;
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {number}
     */
    function noticePeriod(file: IOCozyFile): number;
}
import { IOCozyFile } from "../../types";
