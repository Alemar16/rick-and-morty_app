const API_URL = 'https://rickandmortyapi.com/api/character';

function getUniqueRandomIds(count: number, max: number): number[] {
  const ids = new Set<number>();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(ids);
}

export async function getRandomCharacters(count: number = 3): Promise<any[]> {
  try {
    // Generar IDs aleatorios únicos entre 1 y 826 (número total de personajes)
    const randomIds = getUniqueRandomIds(count, 826);
    
    const response = await fetch(`${API_URL}/${randomIds.join(',')}`);
    const data = await response.json();
    
    // Si solo se solicita un personaje, la API devuelve un objeto en lugar de un array
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
}

export async function getNextCharacter(): Promise<any> {
  try {
    const randomId = Math.floor(Math.random() * 826) + 1;
    const response = await fetch(`${API_URL}/${randomId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching next character:', error);
    throw error;
  }
}
