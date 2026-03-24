import { NextRequest,NextResponse } from "next/server";

import {

updateEvent,
deleteEvent,
getEventById

} from "@/lib/features/events/services/events.service";

import {

requireAdmin,
UnauthorizedError,
ForbiddenError

} from "@/lib/adminAuth";

type Params={
params:Promise<{
eventId:string;
}>;
};

/* ================= GET ================= */

export async function GET(
req:NextRequest,
{params}:Params
){

try{

await requireAdmin();

const {eventId}=await params;

const event=
await getEventById(eventId);

if(!event){

return NextResponse.json(
{
success:false,
message:"Event not found"
},
{status:404}
);

}

return NextResponse.json({

success:true,
data:event

});

}
catch(error){

if(error instanceof UnauthorizedError){

return NextResponse.json(
{success:false,message:error.message},
{status:401}
);

}

if(error instanceof ForbiddenError){

return NextResponse.json(
{success:false,message:error.message},
{status:403}
);

}

return NextResponse.json(
{success:false,message:"Failed"},
{status:500}
);

}

}

/* ================= UPDATE ================= */

export async function PUT(
req:NextRequest,
{params}:Params
){

try{

await requireAdmin();

const {eventId}=await params;

const formData=
await req.formData();

const result=
await updateEvent(
eventId,
formData
);

return NextResponse.json(
result,
{status:result.status}
);

}
catch(error){

return NextResponse.json(
{success:false,message:"Failed"},
{status:500}
);

}

}

/* ================= DELETE ================= */

export async function DELETE(
req:NextRequest,
{params}:Params
){

try{

await requireAdmin();

const {eventId}=await params;

const result=
await deleteEvent(eventId);

return NextResponse.json(
result,
{status:result.status}
);

}
catch{

return NextResponse.json(
{success:false,message:"Failed"},
{status:500}
);

}

}