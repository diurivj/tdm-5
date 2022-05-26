import type { Character } from '~/types/character.types'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { getCharacterById } from '~/api/rickandmorty.server'
import { Link, useLoaderData } from '@remix-run/react'

interface LoaderData {
  character: Character
}

export const meta: MetaFunction = ({ data }) => {
  if (data?.character) {
    return { title: `Rick & Morty | ${data?.character?.name}` }
  }
  return { title: 'Rick & Morty' }
}

export const loader: LoaderFunction = async ({ params: { id } }) => {
  if (!id) return redirect('..')
  const character = await getCharacterById(id)
  return json<LoaderData>({ character })
}

export default function CharacterId() {
  const { character } = useLoaderData<LoaderData>()

  if (!character) {
    throw new Error('whoops')
  }

  return (
    <div className="w-72 mx-auto mt-32">
      <img
        src={character?.image}
        alt={character?.name}
        className="object-center object-cover "
      />
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            {character?.name}
          </h3>
          <p className="mt-1 text-sm text-gray-700">{character?.species}</p>
        </div>
        <p className="text-sm  text-gray-700">{character?.status}</p>
      </div>
    </div>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error({ error })
  return (
    <main
      className="bg-cover bg-top sm:bg-top"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75")'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
        <p className="text-sm font-semibold text-black text-opacity-50 uppercase tracking-wide">
          404 error
        </p>
        <h1 className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
          Uh oh! I think you’re lost.
        </h1>
        <p className="mt-2 text-lg font-medium text-black text-opacity-50">
          It looks like the page you’re looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to=".."
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black text-opacity-75 bg-white bg-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  )
}
