import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/provider/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import ReactQueryProvider from '@/provider/ReactQueryProvider';
import getCurrentUser from '@/actions/getCurrentUser';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'JOBSEEK',
    description: 'Explore the jobs here.',
};

type Props = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <AuthProvider>
                    <ReactQueryProvider>{children}</ReactQueryProvider>
                </AuthProvider>
                <Toaster />
            </body>
        </html>
    );
}
