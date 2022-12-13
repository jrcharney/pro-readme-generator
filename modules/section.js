/**
 * @file modules/section.js
 * @class Section
 * @desc Create sections of a markdown document
 */
export default class Section {
    #header;        // string
    #level;         // number
    #content;       // string
    /**
     * 
     * @param {string} header The header string of the section
     * @param {string} content The body of the section
     * @param {number} level The level this item will appear in the outline. Typically at level 2, which is default. 
     */
    constructor(header,content,level=2){
        this.#header = header;
        this.#content = content;
        this.#level = level;
    }
    set level(level){
        this.#level = level;
        return this;
    }
    get level(){
        return this.#level;
    }
    set header(header){
        this.#header = header;
        return this;
    }
    get header(){
        return this.#header;
    }
    set content(content){
        this.#content = content;
    }
    get content(){
        return this.#content;
    }
    /**
     * @method tocEntry
     * @desc Write the header as a Table of Contents entry
     * @returns {string}
     */
    tocEntry(){
        const indent = (this.#level > 2) ? " ".repeat((this.#level - 2) * 2) : "";
        const link   = this.#header.toLowerCase().replace(/\s/g,"-");   // TODO: Probably should use a function later in replace
        return `${indent}- [${this.#header}](#${link})`;
    }
    /**
     * @method entry
     * @desc Set up the entry to be processed. The contents should be separated from the header with a new line as well as end with a new line.
     * @returns {array}
     */
    entry(){
        return `${"#".repeat(this.#level)} ${this.#header}\n\n${this.#content}\n\n`;
    }
    /**
     * @method entryString
     * @desc A utility function to output the entry as a string. The document will actually double space this.
     * @returns {string}
     */
    entryString(){
        return this.entry().join("");
    }
};
