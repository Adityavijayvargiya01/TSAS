import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
];


const ScheduleSlot: React.FC = () => {
    return (
        <main>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">TIME</TableHead>
                        <TableHead className="text-center">CLASS</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {timeSlots.map((timeSlot, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-center">{timeSlot}</TableCell>
                            <TableCell className="text-center">-</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    );
};

export default ScheduleSlot;
