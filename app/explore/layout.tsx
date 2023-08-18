import RootLayout from '@/layout/RootLayout';
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};
const Layout = ({ children }: Props) => {
    return <RootLayout>{children}</RootLayout>;
};

export default Layout;
