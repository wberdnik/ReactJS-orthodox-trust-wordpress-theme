/* Refactored by VLF from original code
* @url https://johnresig.com/apps/htmlparser/
*
 * HTML Parser
 * @author John Resig (ejohn.org)
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 *
 * // Use like so:
 * HTMLParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *

 *
 */

const makeMap = str => str.split(",").reduce((prev, current) => {
    prev[current] = !0;
    return prev
}, {})


// Regular Expressions for parsing tags and attributes
const START_TAG_REGULAR = /^<([-A-Za-z0-9_]+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
    END_TAG_REGULAR = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
    ATTR_REGULAR = /([-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

// Empty Elements - HTML 4.01
const EMPTY_BODY_TAGS = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");

// Block Elements - HTML 4.01
const BLOKS_TAGS = makeMap("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul");

// Inline Elements - HTML 4.01
const INLINE_TAGS = makeMap("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
const SELFCLOSE_TAGS = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
const DISABLED_FILL_ATTRS = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
const SPECIAL_TAGS = makeMap("script,style");


export default class SAXParser {
    /* Demo Hooks
     start: (tag, attrs, unary) => {
                cat("<" + tag)
                cat(
                    attrs.reduce((prev, curr) => {
                        return `${prev} ${curr.name}="${curr.escaped}"`
                    }, '')
                )
                cat(unary ? "/>" : ">")
            },
            end: tag => cat(`</${tag}>`),
            chars: text => cat(text),
            comment: text => cat(`<!--${text}-->`)
     */
    constructor(hooks) {
        this.localStack = []
        this.hooks = hooks
    }

    get topStack() {
        return this.localStack[this.localStack.length - 1]
    }

    // Main parser with Hooks
    Parse(html) {

        let lastIterHTML = html///for catcher
        while (html) {


            // Make sure we're not in a script or style element
            if (!this.topStack || !SPECIAL_TAGS[this.topStack]) { // стек пустой или там не нужный тег
                let chars = 1
                // Comment
                if (html.indexOf("<!--") === 0) {
                    const index = html.indexOf("-->");

                    if (~index) {
                        this.hooks.comment && this.hooks.comment(html.substring(4, index))
                        html = html.substring(index + 3)
                        chars = 0
                    }

                    // end tag
                } else if (html.indexOf("</") === 0) {
                    const match = html.match(END_TAG_REGULAR)

                    if (match) {
                        html = html.substring(match[0].length)
                        match[0].replace(END_TAG_REGULAR, this._parseEndTag.bind(this))
                        chars = 0
                    }

                    // start tag
                } else if (html.indexOf("<") === 0) {
                    const match = html.match(START_TAG_REGULAR);

                    if (match) {
                        html = html.substring(match[0].length);
                        match[0].replace(START_TAG_REGULAR, this._parseStartTag.bind(this));
                        chars = 0
                    }
                }


                if (chars) {
                    const index = html.indexOf("<")
                    this.hooks.chars && this.hooks.chars(~index ? html.substring(0, index) : html)

                    html = ~index ? html.substring(index) : ''
                }

            } else {
                html = html.replace(new RegExp("(.*)<\/" + this.topStack + "[^>]*>"),
                    this.hooks.chars ?
                    (all, text) => {
                        this.hooks.chars(
                            text.replace(/<!--(.*?)-->/g, "$1")
                                .replace(/<!\[CDATA\[(.*?)]]>/g, "$1"))
                        return ''
                    } :
                        ''
                    )

                this._parseEndTag("", this.topStack);
            }

            //catcher
            if (html === lastIterHTML)
                throw "Parse Error: " + html;
            lastIterHTML = html;
        }

        // Clean up any remaining tags
        this._parseEndTag();

    }

    _parseStartTag(tag, tagName, rest, unary) {
        tagName = tagName.toLowerCase()
        unary = EMPTY_BODY_TAGS[tagName] || !!unary

        if (BLOKS_TAGS[tagName]) {
            while (this.topStack && INLINE_TAGS[this.topStack]) this._parseEndTag("", this.topStack)
        }

        if (SELFCLOSE_TAGS[tagName] && this.topStack === tagName) {
            this._parseEndTag("", tagName)
        }

        unary || this.localStack.push(tagName)

        if (!this.hooks.start) return

        //Сбор списка аттрибутов для хука
        const attrs = [];
        rest.replace(ATTR_REGULAR,
            function (match, name) {
                const value =
                    arguments[2] ? arguments[2] :
                        arguments[3] ? arguments[3] :
                            arguments[4] ? arguments[4] :
                                DISABLED_FILL_ATTRS[name] ? name : "";
                const escaped = value.replace(/(^|[^\\])"/g, '$1\\\"')
                attrs.push({name, value, escaped})
            })

        this.hooks.start(tagName, attrs, unary)

    }

    _parseEndTag(tag, tagName) {
        // If no tag name is provided, clean shop
        let pos = 0;
        // Find the closest opened tag of the same type
        if (tagName)
            for (pos = this.localStack.length - 1; pos >= 0; pos--)
                if (this.localStack[pos] === tagName)
                    break;

        if (pos < 0) return

        // Close all the open elements, up the stack
        if (this.hooks.end)
            for (let i = this.localStack.length - 1; i >= pos; i--) this.hooks.end(this.localStack[i])

        // Remove the open elements from the stack
        this.localStack.length = pos
    }

}


