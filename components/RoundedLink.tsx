'use client';

import { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type Props = LinkProps & {
    children: ReactNode;
};
const RoundedLink = ({ children, ...props }: Props) => {
    const pathname = usePathname();
    const isActive = pathname.includes(props.href as string);

    return (
        <Link
            {...props}
            className={cn(
                'rounded-full px-4 py-1 text-sm transition-colors duration-300 ease-linear',
                {
                    'bg-slate-900 text-white': isActive,
                }
            )}
        >
            {children}
        </Link>
    );
};

export default RoundedLink;
