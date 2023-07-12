import { useStore } from 'vuex'
import userApi from '@/api/user'
import { useRouter } from 'vue-router'

export function useUser() { 
  const $store = useStore()
  const $router = useRouter()

  const createUser = async (data) => {
    return await userApi
      .signUp(data)
      .then(async result => {
        $store.dispatch('setUserAuthData', result)

        return await userApi
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
  }

  const login = async (data) => {
    console.log(' --- login lib method ---')
    return await userApi
      .signIn(data)
      .then(async result => {
        console.log('result:', result)

        if (result) {
          return await userApi
            .getById(result.user.id)
            .then(row => {
              console.log('row:', row)
              if (row.active) {
                localStorage.setItem('token', result?.session.access_token)
                $store.dispatch('setUserAuthData', result)

                userApi
                  .updateById({
                    last_login: result.user.updated_at
                  },
                    result.user.id
                  )
                  .then(result => {
                    return result
                  })
                
                $router.push({
                  name: 'Home'
                })
              } else {
                return {
                  error: 'This user is not active or has been deleted'
                }
              }
            })
        }
      })
  }

  const logout = async () => {
    return await userApi
      .signOut()
      .then(result => {
        if (result) {
          $store.dispatch('clearAuthData')
          localStorage.removeItem('token')
          $router.push({
            name: 'Auth'
          })
        }
      })
  }

  const checkSession = async () => {
    console.log('--- checkSession lib method ---')

    return await userApi
      .getSession()
      .then(data => {
        console.log('data:', data)

        return data
      })
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
    checkSession,
  }
}