import type { Character } from '~/types/character.types'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { getRandomCharacter } from '~/api/rickandmorty.server'
import { useLoaderData } from '@remix-run/react'

interface LoaderData {
  character: Character
}

export const meta: MetaFunction = () => ({
  title: 'Rick & Morty | Random Character'
})

export const loader: LoaderFunction = async () => {
  const character = await getRandomCharacter()
  return json<LoaderData>({ character })
}

export default function GetRandom() {
  const { character } = useLoaderData<LoaderData>()

  return (
    <div className="w-72 mt-10">
      <div className="w-72 h-72">
        <img
          src={character.image}
          alt={character.name}
          className="object-center object-cover "
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            {character.name}
          </h3>
          <p className="mt-1 text-sm text-gray-700">{character.species}</p>
        </div>
        <p className="text-sm  text-gray-700">{character.status}</p>
      </div>
    </div>
  )
}
