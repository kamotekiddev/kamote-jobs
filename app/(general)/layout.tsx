import React, { ReactNode } from 'react';
import RootLayout from '@/layout/RootLayout';

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return <RootLayout>{children}</RootLayout>;
};

export default Layout;
