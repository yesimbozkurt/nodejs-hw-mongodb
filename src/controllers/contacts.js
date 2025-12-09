// src/controllers/contacts.js

import { getAllContacts, getContactById } from '../services/contacts.js';

export const getAllContactsController = async (req, res, next) => {
    try {

    } catch (error) {

    }
    const contacts = await getAllContacts();

    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    // Contact bulunamazsa cevap
    // if (!contact) {
    //     res.status(404).json({
    //         message: 'Contact not found'
    //     });
    //     return;
    // }
    if (!contact) {
        next(new Error('Student not found'));
        return;
    }
    // Contact bulunursa cevap
    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};
