import { ReactNode } from 'react';
import Header from './Header';

type Props = {
    children: ReactNode;
};

const RootLayout = ({ children }: Props) => {
    return (
        <div className='grid min-h-screen grid-rows-[auto_1fr]'>
            <Header />
            <main className='mx-auto w-full max-w-7xl'>{children}</main>
        </div>
    );
};

export default RootLayout;
