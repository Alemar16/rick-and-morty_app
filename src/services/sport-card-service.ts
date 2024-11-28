const API_URL = 'https://rickandmortyapi.com/api/character';

// Obtener un conjunto aleatorio de personajes
export async function getRandomCharacters(count: number): Promise<any[]> {
  try {
    // Primero, obtener el total de personajes disponibles
    const response = await fetch(API_URL);
    const data = await response.json();
    const totalCharacters = data.info.count;

    // Generar índices aleatorios únicos
    const randomIndices = new Set<number>();
    while (randomIndices.size < count) {
      const randomId = Math.floor(Math.random() * totalCharacters) + 1;
      randomIndices.add(randomId);
    }

    // Obtener los personajes usando los índices aleatorios
    const charactersPromises = Array.from(randomIndices).map(id =>
      fetch(`${API_URL}/${id}`).then(res => res.json())
    );

    const characters = await Promise.all(charactersPromises);
    return characters;
  } catch (error) {
    console.error('Error fetching random characters:', error);
    return [];
  }
}

// Obtener un personaje específico por ID
export async function getCharacterById(id: number) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching character:', error);
    return null;
  }
}

// Obtener el siguiente personaje (simulado para el ejemplo)
export async function getNextCharacter() {
  return getRandomCharacters(1).then(chars => chars[0]);
}
