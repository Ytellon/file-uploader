import * as Filestack from 'filestack-js'

import { db } from 'src/lib/db'

export const files = () => {
  return db.file.findMany()
}

export const file = ({ id }) => {
  return db.file.findUnique({
    where: { id },
  })
}

export const createFile = ({ input }) => {
  return db.file.create({
    data: input,
  })
}

export const updateFile = ({ id, input }) => {
  return db.file.update({
    data: input,
    where: { id },
  })
}

export const deleteFile = async ({ id }) => {
  const client = Filestack.init(process.env.REDWOOD_ENV_FILESTACK_API_KEY)

  const file = await db.file.findUnique({ where: { id } })

  // The `security.handle` is the unique part of the Filestack file's url.
  const handle = file.url.split('/').pop()

  const security = Filestack.getSecurity(
    {
      expiry: new Date().getTime() + 5 * 60 * 1000,
      handle,
      call: ['remove'],
    },
    process.env.REDWOOD_ENV_FILESTACK_SECRET
  )

  await client.remove(handle, security)

  return db.file.delete({ where: { id } })
}
