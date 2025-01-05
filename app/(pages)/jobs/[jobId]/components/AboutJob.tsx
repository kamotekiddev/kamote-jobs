import React from 'react';
import parse, {
    DOMNode,
    Element,
    HTMLReactParserOptions,
    attributesToProps,
    domToReact,
} from 'html-react-parser';
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
    const aboutSection = parse(jobPost?.content || '', options);

    return (
        <div className='rounded-lg border bg-white p-4 shadow-sm'>
            <article className='prose prose-p:m-0 prose-headings:m-0 prose-headings:mb-2 prose-p:leading-tight prose-li:leading-tight prose-p:mb-2'>
                {aboutSection}
            </article>
        </div>
    );
};

export default AboutJob;
