import { ReactNode } from 'react';
import Header from './Header';

type Props = {
    children: ReactNode;
};

const RootLayout = ({ children }: Props) => {
    return (
        <div className='grid h-screen grid-rows-[auto_1fr] overflow-auto'>
            <Header />
            <main>{children}</main>
        </div>
    );
};

export default RootLayout;
