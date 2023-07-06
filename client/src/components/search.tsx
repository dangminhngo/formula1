import { useRef, useState } from 'react'
import { useSearch } from '~/hooks'
import debounce from 'debounce'
import { Link } from 'react-router-dom'

import { Icons, Input } from './ui'

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [keyword, setKeyword] = useState('')
  const { status, data } = useSearch(keyword, { enabled: !!keyword })

  const resetSearch = () => {
    if (!inputRef.current) return

    inputRef.current.value = ''
    setKeyword('')
  }

  return (
    <form className="relative">
      <div className="relative min-w-full sm:min-w-[360px]">
        <Input
          ref={inputRef}
          type="text"
          className="w-full"
          placeholder="Search"
          onChange={debounce((e: React.ChangeEvent<HTMLInputElement>) => {
            setKeyword(e.target.value)
          }, 500)}
        />
        {keyword.length > 0 ? (
          <button
            type="button"
            onClick={resetSearch}
            className="bg-secondary-700 absolute right-4 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded"
          >
            <Icons.Clear className="text-secondary-400 h-4 w-4" />
          </button>
        ) : (
          <Icons.Search className="text-secondary-600 absolute right-4 top-1/2 -translate-y-1/2" />
        )}
      </div>
      {!!data?.length && data.length > 0 && (
        <div className="border-secondary-700 bg-secondary-800 absolute left-0 top-full mt-2 w-full rounded border p-1 shadow-2xl">
          {status === 'success' && (
            <ul className="flex flex-col items-stretch">
              {data?.map((res) => (
                <li key={res.id} className="flex">
                  <Link
                    to={
                      res.type === 'Grand Prix'
                        ? `/races/${new Date(
                            res?.date ?? 2023
                          ).getFullYear()}/${res.id}`
                        : res.type === 'Driver'
                        ? `/drivers/alltime/${res.id}`
                        : `/teams/alltime/${res.id}`
                    }
                    className="hover:bg-secondary-700 flex w-full items-center justify-between gap-2 rounded px-4 py-2"
                    onClick={resetSearch}
                  >
                    <span className="text-clip">{res.title}</span>
                    <span
                      className={`min-w-[64px] px-1.5 py-0.5 text-center ${
                        res.type === 'Driver'
                          ? 'bg-teal-700'
                          : res.type === 'Team'
                          ? 'bg-blue-700'
                          : 'bg-primary-700'
                      } rounded text-sm text-white`}
                    >
                      {res.type === 'Grand Prix' ? 'GP' : res.type}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  )
}
