'use client';

import React, { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

type Props = { children: ReactNode };

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10 * (60 * 1000), // 10 mins
        },
    },
});

const ReactQueryProvider = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;
