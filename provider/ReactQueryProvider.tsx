'use client';

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

type Props = { children: ReactNode };

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10 * (60 * 1000),
        },
    },
});

const ReactQueryProvider = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;
