import { FormItem, FormLabel, FormMessage } from './ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type Props = {
    label: string;
    error?: string;
    value: string;
    data: { label: string; value: string }[];
    onChange: (value: string) => void;
};

const FormSelect = ({ error, value, onChange, label, data = [] }: Props) => (
    <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder='Theme' />
            </SelectTrigger>
            <SelectContent>
                {data.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                        {d.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        <FormMessage>{error}</FormMessage>
    </FormItem>
);

export default FormSelect;
