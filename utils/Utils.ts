import * as fs from 'fs';
import { BasePage } from '../pages/BasePage';

export class Utils extends BasePage {
    

    async getRandomUrl(path: string): Promise<string> {
        const data = fs.readFileSync(path, 'utf8');
        const urls = JSON.parse(data);
        const values = Object.values(urls) as string[];
        const randomIndex = Math.floor(Math.random() * (values.length + 1)) 
        console.log(randomIndex)
        
        return values[randomIndex];
    }
}