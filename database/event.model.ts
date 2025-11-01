import { Schema, model, Document, models } from 'mongoose';
import slugify from 'slugify';

// Event document interface
export interface IEvent extends Document {
    title: string;
    slug: string;
    description: string;
    overview: string;
    image: string;
    venue: string;
    location: string;
    date: string;
    time: string;
    mode: 'online' | 'offline' | 'hybrid';
    audience: string;
    agenda: string[];
    organizer: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

// Event schema definition
const eventSchema = new Schema<IEvent>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    overview: {
        type: String,
        required: [true, 'Overview is required'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    venue: {
        type: String,
        required: [true, 'Venue is required'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    date: {
        type: String,
        required: [true, 'Date is required']
    },
    time: {
        type: String,
        required: [true, 'Time is required']
    },
    mode: {
        type: String,
        required: [true, 'Mode is required'],
        enum: ['online', 'offline', 'hybrid']
    },
    audience: {
        type: String,
        required: [true, 'Target audience is required'],
        trim: true
    },
    agenda: {
      type: [String],
      required: [true, 'Agenda is required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'At least one agenda item is required',
      },
    },
    organizer: {
        type: String,
        required: [true, 'Organizer is required'],
        trim: true
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'At least one tag is required',
      },
    },
  }, {
    timestamps: true
});

// Generate slug from title
eventSchema.pre('save', function(next) {
    // Only update slug if title is modified or slug doesn't exist
    if (this.isModified('title') || !this.slug) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }

    // Normalize date to ISO format if modified
    if (this.isModified('date')) {
        const parsedDate = new Date(this.date);
        if (!isNaN(parsedDate.getTime())) {
            this.date = parsedDate.toISOString().split('T')[0];
        }
    }

    // Normalize time format (HH:mm) if modified
    if (this.isModified('time')) {
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s*(?:AM|PM|am|pm)?$/;
        if (timeRegex.test(this.time)) {
            // Convert to 24-hour format
            const [time, period] = this.time.split(/\s+/);
            const [hours, minutes] = time.split(':');
            let hour = parseInt(hours);
            
            if (period?.toLowerCase() === 'pm' && hour < 12) hour += 12;
            if (period?.toLowerCase() === 'am' && hour === 12) hour = 0;
            
            this.time = `${hour.toString().padStart(2, '0')}:${minutes}`;
        }
    }

    next();
});

// Create indexes
eventSchema.index({ slug: 1 });
eventSchema.index({ tags: 1 });

// Export the Event model
export const Event = models.Event || model<IEvent>('Event', eventSchema);