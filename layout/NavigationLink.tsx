'use client';

import { Button } from '@/components/ui/button';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type NavigationLinkProps = {
    icon: ReactNode;
    children: ReactNode;
} & LinkProps;

const NavigationLink = (props: NavigationLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === props.href;

    return (
        <Link {...props}>
            <Button
                size='sm'
                variant={isActive ? 'secondary' : 'link'}
                className='flex items-center gap-2'
            >
                {props.icon}
                {props.children}
            </Button>
        </Link>
    );
};

export default NavigationLink;
