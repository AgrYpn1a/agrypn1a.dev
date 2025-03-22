import unified from 'unified';
import inspectUrls from 'rehype-url-inspector';

export const BASE_PATH = '/org';

const resourceTest = /\.(svg|png|jpe?g|gif|mp4|pdf|txt|sh|zip)$/i;
export function isResource(path: string): boolean {
    return resourceTest.test(path);
}

export default function resolveLinks(files: any) {
    // map from id -> { path, url }
    const idMap: Record<string, Record<string, string>> = {};
    files.forEach((file: any) => {
        // TODO: After resolving ids, uncomment this
        Object.entries(file.data.ids).forEach(([id, anchor]) => {
            idMap[id] = { path: file.path as string, anchor: anchor as string };
        });
    });

    const processor = unified().use(fromJson).use(inspectUrls, { inspectEach: processUrl }).use(toJson);

    return Promise.all(files.map((file: any) => processor.process(file)));

    /**
     * Process each link to:
     * 1. Resolve id links.
     * 2. Convert relative file:// links to path used by
     *    blog. file://file.org -> /file.org
     * 3. Collect all links to file.data.links, so they can be used later
     *    to calculate backlinks.
     */
    function processUrl({ url: urlString, propertyName, node, file }: any) {
        try {
            // next/link does not handle relative urls properly. Use
            // file.path (the slug of the file) to normalize link against.
            let url = new URL(urlString, 'file://' + file.path);

            // Process ID links
            if (url.protocol === 'id:') {
                // id links
                const id = url.pathname;
                const ref = idMap[id];

                if (ref) {
                    url = new URL(`file://${ref.path}${ref.anchor}`);
                } else {
                    console.warn(`${file.path}: Unresolved id link`, urlString);
                }
                // fallthrough. id links are re-processed as file links
            }

            node.properties.className = node.properties.className || [];

            // Process final links
            if (url.protocol === 'file:') {
                let href = url.pathname.replace(/\.org$/, '');
                node.properties[propertyName] = href + url.hash;

                file.data.links = file.data.links || [];
                file.data.links.push(href);

                if (isResource(url.pathname)) {
                    node.properties.className.push('resource');
                }
            } else if (url.protocol === 'id:') {
                node.properties.className.push('broken');
            } else {
                node.properties.className.push('external');
            }
        } catch (e) {
            // This can happen if org file contains an invalid string, that
            // looks like URL string (e.g., "http://example.com:blah/"
            // passes regexes, but fails to parse as URL).
            console.warn(`${file.path}: Failed to process URL`, urlString, e);
            // No re-throwing: the issue is not critical enough to stop
            // processing. The document is still valid, it's just link that
            // isn't.
        }
    }
}

function fromJson(this: any) {
    this.Parser = (node: any, file: any) => {
        return file.result || JSON.parse(node);
    };
}

function toJson(this: any) {
    this.Compiler = (node: any) => {
        return node;
    };
}
