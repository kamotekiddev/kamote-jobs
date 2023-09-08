import { create } from 'zustand';

type SearchQuery = {
    searchQuery: string;
    onChange: (value: string) => void;
    clearSearchQuery: () => void;
};

const useSearchTextStore = create<SearchQuery>()((set) => ({
    searchQuery: '',
    onChange: (searchQuery) => set({ searchQuery }),
    clearSearchQuery: () => set({ searchQuery: '' }),
}));

export default useSearchTextStore;
