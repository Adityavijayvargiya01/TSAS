import React from 'react';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Slot_table from "@/components/slot_table";
import { DatePickerDemo } from "@/components/date_picker";
import {TimeSlotPicker} from "@/components/time_slot";

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
        <Slot_table />
      </div>
  );
}