import dotenv from 'dotenv'

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env'
      : `.env.${process.env.NODE_ENV}.local`,
})

const config = {
  CLIENT_URL: process.env.CLIENT_URL!,
}

export default config
