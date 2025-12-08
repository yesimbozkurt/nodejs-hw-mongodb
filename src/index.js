

import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
    await initMongoConnection();
    setupServer();
};

bootstrap();
// const PORT = 3000;

// const app = express();

// app.get('/', (req, res) => {
//     res.json({
//         message: 'Hello world!',
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`);
// });

