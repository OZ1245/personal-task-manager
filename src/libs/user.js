import { useStore } from 'vuex'
import userApi from '@/api/user'


export function useUser() { 
  const $store = useStore()

  const createUser = async (data) => {
    return await userApi
      .signUp(data)
      .then(result => {
        $store.dispatch('setUserAuthData', result)

        userApi
          .insertRow({
            id: result.user.id,
            email: result.user.email,
            created: result.user.created_at,
            active: true,
            settings: {
              name: null,
              language: 'en'
            }
          })
          .then(result => {
            return result
          })
      })
      .catch(error => {
        throw error
      })
  }

  const login = async (data) => {
    return await userApi
      .signIn(data)
      .then(result => {
        userApi
          .getById(result.user.id)
          .then(async rows => {
            if (rows.lenght && rows.active) {
              $store.dispatch('setUserAuthData', result)

              return await userApi
                .updateById({
                  last_login: result.user.updated_at
                },
                  result.user.id
                )
                .then(result => {
                  return result
                })
            } else {
              return {
                error: 'This user is not active or has been deleted'
              }
            }
          })
      })
  }

  const logout = async () => {
    return await userApi.signOut()
  }

  const getUser = async () => {
    console.log('--- getUser method ---')
    return await userApi
      .retrieveUser()
      .then(async user => {
        console.log('user:', user)
      
        if (!user.id) {
          userApi.signOut()
          
          return
        }
      
        return await userApi
          .getById(user.id)
          .then(rows => {
            console.log('result:', rows)
            return rows[0]
          })
        })
  }

  const unactive = async () => {
    return await userApi
      .retrieveUser()
      .then(async user => {

        if (!user.id) {
          userApi.signOut()

          return
        }

        return await userApi
          .updateById({
              active: false
            },
            user.id
          )
          .then(result => {
            if (result) {
              logout()
            }
          })
      })
  }

  const deleteUser = async () => {
    console.log('--- deleteUser method ---')
    return await userApi
      .retrieveUser()
      .then(async user => {
        console.log('user.id:', user.id)

        if (!user.id) {
          userApi.signOut()
          return
        }

        // return await userApi
          // .deleteUser(user.id)
          // .then(async result => {
          //   if (result) {
              return await userApi
                .deleteById(user.id)
                .then(result => {
                  console.log('result:', result)
                  return result
                })
          //   }
          // })
      })
  }

  return {
    createUser,
    getUser,
    login,
    logout,
    unactive,
    deleteUser,
  }
}