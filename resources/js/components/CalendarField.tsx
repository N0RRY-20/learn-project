'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as Celender } from 'lucide-react';

export function CalendarField() {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    const format = (d?: Date) => {
        if (!d) return '';
        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    };

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
                Tanggal Lahir
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" id="date" className="w-48 justify-between font-normal">
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
                        }}
                    />
                </PopoverContent>
            </Popover>
            <input type="hidden" name="tanggal_lahir" value={format(date)} required />
        </div>
    );
}
