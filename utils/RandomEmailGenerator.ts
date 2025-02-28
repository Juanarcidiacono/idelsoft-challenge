import axios from 'axios';

interface RandomDataApiResponse {
  email: string;
  id: number;
  uid: string;
}

export class RandomEmailGenerator {
  private apiUrl: string;


  constructor(apiUrl: string = 'https://random-data-api.com/api/v2/users') {
    this.apiUrl = apiUrl;
  }


  async generateRandomEmail(): Promise<string> {
    try {
      const response = await axios.get<RandomDataApiResponse>(this.apiUrl, {
        params: { size: 1 }
      });
      
      if (response.data && response.data.email) {
        return response.data.email;
      } else {
        throw new Error('No se pudo obtener un correo electrónico aleatorio');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al generar correo aleatorio: ${error.message}`);
      } else {
        throw new Error('Error desconocido al generar correo aleatorio');
      }
    }
  }


  async run(): Promise<string | null> {
    try {
      const email = await this.generateRandomEmail();
      console.log('Correo aleatorio generado:', email);
      return email;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
}