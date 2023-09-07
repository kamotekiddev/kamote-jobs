import { create } from 'zustand';

type SearchQuery = {
    searchQuery: string;
    onChange: (value: string) => void;
};

const useSearchTextStore = create<SearchQuery>()((set) => ({
    searchQuery: '',
    onChange: (searchQuery) => set({ searchQuery }),
}));

export default useSearchTextStore;
