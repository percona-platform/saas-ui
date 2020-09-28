export type TUser = {
  email: string
  password: string
}

export type TValidUser = {
  user: TUser
  signedInMessage: string
  signedUpMessage: string
}
