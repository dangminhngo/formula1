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
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          className="min-w-[400px]"
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
        <div className="bg-secondary-800 absolute left-0 top-full mt-2 w-full rounded p-1">
          {status === 'success' && (
            <ul className="flex flex-col items-stretch">
              {data?.map((res) => (
                <li key={res.id} className="flex">
                  <Link
                    to={
                      res.type === 'Grand Prix'
                        ? `/${new Date(
                            res?.date ?? 2023
                          ).getFullYear()}/races/${res.id}`
                        : res.type === 'Driver'
                        ? `/drivers/${res.id}`
                        : `/teams/${res.id}`
                    }
                    className="hover:bg-secondary-700 flex w-full items-center justify-between rounded px-4 py-2"
                    onClick={resetSearch}
                  >
                    <span>{res.title}</span>
                    <span className="text-sm">{res.type}</span>
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
