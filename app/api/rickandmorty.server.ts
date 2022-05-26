import type { Character } from '~/types/character.types'

const BASE_ENDPOINT = 'https://rickandmortyapi.com/api/character'

function getRandomId(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export const getRandomCharacter = async (): Promise<Character> => {
  const randomId = getRandomId(1, 50)
  const ENDPOINT = `${BASE_ENDPOINT}/${randomId}`
  const response = await fetch(ENDPOINT)
  const data = await response.json()
  return data
}

export const getCharacters = async (): Promise<Character[]> => {
  const ENDPOINT = `${BASE_ENDPOINT}`
  const response = await fetch(ENDPOINT)
  const data = await response.json()
  return data.results
}

export const getCharacterById = async (id: string): Promise<Character> => {
  const ENDPOINT = `${BASE_ENDPOINT}/${id}`
  const response = await fetch(ENDPOINT)
  const data = await response.json()
  return data
}
