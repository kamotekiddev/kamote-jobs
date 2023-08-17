import { ReactNode } from 'react';
import Header from './Header';

type Props = {
    children: ReactNode;
};

const RootLayout = ({ children }: Props) => {
    return (
        <div className='min-h-screen'>
            <Header />
            <main className='mx-auto max-w-7xl'>{children}</main>
        </div>
    );
};

export default RootLayout;
