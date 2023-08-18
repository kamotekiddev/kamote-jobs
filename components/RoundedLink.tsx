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
                'rounded-full px-4 py-1 text-sm transition-colors duration-100 ease-linear hover:bg-slate-200',
                {
                    'bg-slate-900 text-white hover:bg-slate-600': isActive,
                }
            )}
        >
            {children}
        </Link>
    );
};

export default RoundedLink;
