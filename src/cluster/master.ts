import cluster from 'node:cluster';
import os from 'node:os';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} ejecutándose con ${numCPUs} workers`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork(); 
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} murió. Creando uno nuevo...`);
        cluster.fork();
    });
} else {
    import('./workers/worker'); 
}
