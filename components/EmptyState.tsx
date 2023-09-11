import { ReactNode } from 'react';
import { HardDrive } from 'lucide-react';

type Props = { title?: string; icon?: ReactNode };

const EmptyState = ({ title = 'No Record Found.', icon }: Props) => {
    return (
        <section className='space-y-4 rounded border bg-white p-4 text-slate-700 shadow-sm'>
            {icon || <HardDrive className='mb-4 h-10 w-10' />}
            {title}
        </section>
    );
};

export default EmptyState;
