import { supabase } from '@/libs/supabase'

const signUp = async (params) => {
  return await supabase.auth
    .signUp(params)
    .then(({ data, error }) => {
      if (error) throw error

      return data
    })
    .catch(error => {
      throw error.message
    })
}

const signIn = async (params) => {
  return await supabase.auth
    .signInWithPassword(params)
    .then(({ data, error }) => {
      if (error) throw error

      return data
    })
    .catch(error => {
      throw error.message
    })
}

const signOut = async () => {
  return await supabase.auth
    .signOut()
    .then(({ error }) => {
      if (error) throw error

      return true
    })
    .catch(error => {
      throw error.message
    })
}

const deleteUser = async (id) => {
  console.log('--- deleteUser api method ---')
  return await supabase.auth.admin
    .deleteUser(id)
    .then(({ data, error }) => {
      console.log('data:', data)
      if (error) throw error

      return (!data)
    })
    .catch(error => {
      throw error.message
    })
}

const insertRow = async (params) => {
  return await supabase
    .from('Users')
    .insert([params])
    .select()
    .then(({ data, error }) => {
      if (error) throw error

      return data
    })
    .catch(error => {
      throw error.message
    })
}

const updateById = async (params, id) => {
  return await supabase
    .from('Users')
    .update(params)
    .eq('id', id)
    .select()
    .then(({ data, error }) => {
      if (error) throw error

      return data
    })
    .catch(error => {
      throw error.message
    })
}

const deleteById = async (id) => {
  console.log('--- deleteUser api method ---')
  return await supabase
    .from('Users')
    .delete()
    .eq('id', id)
    .then(response => {
      console.log('response:', response)
      return (response.status === 204)
    })
    .catch(error => {
      throw error.message
    })
}

const retrieveUser = async () => {
  return await supabase.auth
    .getUser()
    .then(({ data }) => {
      return data.user
    })
    .catch(error => {
      throw error.message
    })
}

const retrieveSession = async () => {
  return await supabase.auth
    .getSession()
    .then(({ data }) => {
      return data.session
    })
    .catch(error => {
      throw error.message
    })
}

const getById = async (id) => {
  return await supabase
    .from('Users')
    .select('*')
    .eq('id', id)
    .then(({ data, error }) => {
      if (error) throw error

      return data
    })
    .catch(error => {
      throw error.message
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
}