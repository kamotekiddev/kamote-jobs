'use client';

import { useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useSearchTextStore from '@/hooks/useSearchText';

const SearchBox = () => {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const { searchQuery, onChange, clearSearchQuery } = useSearchTextStore();

    const handleSearchClick = () => {
        inputRef.current?.focus();
        router.push('/jobs');
    };

    return (
        <section
            onClick={handleSearchClick}
            className='relative flex w-full items-center gap-2 rounded-full bg-white px-3 pr-8 transition-all duration-300 ease-in-out focus-within:ring-1 focus-within:ring-black'
        >
            <Search className='h-4 w-4' />
            <input
                ref={inputRef}
                placeholder='Search Jobs...'
                value={searchQuery}
                onChange={(e) => onChange(e.target.value)}
                className='bg-transparent p-2 focus:outline-none'
            />
            {searchQuery && (
                <X
                    className='absolute right-4 h-4 w-4 cursor-pointer'
                    onClick={clearSearchQuery}
                />
            )}
        </section>
    );
};

export default SearchBox;
