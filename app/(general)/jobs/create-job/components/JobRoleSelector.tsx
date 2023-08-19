import { Check, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import useDebounce from '@/hooks/useDebounce';
import useFetchAndSearchRoles from '@/hooks/useFetchAndSearchRoles';
import useOutsideClick from '@/hooks/useOutsideClick';

type Props = {
    error?: string;
    onSelectRoles: (roles: string[]) => void;
    selectedRoles: string[];
};

const JobRoleSelector = ({ error, selectedRoles, onSelectRoles }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 300);
    const { data: jobRoles, isFetching } =
        useFetchAndSearchRoles(debouncedSearchQuery);

    return (
        <FormItem>
            <FormLabel>Job Roles</FormLabel>
            <JobRoleInput
                isSearching={isFetching}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                data={jobRoles?.map(({ role }) => role)}
                onSelectRoles={onSelectRoles}
                selectedRoles={selectedRoles}
            />
            {!!error && <FormMessage>{error}</FormMessage>}
        </FormItem>
    );
};

export default JobRoleSelector;

type JobFinderProps = {
    searchQuery: string;
    onSearchQueryChange: (value: string) => void;
    data?: string[];
    onSelectRoles: (roles: string[]) => void;
    selectedRoles: string[];
    isSearching?: boolean;
};
const JobRoleInput = ({
    data = [],
    searchQuery,
    onSearchQueryChange,
    onSelectRoles,
    selectedRoles,
    isSearching,
}: JobFinderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useOutsideClick({
        ref: dropdownRef,
        onOutsideClick: () => setIsOpen(false),
    });

    const addRole = (role: string) => {
        onSearchQueryChange('');
        if (selectedRoles.includes(role))
            return onSelectRoles(
                selectedRoles.filter((selectedRole) => selectedRole !== role)
            );
        return onSelectRoles([...selectedRoles, role]);
    };

    const addRoleFromSearchQuery = (searchQuery: string) => {
        setIsOpen(false);
        addRole(searchQuery);
    };

    const removeSelectedRole = (role: string) =>
        onSelectRoles(
            selectedRoles.filter((selectedRole) => selectedRole !== role)
        );

    return (
        <section className='relative space-y-2' ref={dropdownRef}>
            <Input
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                onFocus={() => setIsOpen(true)}
            />
            <section className='flex flex-wrap gap-2'>
                {selectedRoles.map((role) => (
                    <Badge
                        variant='secondary'
                        className='capitalize'
                        key={role}
                    >
                        {role}
                        <X
                            className='ml-2 h-4 w-4 cursor-pointer'
                            onClick={() => removeSelectedRole(role)}
                        />
                    </Badge>
                ))}
            </section>
            {isOpen && (
                <ScrollArea className='h-max max-h-[300px] select-none overflow-auto rounded-lg border p-3 shadow-md'>
                    {isSearching && (
                        <ClipLoader
                            aria-label='Loading Spinner'
                            data-testid='loader'
                        />
                    )}
                    {data.length <= 0 && !isSearching && (
                        <div className='space-y-4 p-2'>
                            <p>No Data Found</p>
                            {searchQuery && (
                                <div className='flex items-center gap-2'>
                                    <Button
                                        size='sm'
                                        type='button'
                                        onClick={() =>
                                            addRoleFromSearchQuery(searchQuery)
                                        }
                                    >
                                        Add
                                    </Button>
                                    <p>{`"${searchQuery}"`}</p>
                                </div>
                            )}
                        </div>
                    )}
                    {data.map((role) => (
                        <div
                            key={role}
                            className='flex cursor-pointer gap-2 rounded-md p-2 capitalize transition-all duration-150 ease-linear hover:bg-slate-100'
                            onClick={() => addRole(role)}
                        >
                            <Check
                                className={cn('opacity-0', {
                                    'opacity-100': selectedRoles.includes(role),
                                })}
                            />
                            {role}
                        </div>
                    ))}
                </ScrollArea>
            )}
        </section>
    );
};
