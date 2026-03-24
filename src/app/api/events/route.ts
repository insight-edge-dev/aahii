import { NextRequest,NextResponse } from "next/server";

import {

getPublicEvents,
getEventsByDate

} from "@/lib/features/events/services/events.service";

export async function GET(req:NextRequest){

const {searchParams}=new URL(req.url);

const date=
searchParams.get("date");

if(date){

const events=
await getEventsByDate(date);

return NextResponse.json({

success:true,
data:events

});

}

const events=
await getPublicEvents();

return NextResponse.json({

success:true,
data:events

});

}