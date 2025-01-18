import axios from 'axios';

export default async function getDisks() {
  try {
    const response = await axios.get('/api/discs');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
  
}


export async function getSongs(discId: number) {
    console.log(discId)
  try {
    const response = await axios.get('/api/songs', {
      params: {
        disc_id: discId, 
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
}
