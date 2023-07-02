import { useExample } from './hooks'

export default function App() {
  const { status, data } = useExample(3)

  if (status !== 'success') return <div>Loading...</div>
  return <div className="text-accent-600">{JSON.stringify(data)}</div>
}
