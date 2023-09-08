import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { httpBatchLink } from '@trpc/client'

import config from './lib/config'
import { trpc } from './lib/trpc'

export default function Providers({ children }: React.PropsWithChildren) {
  console.log(config.API_SERVER_URL)
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: config.API_SERVER_URL ?? 'http://localhost:8000',
          // @link https://trpc.io/docs/client/cors
          fetch(url, options) {
            return fetch(url, {
              ...options,
            })
          },
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  )
}
