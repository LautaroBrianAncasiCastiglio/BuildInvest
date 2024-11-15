"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

function ProjectDateSelector({
    className,
    date,
    onDateChange,
}: React.HTMLAttributes<HTMLDivElement> & {
    date: DateRange;
    onDateChange: (date: DateRange) => void;
}) {
    return (
        <div className={cn("grid gap-2 w-full", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                        )}
                    >
                        <CalendarIcon className="mr-2" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "dd 'de' LLLL, y", {
                                        locale: es,
                                    })}{" "}
                                    -{" "}
                                    {format(date.to, "dd 'de' LLLL, y", {
                                        locale: es,
                                    })}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(range) => onDateChange(range as DateRange)}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default ProjectDateSelector;
