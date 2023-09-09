import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select';

type Props = {
    data: { label: string; value: string }[];
    onChange: (value: string) => void;
    value: string;
    placeholder?: string;
};
const FilterSelector = ({
    data,
    onChange,
    value,
    placeholder = 'Select Option',
}: Props) => {
    return (
        <Select defaultValue={value || undefined} onValueChange={onChange}>
            <SelectTrigger className='w-max min-w-[100px] gap-4'>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {data.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default FilterSelector;
