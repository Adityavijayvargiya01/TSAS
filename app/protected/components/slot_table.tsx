import React from 'react';
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ToastDemo } from "@/app/protected/components/toast_mail";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Schedule_slot from "@/components/schedule_slot";

interface Slot {
    sno: string;
    facultyName: string;
    classes1: string;
    classes2: string;
    status: 'Occupied' | 'Vacant' | 'Partially Occupied';
}

const Slot = [
    {
        sno: "1",
        facultyName: "Dr. John Doe",
        classes1: "Mathematics 101",
        classes2: "Physics 202",
        status: "Occupied",
    },
    {
        sno: "2",
        facultyName: "Prof. Jane Smith",
        classes1: "-",
        classes2: "-",
        status: "Vacant",
    },
    {
        sno: "3",
        facultyName: "Dr. Robert Johnson",
        classes1: "Computer Science 201",
        classes2: "Data Structures 301",
        status: "Occupied",
    },
    {
        sno: "4",
        facultyName: "Prof. Emily Brown",
        classes1: "Literature 101",
        classes2: "Creative Writing 202",
        status: "Occupied",
    },
    {
        sno: "5",
        facultyName: "Dr. Michael Lee",
        classes1: "Economics 201",
        classes2: "-",
        status: "Partially Occupied",
    }
];


export default async function ProtectedPage() {
    const supabase = createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    let string = 'Slot_Mon'
    let { data: Slot_Mon, error } = await supabase
        .from(string)
        .select('MUJ_ID')

    if (error) {
        console.error('Error fetching data:', error)
    } else {
        console.log('Raw data:', Slot_Mon) // Log the raw data

        if (Slot_Mon && Array.isArray(Slot_Mon) && Slot_Mon.length > 0) {

        } else {
            console.log('No data found or data is not in expected format')
            console.log('Type of Slot_Mon:', typeof Slot_Mon)
            console.log('Is Slot_Mon an array?', Array.isArray(Slot_Mon))
            if (Array.isArray(Slot_Mon)) {
                console.log('Length of Slot_Mon:', Slot_Mon.length)
            }
        }
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>MUJ ID</TableHead>
                        <TableHead>Faculty Name</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead>Send Mail</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Slot.map((slot) => (
                        <TableRow key={slot.sno}>
                            <TableCell className="font-medium text-center">{slot.sno}</TableCell>
                            <TableCell>{slot.facultyName}</TableCell>
                            <TableCell className="text-center">
                                <Popover>
                                <PopoverTrigger>View Schedule</PopoverTrigger>
                                <PopoverContent><Schedule_slot /></PopoverContent>
                                </Popover>
                            </TableCell>

                            <TableCell className="text-right">
                <span className={`${
                    slot.status === 'Occupied' ? 'text-red-600' :
                        slot.status === 'Vacant' ? 'text-green-600' : 
                            slot.status === 'Partially Occupied' ? 'text-yellow-400': ''
                }`}>
                  {slot.status}
                </span>
                            </TableCell>
                            <TableCell><ToastDemo /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}