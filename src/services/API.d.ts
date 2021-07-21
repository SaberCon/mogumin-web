declare namespace API {
  type Result<T> = {
    success: boolean
    code: string
    msg: string
    data: T
  }

  type Page<T> = {
    list: T[]
    total: number
  }

  type CurrentUser = {
    id: string
    username: string
    avatar: string
    phone: string
  }

  type UserParam = {
    username: string
    avatar: string
  }

  type OssData = {
    accessId: string
    host: string
    dir: string
    policy: string
    signature: string
    expire: number
  }
}
