import fs from 'fs';
import { parse } from 'csv-parse';
import axios from 'axios';

const filePath = 'urldo caminho do csv';

(async () => {
    const parser = fs.createReadStream(filePath).pipe(
      parse({
        columns: true,
      })
    );
  
    console.log('Iniciando importação...');
  
    for await (const record of parser) {
      try {
        const response = await axios.post('http://localhost:3000/task/', {
          title: record.title,
          description: record.description
        }, {
          headers: {
            'x-import-task': 'true' 
          }
        });
        console.log('Tarefa inserida com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao inserir tarefa:', error.message, error);
      }
    }
  
    console.log('Importação concluída.');
  })();
  