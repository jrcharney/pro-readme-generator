/**
 * @file modules/mddoc.js
 * @class MDDoc
 * @desc Create a Markdown document with Sections
 */

import Section from "./section.js";

export default class MDDoc {
    #titleSection;
    #tocSection;
    #sections = [];
    /**
     * 
     * @param {*} titleHeader The title of the document
     * @param {*} titleContent The introduction content
     * @param {array<Section>} sections an array of Section object. It's empty, you can ad them later with addSection. 
     */
    constructor(titleHeader = "",titleContent = "",...sections){
        this.#titleSection = new Section(titleHeader,titleContent,1);  // Give it a level 1 header
        this.#tocSection = new Section("Table of Contents","");       // Empty for now
        if(sections.length > 0){
            this.sections = sections;
        }
    }
    /**
     * @set titleHeader
     * @desc Set the title header for the title section
     * @param titleHeader
     * @returns {this} makes it chainable
     */
    setTitleHeader(titleHeader){
        this.#titleSection.header = titleHeader;
        return this;
    }
    /**
     * @set titleContent
     * @desc Set the title content for the title section, typically the introduction
     * @param titleContent
     * @return {this} makes it chainable.
     */
    setTitleContent(titleContent){
        this.#titleSection.content = titleContent;
        return this;
    }
    /**
     * @method addSection
     * @desc Add a new Section object
     * @param {string} header 
     * @param {string} content 
     * @param {number} level 
     * @returns {this}  makes it chainable
     */
    addSection(header,content,level=2){
        this.#sections.push(new Section(header,content,level));
        return this;
    }
    /**
     * @method writeTitleSection
     * @desc return the title section as a double-spaced section
     * @returns {string}
     */
    writeTitleSection(){
        return this.#titleSection.entry();
    }
    /**
     * @method writeTOC
     * @desc assemble the table of content entires together to form the toc content. This should be single-spaced to form the markdown list. 
     * @returns {string}
     */
    writeTOC(){
        this.#tocSection.content = this.#sections.map((section) => section.tocEntry()).join("\n");
        return this.#tocSection.entry();
    }
    /**
     * @method writeBody
     * @desc assemble the sections together into a single string. Sections are assembled double-spaced.
     * @returns {string}
     */
    writeBody(){
        // We should double space this
        return this.#sections.map((section) => section.entry()).join("\n");
    }
    /**
     * @method writeDoc
     * @desc output the title section, toc, and document body as a string
     * @returns {string}
     */
    writeDoc(){
        return [
            this.writeTitleSection(),
            this.writeTOC(),
            this.writeBody()
        ].join("");
    }
}