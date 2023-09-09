import { create } from 'zustand';

type HiringStatusStore = {
    hiringStatus: string;
    setHiringStatus: (status: string) => void;
};

const useHiringStatus = create<HiringStatusStore>()((set) => ({
    hiringStatus: '',
    setHiringStatus: (status) => set({ hiringStatus: status }),
}));

export default useHiringStatus;
