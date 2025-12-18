// src/controllers/contacts.js
import createHttpError from 'http-errors';
import { getAllContacts, getContactById, createContact, deleteContact, updateContact } from '../services/contacts.js';

export const getAllContactsController = async (req, res, next) => {
    try {
        const contacts = await getAllContacts();
        res.json({
            status: 200,
            message: 'Successfully found contacts!',
            data: contacts,
        });
    } catch (error) {
        next(error);
    }
};

export const getContactByIdController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);
        if (!contact) {

            next(createHttpError(404, 'Contact not found'));
        }
        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    } catch (error) {
        next(error);
    }
};



export const createContactController = async (req, res, next) => {
    try {
        const newContact = await createContact(req.body);
        res.status(201).json({
            status: 201,
            message: 'Contact created successfully!',
            data: newContact,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
try {
const contact = await deleteContact(contactId);
if (!contact) {
    throw createHttpError(404, 'Contact not found');
}
res.status(204).send();
} catch (error) {
    next(error);
}
};
export const upsertContactController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await updateContact(contactId, req.body, { upsert: true });

        if (!result) {
            throw createHttpError(404, 'Contact not found');
        }
        const status = result.isNew ? 201 : 200;
        res.status(status).json({
            status,
            message: 'Contact updated successfully!',
            data: result.contact,
        });
    }
    catch (error) {
        next(error);
    }
};

export const patchContactController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await updateContact(contactId, req.body);

        // if (!result) {
        //     throw createHttpError(404, 'Contact not found');
        // }

        res.json({
            status: 200,
            message: 'Contact updated successfully!',
            data: result.contact,
        });
    }
    catch (error) {
        next(error);
    }
};
