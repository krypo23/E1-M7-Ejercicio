const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// los datos de conexión se toman del archivo .env a través de process.env
const pool = new Pool({
    connectionString: process.env.DATABASE_URL_LIBRERIA
});

async function verificarConexion() {
    try {
        console.log('¡Conectando a la base de datos...!');  
        
        // Esto obtiene 1 cliente del pool, ejecuta la consulta y luego libera el cliente de vuelta al pool
        const res = await pool.connect().then(client => {
                    return client.query('SELECT * FROM autores')
                .then(result => {
                    client.release(); // Liberamos el cliente después de la consulta
                    console.table(result.rows); 
                });
        });
    } catch (error) {
        console.error('Error al conectar o consultar la base de datos:', error);
    } 
}


verificarConexion().then(async () => {
    //Cerrar el pool de conexiones después de la consulta
    await pool.end();
    console.log('Pool de conexiones cerrado. El script ha terminado.');
});