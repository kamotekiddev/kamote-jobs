'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';
import { cn } from '@/lib/utils';

type Props = LinkProps & { children: ReactNode };
const JobNavigationLink = ({ children, ...props }: Props) => {
    const pathname = usePathname();
    const isActive = props.href === pathname;

    return (
        <Link
            {...props}
            className={cn(
                'rounded-md p-2 px-4 transition-all duration-300 ease-linear hover:underline',
                { 'bg-slate-100 hover:no-underline': isActive }
            )}
        >
            {children}
        </Link>
    );
};

export default JobNavigationLink;
