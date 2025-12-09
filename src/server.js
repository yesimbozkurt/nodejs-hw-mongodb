import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { router } from './routers/contacts.js';
import { env } from './utils/env.js';
import { getAllContactsController, getContactByIdController } from './controllers/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello There!',
        });
    });
    app.use(router); // Yönlendiriciyi app'e middleware olarak ekliyoruz

    app.use('*', (req, res) => {
        res.status(404).json({
            message: 'Not found',
        });
    });
    app.get('/contacts', getAllContactsController);
    app.get('/contacts/:contactId', getContactByIdController);
  
    app.use((req, res) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.use((err, req, res) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message,
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
