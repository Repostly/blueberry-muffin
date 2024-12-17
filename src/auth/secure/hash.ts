import * as fs from 'fs';
import * as crypto from 'crypto';


function generateHash(data: string): string {
    if (!data) {
        throw new Error('Data to hash cannot be null, undefined, or empty');
    }
    try {
        const seed = fs.readFileSync('./seed.txt', 'utf8').trim();
        if (!seed) {
            throw new Error('Seed file is empty');
        }
        const hash = crypto.createHmac('sha256', seed).update(data).digest('hex');
        return hash;
    } catch (error) {
        console.error('Error reading seed file or generating hash:');
        throw new Error('Failed to generate hash');
    }
}



function decodeHash(query: string): string {
    // file to decrypt the data
    const seed = fs.readFileSync('./seed.txt', 'utf8').trim();
    const hash = crypto.createHmac('sha256', seed).update(query).digest('hex');
    return hash;
}

export { generateHash };