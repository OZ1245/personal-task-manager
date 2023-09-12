import { supabase } from '@/libs/supabase'

export interface IAuthParams {
  email: string,
  password: string
}

export interface IUserSettings {
  name: string | any,
  language: string
}

export interface IUser {
  id: string,
  created: string,
  settings: IUserSettings,
  email: string,
  active: boolean,
  last_login: string
}

export interface IUserParams {
  id?: string,
  settings?: IUserSettings,
  email?: string,
  active?: boolean,
  last_login?: string,
}

const tableName = 'Users'

const signUp = (params: IAuthParams): PromiseLike<any> => {
  return supabase.auth
    .signUp(params)
    .then((response) => response)
    .catch((error) => {
      throw error.message
    })
}

const signIn = (params: IAuthParams): PromiseLike<any> => {
  return supabase.auth
    .signInWithPassword(params)
    .then((response) => response)
    .catch((error) => {
      throw error.message
    })
}

const signOut = (): PromiseLike<boolean> => {
  return supabase.auth
    .signOut()
    .then(({ error }) => {
      if (error) throw error

      return true
    })
    .catch(error => {
      throw error.message
    })
}

const getSession = (): PromiseLike<any> => {
  return supabase.auth
    .getSession()
    .then(({ data, error }) => {
      if (error) throw error

      return data.session || false
    })
    .catch(error => {
      throw error.message
    })
}

const getAuthUserData = (): PromiseLike<any> => {
  return supabase.auth
    .getUser()
    .then(({ data }) => {
      return data.user || null
    })
    .catch(error => {
      throw error.message
    })
}

const deleteUser = (id: string): PromiseLike<boolean> => {
  return supabase.auth.admin
    .deleteUser(id)
    .then(({ data, error }) => {
      if (error) throw error

      return (!data)
    })
    .catch(error => {
      throw error.message
    })
}

const insertRow = (params: IUserParams): PromiseLike<IUser | any> => {
  return supabase
    .from(tableName)
    .insert(params)
    .select()
    .then(({ data, error }) => {
      if (error) throw error

      return data ? data[0] : null
    })
}

const updateById = (params: IUserParams, id: string): PromiseLike<IUser | any> => {
  return supabase
    .from(tableName)
    .update(params)
    .eq('id', id)
    .select()
    .then(({ data, error }) => {
      if (error) throw error

      return data ? data[0] : null
    })
}

const deleteById = (id: string): PromiseLike<boolean> => {
  return supabase
    .from(tableName)
    .delete()
    .eq('id', id)
    .then(response => {
      return (response.status === 204)
    })
}

const retrieveUser = (): PromiseLike<any> => {
  return supabase.auth
    .getUser()
    .then(({ data }) => {
      return data.user
    })
    .catch(error => {
      throw error.message
    })
}

const retrieveSession = (): PromiseLike<any> => {
  return supabase.auth
    .getSession()
    .then(({ data }) => {
      return data.session
    })
    .catch(error => {
      throw error.message
    })
}

const getById = (id: string): PromiseLike<IUser> => {
  return supabase
    .from(tableName)
    .select('*')
    .eq('id', id)
    .then(({ data, error }) => {
      if (error) throw error

      return data ? data[0] : null
    })
}

export default {
  signUp,
  insertRow,
  getById,
  retrieveUser,
  retrieveSession,
  signOut,
  signIn,
  updateById,
  deleteById,
  deleteUser,
  getSession,
  getAuthUserData,
}