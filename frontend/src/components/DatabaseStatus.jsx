import React, { useEffect, useState } from 'react';
import { getMongoClient } from '../utils/mongo'; // Adjust the path if necessary

function DatabaseStatus() {
  const [status, setStatus] = useState('Checking...');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const mongoClient = await getMongoClient();
        const db = mongoClient.db('your-database-name'); // Replace with your database name
        const collections = await db.listCollections();
        setStatus(`Connected: ${collections.length} collections found`);
      } catch (error) {
        setStatus(`Connection failed: ${error.message}`);
      }
    };

    checkConnection();
  }, []);

  return <div>Database Status: {status}</div>;
}

export default DatabaseStatus;
