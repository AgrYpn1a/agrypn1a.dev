import React from 'react';

import unified from 'unified';
import rehype2react from 'rehype-react';
import Link from 'next/link';

// import Link from './Link';

const Heading: React.FC<{ children?: any }> = ({ children }) => <h2 id={children.toString().replace(' ', '-').toLowerCase()}>{children}</h2>;

const SubHeading: React.FC<{ children?: any }> = ({ children }) => <h3 id={children.toString().replace(' ', '-').toLowerCase()}>{children}</h3>;

// we use rehype-react to process hast and transform it to React
// component, which allows as replacing some of components with custom
// implementation. e.g., we can replace all <a> links to use
// `next/link`.
const processor = unified().use(rehype2react, {
    createElement: React.createElement,
    Fragment: React.Fragment,
    components: {
        a: Link,
        h1: Heading,
        h2: SubHeading,
    },
});

const Rehype = ({ hast }: any) => {
    return <>{processor.stringify(hast)}</>;
};

export default Rehype;
