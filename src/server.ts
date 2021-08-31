import app from './app';

const PORT = process.env.API_PORT;
console.log(`application listen in port: ${PORT}`);
app.listen(PORT);
