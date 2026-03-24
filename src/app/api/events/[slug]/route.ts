import { NextRequest,NextResponse } from "next/server";

import {

getEventBySlug

} from "@/lib/features/events/services/events.service";

type Params={
params:Promise<{
slug:string;
}>;
};

export async function GET(
req:NextRequest,
{params}:Params
){

const {slug}=await params;

const event=
await getEventBySlug(slug);

if(!event){

return NextResponse.json(
{success:false},
{status:404}
);

}

return NextResponse.json({

success:true,
data:event

});

}