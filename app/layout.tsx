import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/provider/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import ReactQueryProvider from '@/provider/ReactQueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Kamote Jobs',
    description: 'Explore the jobs here.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
