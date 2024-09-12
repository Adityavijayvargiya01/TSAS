import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export default async function ScheduleSlot(){

    const supabase = createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    let string = 'Slot_Mon'

    let { data, error } = await supabase
        .from(string)
        .select('*')

    let Slot_Table = data

    if (error) {
        console.error('Error fetching data:', error);
        return <div>Error loading schedule. Please try again later.</div>;
    }

    const timeSlots = [
        "9:00 - 9:45", "9:45 - 10:30", "10:30 - 11:15", "11:15 - 12:00",
        "12:00 - 12:45", "12:45 - 1:30", "1:30 - 2:15", "2:15 - 3:00",
        "3:00 - 3:45", "3:45 - 4:30", "4:30 - 5:15", "5:15 - 6:00"
    ];


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
                    {timeSlots.map((time, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-center">{time}</TableCell>
                            <TableCell className="text-center"> - </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    );
};


