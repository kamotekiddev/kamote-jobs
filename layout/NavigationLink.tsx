'use client';

import { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
    TooltipContent,
} from '@/components/ui/tooltip';

type NavigationLinkProps = {
    icon: ReactNode;
    children: ReactNode;
    toolTip: string;
} & LinkProps;

const NavigationLink = (props: NavigationLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === props.href;

    return (
        <Link {...props}>
            <Button
                size='sm'
                variant={isActive ? 'secondary' : 'link'}
                className='hidden items-center gap-2 md:flex'
            >
                {props.icon}
                {props.children}
            </Button>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            size='icon'
                            variant={isActive ? 'secondary' : 'link'}
                            className='flex items-center gap-2 md:hidden'
                        >
                            {props.icon}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>{props.toolTip}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </Link>
    );
};

export default NavigationLink;
