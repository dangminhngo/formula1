import S from 'slugify'

export function camelize(str: string): string {
  return (
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      ?.map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
      .join(' ') ?? str
  )
}

export function slugify(str: string) {
  return S(str, { lower: true, trim: true, replacement: '-' })
}
