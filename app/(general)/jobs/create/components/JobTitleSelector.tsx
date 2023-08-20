import { Check, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import useDebounce from '@/hooks/useDebounce';
import useFetchAndSearchJobTitles from '@/hooks/useFetchAndSearchRoles';
import useOutsideClick from '@/hooks/useOutsideClick';

type Props = {
    error?: string;
    label: string;
    onChange: (value: string) => void;
    value: string;
};

const JobTitleSelector = ({ error, label, value, onChange }: Props) => {
    const debouncedSearchQuery = useDebounce(value, 300);
    const { data: jobTitles, isFetching } =
        useFetchAndSearchJobTitles(debouncedSearchQuery);

    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <JobTitleInput
                isSearching={isFetching}
                jobTitles={jobTitles?.map((jobTitle) => jobTitle.name)}
                onChange={onChange}
                value={value}
            />
            {!!error && <FormMessage>{error}</FormMessage>}
        </FormItem>
    );
};

export default JobTitleSelector;

type JobFinderProps = {
    jobTitles?: string[];
    onChange: (value: string) => void;
    value: string;
    isSearching?: boolean;
};
const JobTitleInput = ({
    jobTitles = [],
    onChange,
    value,
    isSearching,
}: JobFinderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useOutsideClick({
        ref: dropdownRef,
        onOutsideClick: () => setIsOpen(false),
    });

    return (
        <section className='relative space-y-2' ref={dropdownRef}>
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsOpen(true)}
            />
            {isOpen && value && (
                <ScrollArea className='h-max max-h-[300px] select-none overflow-auto rounded-lg border p-3 shadow-md'>
                    {isSearching && (
                        <ClipLoader
                            aria-label='Loading Spinner'
                            data-testid='loader'
                        />
                    )}
                    {jobTitles.length <= 0 && !isSearching && (
                        <div className='space-y-4 p-2'>
                            <p>No Data Found</p>
                        </div>
                    )}
                    {jobTitles.map((jobTitle) => (
                        <div
                            key={jobTitle}
                            className='flex cursor-pointer gap-2 rounded-md p-2 capitalize transition-all duration-150 ease-linear hover:bg-slate-100'
                            onClick={() => {
                                onChange(jobTitle);
                                setIsOpen(false);
                            }}
                        >
                            <Check
                                className={cn('opacity-0', {
                                    'opacity-100': value === jobTitle,
                                })}
                            />
                            {jobTitle}
                        </div>
                    ))}
                </ScrollArea>
            )}
        </section>
    );
};
