import type { HeadersFunction } from '@remix-run/node'

export default function Index() {
  return (
    <div className="h-80 flex flex-col">
      <h1 className="mt-8 text-4xl">
        Bienvenidos al meetup de Remix México 😎
      </h1>
      <img
        className="mt-8"
        src="https://remix.run/img/og.1.jpg"
        alt="remix-run logo"
      />
    </div>
  )
}

export const headers: HeadersFunction = () => {
  const oneMinute = 60 * 1000
  const oneHour = oneMinute * 60
  const oneDay = oneHour * 24
  const oneWeek = oneDay * 7
  const oneYear = oneDay * 365

  return {
    'Cache-Control': `max-age=${oneHour}, s-maxage=${oneYear}, stale-while-revalidate=${oneWeek}}`
  }
}
