'use client';

import { Search } from 'lucide-react';
import useSearchTextStore from '@/hooks/useSearchText';

const SearchBox = () => {
    const { searchQuery, onChange } = useSearchTextStore();

    return (
        <section className='roundef-full flex items-center gap-2 rounded-full bg-slate-100 px-2 pl-3 focus-within:ring-1 focus-within:ring-black'>
            <Search />
            <input
                value={searchQuery}
                onChange={(e) => onChange(e.target.value)}
                className='bg-transparent p-2 focus:outline-none'
            />
        </section>
    );
};

export default SearchBox;
