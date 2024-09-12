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
import ScheduleSlot from "@/app/protected/components/schedule_slot";
import {Button} from "@/components/ui/button";




export default async function ProtectedPage() {
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
    if(!Slot_Table) return error;

    // @ts-ignore
    return (
        <div>
            <Table>
                <TableHeader className="bg-secondary">
                    <TableRow>
                        <TableHead>MUJ ID</TableHead>
                        <TableHead>Faculty Name</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead>Send Mail</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Slot_Table.map((slot) => (
                        <TableRow key={slot.MUJ_ID}>
                            <TableCell className="font-medium text-center">{slot.MUJ_ID}</TableCell>
                            <TableCell>{slot.NameOfFaculty}</TableCell>
                            <TableCell className="text-center">
                                <Popover>
                                <PopoverTrigger>View Schedule</PopoverTrigger>
                                <PopoverContent><ScheduleSlot /></PopoverContent>
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
                            <TableCell><Button variant="outline">Send Mail</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}