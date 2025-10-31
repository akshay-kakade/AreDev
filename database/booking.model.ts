import { Schema, model, Document, models, Types } from 'mongoose';
import { Event } from './event.model';

// Booking document interface
export interface IBooking extends Document {
    eventId: Types.ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

// Booking schema definition
const bookingSchema = new Schema<IBooking>({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Event ID is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        validate: {
            validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            message: 'Please enter a valid email address'
        }
    }
}, {
    timestamps: true
});

// Verify event exists before saving booking
bookingSchema.pre('save', async function(next) {
    if (this.isModified('eventId')) {
        const eventExists = await Event.findById(this.eventId);
        if (!eventExists) {
            throw new Error('Event does not exist');
        }
    }
    next();
});

// Create index on eventId for faster queries
bookingSchema.index({ eventId: 1 });
bookingSchema.index({ email: 1, eventId: 1 }, { unique: true }); // Prevent duplicate bookings

// Export the Booking model
export const Booking = models.Booking || model<IBooking>('Booking', bookingSchema);