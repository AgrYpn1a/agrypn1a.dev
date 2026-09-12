import unified from 'unified';

import orgParse from 'uniorg-parse';
import org2rehype from 'uniorg-rehype';
import extractKeywords from 'uniorg-extract-keywords';
import { uniorgSlug } from 'uniorg-slug';
import { visitIds } from 'orgast-util-visit-ids';
import katex from 'rehype-katex';
import { VFile } from 'vfile-reporter/lib';
import { Headline } from 'uniorg';
import toc from 'rehype-toc';

const processor = unified()
    .use(orgParse) // -
    .use(extractKeywords) // -
    .use(uniorgSlug) // -
    .use(extractIds) // -
    .use(org2rehype) // -
    .use(toc) // -
    .use(katex, { output: 'html' }) // - HTML output renders like real LaTeX (needs katex.min.css)
    .use(fixStyleProps) // - must run after katex, which emits string style props
    .use(toJson);

export default async function orgToHtml(file: VFile) {
    try {
        return await processor.process(file);
    } catch (e) {
        console.error('failed to process file', file.path, e);
        throw e;
    }
}

// function saveProperties() {
//     return transformer;

//     function transformer(tree: any, file: any) {
//         const data = file.data || (file.data = {});

//         const props = tree.children.find(
//             (node: any) => node.type === 'property-drawer'
//         ) as PropertyDrawer | undefined;
//         if (!props) {
//             return;
//         }
//         visit(props, 'node-property', (prop: NodeProperty) => {
//             data[prop.key] = prop.value;
//         });
//     }
// }

// rehype-react rejects a string `style` prop, but KaTeX's MathML output emits
// bogus `style="false"` attributes. Convert every string `style` in the hast to
// a React style object (an unparseable value like "false" becomes `{}`).
function fixStyleProps() {
    return (tree: any) => walk(tree);

    function walk(node: any) {
        if (node?.properties && typeof node.properties.style === 'string') {
            node.properties.style = parseStyle(node.properties.style);
        }
        node?.children?.forEach(walk);
    }

    function parseStyle(value: string): Record<string, string> {
        const style: Record<string, string> = {};
        value.split(';').forEach((decl) => {
            const idx = decl.indexOf(':');
            if (idx === -1) return;
            const prop = decl.slice(0, idx).trim();
            const val = decl.slice(idx + 1).trim();
            if (!prop) return;
            const key = prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
            style[key] = val;
        });
        return style;
    }
}

function extractIds() {
    return transformer;

    function transformer(tree: any, file: any) {
        const data: any = file.data || (file.data = {});
        // ids is a map: id => #anchor
        const ids = data.ids || (data.ids = {});

        visitIds(tree, (id, node) => {
            // console.log(`node type -> ${node.type}`);
            // console.log('node: ', node);
            if (node.type === 'org-data') {
                ids[id] = '';
            } else if (node.type === 'section') {
                const headline = node.children[0] as Headline;
                const data: any = (headline.data = headline.data || {});

                if (!data?.hProperties?.id) {
                    // The headline doesn't have an html id assigned. (Did you
                    // remove uniorg-slug?)
                    //
                    // Assign an html id property based on org id property.
                    data.hProperties = headline.data.hProperties || {};
                    data.hProperties.id = id;
                }

                ids[id] = '#' + data.hProperties?.id;
            }
        });
    }
}

/** A primitive compiler to return node as is without stringifying. */
function toJson(this: any) {
    this.Compiler = (node: any) => {
        return node;
    };
}
