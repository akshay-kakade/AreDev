import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/lib/mongodb';
import { Event } from '@/database';


// Define route params type for type safety
type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * GET /api/events/[slug]
 * Fetches a single events by its slug
 */
export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    await connectDB();
    const { slug } = await params;

    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { message: 'Invalid or missing slug parameter' },
        { status: 400 }
      );
    }

    const sanitizedSlug = slug.trim().toLowerCase();
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    if (!event) {
      return NextResponse.json(
        { message: `Event with slug '${sanitizedSlug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Event fetched successfully', event },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching events by slug:', error);
    }

    if (error instanceof Error) {
      if (error.message.includes('MONGODB_URI')) {
        return NextResponse.json(
          { message: 'Database configuration error' },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { message: 'Failed to fetch events', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    await connectDB();
    const { slug } = await params;
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json({ message: 'Invalid or missing slug parameter' }, { status: 400 });
    }
    const sanitizedSlug = slug.trim().toLowerCase();
    const deleted = await Event.findOneAndDelete({ slug: sanitizedSlug });
    if (!deleted) {
      return NextResponse.json({ message: `Event with slug '${sanitizedSlug}' not found` }, { status: 404 });
    }
    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete event', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
