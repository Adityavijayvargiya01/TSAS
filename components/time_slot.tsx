"use client"

import * as React from "react"
import { format } from "date-fns"
import { Clock as ClockIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type TimeSlot = {
    start: string;
    end: string;
}

export function TimeSlotPicker({
                                   className,
                               }: React.HTMLAttributes<HTMLDivElement>) {
    const [timeSlot, setTimeSlot] = React.useState<TimeSlot | undefined>()

    const hours = Array.from({ length: 24 }, (_, i) => i)
    const minutes = ['00', '15', '30', '45']

    const timeOptions = hours.flatMap(hour =>
        minutes.map(minute => `${hour.toString().padStart(2, '0')}:${minute}`)
    )

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="timeslot"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !timeSlot && "text-muted-foreground"
                        )}
                    >
                        <ClockIcon className="mr-2 h-4 w-4" />
                        {timeSlot ? (
                            <>
                                {timeSlot.start} - {timeSlot.end}
                            </>
                        ) : (
                            <span>Pick a time slot</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                    <div className="grid gap-4 p-4">
                        <div className="grid gap-2">
                            <div className="grid grid-cols-2 gap-2">
                                <Select onValueChange={(value) => setTimeSlot(prev => ({ ...prev, start: value }))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Start Time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timeOptions.map(time => (
                                            <SelectItem key={time} value={time}>{time}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select onValueChange={(value) => setTimeSlot(prev => ({ ...prev, end: value }))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="End Time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timeOptions.map(time => (
                                            <SelectItem key={time} value={time}>{time}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}