import { Schema, model } from "mongoose";


const consactsSchema = new Schema(
    {
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
        },
        isFavorite: {
            type: Boolean,
            required: true,
            default: false,
        },
        contactType: {
            type: Boolean,
            required: true,
            enum: ['personal', 'home', 'work'],
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
export const ContactsCollection = model('contacts', consactsSchema);
