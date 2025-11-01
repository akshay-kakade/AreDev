import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

export async function POST (req: NextRequest) {
   try {
      await connectDB();
        const formData = await req.formData();

        let event;

        try {
            event= Object.fromEntries(formData.entries());
            console.log('Event data received:', event);
        } catch (error) {
            return NextResponse.json({ message: 'Invalid form data', error: error instanceof Error ? error.message : String(error) }, { status: 400 });
        }
        
        const file = formData.get('image') as File;
        if (!file) {
            return NextResponse.json({ message: 'Image file is required' }, { status: 400 });
        }
        const tags = JSON.parse(formData.get('tags') as string);
        const agenda = JSON.parse(formData.get('agenda') as string);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'aredev' }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }).end(buffer);
        })

        event.image = (uploadResult as {secure_url: string}).secure_url;
        const createdEvent = await Event.create({
            ...event,
            tags: tags,
            agenda: agenda,
        });


        return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });   


   } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error instanceof Error ? error.message : String(error) }, { status: 500 });
   }
}

export async function GET () {
 try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json({ message: 'Event Fetch successfully', events }, { status: 200 });
 } catch (e) {
    return NextResponse.json({ message: 'Fetching Event Error', error: e instanceof Error ? e.message : String(e) }, { status: 500 });
    
 }
}
