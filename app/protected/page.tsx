import React from 'react';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Slot_table from "@/components/slot_table";
import { DatePickerDemo } from "@/components/date_picker";
import {TimeSlotPicker} from "@/components/time_slot";


const slots = [
  {
    sno: "1",
    facultyName: "Dr. John Doe",
    classes: "Mathematics 101, Physics 202",
    status: "Active",
  },
  {
    sno: "2",
    facultyName: "Prof. Jane Smith",
    classes: "Chemistry 301, Biology 105",
    status: "Vacant",
  },
  {
    sno: "3",
    facultyName: "Dr. Robert Johnson",
    classes: "Computer Science 201, Data Structures 301",
    status: "Active",
  },
  {
    sno: "4",
    facultyName: "Prof. Emily Brown",
    classes: "Literature 101, Creative Writing 202",
    status: "Active",
  },
  {
    sno: "5",
    facultyName: "Dr. Michael Lee",
    classes: "Economics 201, Business Studies 301",
    status: "Vacant",
  },
  {
    sno: "6",
    facultyName: "Prof. Sarah Wilson",
    classes: "Psychology 101, Sociology 201",
    status: "Active",
  },
];

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
      <div className="space-y-4">
        <DatePickerDemo />
        <TimeSlotPicker />
        <Slot_table slots={slots} />
      </div>
  );
}