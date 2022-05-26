import type { Character } from '~/types/character.types'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { getCharacters } from '~/api/rickandmorty.server'
import { Link, Outlet, useLoaderData, useParams } from '@remix-run/react'

interface LoaderData {
  characters: Array<Character>
}

export const meta: MetaFunction = () => ({
  title: 'Rick & Morty | Characters'
})

export const loader: LoaderFunction = async () => {
  const characters = await getCharacters()
  return json<LoaderData>({ characters })
}

export default function Characters() {
  const { characters } = useLoaderData<LoaderData>()
  const params = useParams()

  return (
    <div className="flex">
      <div className="w-1/3">
        <div className="flow-root mt-6">
          <ul className="-my-5 divide-y divide-gray-200">
            {characters.map(character => (
              <li
                key={character.id}
                className={`py-4 hover:bg-gray-50 ${
                  params?.id === String(character.id) ? 'bg-gray-50' : 'bg-whie'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={character.image}
                      alt={character.name}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {character.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {character.origin.name}
                    </p>
                  </div>
                  <div>
                    <Link
                      prefetch="intent"
                      to={String(character.id)}
                      className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="ml-24 border border-red-50 flex-1">
        <Outlet />
      </div>
    </div>
  )
}
