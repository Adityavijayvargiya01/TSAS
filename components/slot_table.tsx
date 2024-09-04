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
import {Button} from "@/components/ui/button";
import { ToastDemo } from "@/components/toast_mail";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Schedule_slot from "@/components/schedule_slot";

const slots = [
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
    },
    {
        sno: "6",
        facultyName: "Prof. Sarah Wilson",
        classes1: "Psychology 101",
        classes2: "Sociology 201",
        status: "Occupied",
    },
    {
        sno: "7",
        facultyName: "Dr. William Harris",
        classes1: "Biology 101",
        classes2: "Genetics 201",
        status: "Occupied",
    },
    {
        sno: "8",
        facultyName: "Prof. Olivia Martinez",
        classes1: "-",
        classes2: "-",
        status: "Vacant",
    },
    {
        sno: "9",
        facultyName: "Dr. James Thompson",
        classes1: "Chemistry 101",
        classes2: "Organic Chemistry 202",
        status: "Occupied",
    },
    {
        sno: "10",
        facultyName: "Prof. Sophia Clark",
        classes1: "Philosophy 101",
        classes2: "-",
        status: "Partially Occupied",
    },
    {
        sno: "11",
        facultyName: "Dr. Daniel King",
        classes1: "History 101",
        classes2: "Modern History 201",
        status: "Occupied",
    },
    {
        sno: "12",
        facultyName: "Prof. Emma Lewis",
        classes1: "-",
        classes2: "-",
        status: "Vacant",
    },
    {
        sno: "13",
        facultyName: "Dr. David Wright",
        classes1: "Statistics 101",
        classes2: "Probability 201",
        status: "Occupied",
    },
    {
        sno: "14",
        facultyName: "Prof. Isabella Walker",
        classes1: "Art History 101",
        classes2: "Renaissance Art 202",
        status: "Occupied",
    },
    {
        sno: "15",
        facultyName: "Dr. Benjamin Hill",
        classes1: "Political Science 101",
        classes2: "International Relations 202",
        status: "Occupied",
    },
];


export default async function ProtectedPage() {
    const supabase = createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
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
                    {slots.map((slot) => (
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