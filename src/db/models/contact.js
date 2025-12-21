import { Schema, model } from "mongoose";


const contactsSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'users' },
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: false,
            default: null,
        },
        isFavorite: {
            type: Boolean,
            required: true,
            default: false,
        },
        contactType: {
            type: String,
            required: true,
            enum: ['personal', 'home', 'work', 'other'],
            default: 'other',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
export const ContactsCollection = model('contacts', contactsSchema);
