// src/services/contacts.js
import { ContactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortBy = '_id',
    sortOrder = SORT_ORDER.ASC,
    filter = {},
    }) => {

    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find();
    if (filter.contactType) {
        contactsQuery.where('contactType').equals(filter.contactType);
    }
    if (filter.isFavorite !== undefined) {
        contactsQuery.where('isFavorite').equals(filter.isFavorite);
    }
    
    const [contactsCount, contacts] = await Promise.all([
        ContactsCollection.find()
            .merge(contactsQuery)
            .countDocuments(),
        contactsQuery
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec(),
    ]);
    const paginationData = calculatePaginationData(contactsCount, perPage, page);
    return {
        data: contacts,
        ...paginationData,
    };
};
export const getContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

export const createContact = async (payload) => {
    const newContact = await ContactsCollection.create(payload);
    return newContact;
};
export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findByIdAndDelete({_id: contactId});
    return contact;
};
export const updateContact = async (contactId, payload, options) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(
        { _id: contactId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};
