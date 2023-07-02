import { ReactQueryOptions, RouterInputs, trpc } from '../lib/trpc'

export function useExample(
  input: RouterInputs['example'],
  options?: ReactQueryOptions['example']
) {
  return trpc.example.useQuery(input, options)
}
