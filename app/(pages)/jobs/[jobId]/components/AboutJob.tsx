import React, { CSSProperties } from 'react';
import parse, {
    Element,
    HTMLReactParserOptions,
    attributesToProps,
    domToReact,
} from 'html-react-parser';
import { FullJobPost } from '@/types/jobPost';

type Props = {
    jobPost?: FullJobPost;
};

// const options: HTMLReactParserOptions = {
//     replace: (n) => {
//         const node = n as Element;

//         if (node.attribs && node.attribs.style) {
//             const style = node.attribs.style;
//             const elementProps: React.HTMLAttributes<any> = {
//                 style: { ...parseStyles(style) },
//             };

//             return React.createElement(node.name, elementProps, node.children);
//         }
//     },
// };

const AboutJob = ({ jobPost }: Props) => {
    // const components = parse(jobPost?.content || '', options);

    return (
        <article className='rounded-lg border bg-white p-4 shadow-sm'>
            <h1 className='mb-4 rounded-lg bg-red-50 p-2 px-4 text-4xl font-black text-red-500'>
                Ongoing Maintenance Update
            </h1>
            {/* {domToReact(components)} */}
            {jobPost?.content}
        </article>
    );
};
// const parseStyles = (style: string) => {
//     return style.split(';').reduce((acc, styleDeclaration) => {
//         const [property, value] = styleDeclaration
//             .split(':')
//             .map((s) => s.trim());
//         if (property && value) {
//             acc[property] = value;
//         }
//         return acc;
//     }, {} as CSSProperties);
// };

export default AboutJob;
