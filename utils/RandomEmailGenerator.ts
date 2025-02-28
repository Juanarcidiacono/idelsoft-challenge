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
        throw new Error('Could not get the random email');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error when creating random email ${error.message}`);
      } else {
        throw new Error('Unknown error when creating random email');
      }
    }
  }


  async run(): Promise<string | null> {
    try {
      const email = await this.generateRandomEmail();
      console.log('Random email created:', email);
      return email;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
}