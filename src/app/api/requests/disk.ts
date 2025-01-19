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

export async function searchDiscsByArtist(artist: string) {
  try {
    const response = await axios.get('/api/search-discs-by-artist', {
      params: {
        artist: artist, 
      },
    });

    return response.data; 
  } catch (error) {
    console.error('Error fetching discs by artist:', error);
    throw error; 
  }
}

export async function searchDiscsByGenre(genre: string) {
  try {
    const response = await axios.get('/api/search-discs-by-genre', {
      params: {
        genre: genre, 
      },
    });

    return response.data; 
  } catch (error) {
    console.error('Error fetching discs by genre:', error);
    throw error; 
  }
}

export async function searchDiscsByTitle(title: string) {
  try {
    const response = await axios.get('/api/search-disc-by-title', {
      params: {
        title: title,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching disc by title:', error);
    throw error;
  }
}

export async function searchDiscById(discId: number) {
  try {
    const response = await axios.get('/api/disc', {
      params: {
        id: discId,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching disc by ID:', error);
    throw error;
  }
}