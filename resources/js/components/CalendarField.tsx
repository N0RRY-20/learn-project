'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as Celender } from 'lucide-react';

type CalendarFieldProps = {
    label?: string;
    name?: string;
    value?: string; // formatted yyyy-mm-dd
    onChange?: (value: string) => void;
    required?: boolean;
    defaultDate?: string; // backward compat
};

export function CalendarField({ label, name, value, onChange, required, defaultDate }: CalendarFieldProps) {
    const [open, setOpen] = React.useState(false);
    const initial = value ?? defaultDate;
    const [date, setDate] = React.useState<Date | undefined>(initial ? new Date(initial) : undefined);

    const format = (d?: Date) => {
        if (!d) return '';
        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    };

    const resolvedLabel = label ?? 'Tanggal Lahir';
    const resolvedName = name ?? 'birth_date';

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor={resolvedName} className="px-1">
                {resolvedLabel}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" id={resolvedName} className="w-48 justify-between font-normal">
                        {date ? date.toLocaleDateString() : 'Pilih Tanggal'}
                        <Celender />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        className="w-[350px] p-4"
                        onSelect={(d) => {
                            setDate(d);
                            setOpen(false);
                            const formatted = format(d);
                            if (onChange) onChange(formatted);
                        }}
                    />
                </PopoverContent>
            </Popover>
            <input type="hidden" name={resolvedName} value={format(date)} required={required ?? true} />
        </div>
    );
}
