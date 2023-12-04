import React from 'react';
import parse, {
    DOMNode,
    Element,
    HTMLReactParserOptions,
    attributesToProps,
    domToReact,
} from 'html-react-parser';
import './about.css';
import { FullJobPost } from '@/types/jobPost';

type Props = {
    jobPost?: FullJobPost;
};

const options: HTMLReactParserOptions = {
    replace: (n) => {
        const node = n as Element;

        if (node.attribs && node.attribs.style) {
            const props = attributesToProps(node.attribs);
            const children = domToReact(node.children as DOMNode[], options);
            return React.createElement(node.name, props, children);
        }
    },
};

const AboutJob = ({ jobPost }: Props) => {
    const components = parse(jobPost?.content || '', options);

    return (
        <article className='about rounded-lg border bg-white p-4 shadow-sm'>
            {components}
        </article>
    );
};

export default AboutJob;
