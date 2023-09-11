import { create } from 'zustand';

type ApplicationStatusStore = {
    applicationStatus: string;
    setApplicationStatus: (value: string) => void;
};

const useApplicationStatus = create<ApplicationStatusStore>()((set) => ({
    applicationStatus: 'all',
    setApplicationStatus: (applicationStatus) => set({ applicationStatus }),
}));

export default useApplicationStatus;
