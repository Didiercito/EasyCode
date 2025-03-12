const { parentPort } = require('worker_threads');
const bcrypt = require('bcrypt');

parentPort.on('message', async (data: any) => {
    const { password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    parentPort.postMessage(hashedPassword);
});