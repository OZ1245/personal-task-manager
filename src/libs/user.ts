import { useStore } from 'vuex'
import userApi, { IAuthParams, IUser } from '@/api/users'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

export function useUser() { 
  const $store = useStore()
  const $router = useRouter()

  const createUser = async (data: IAuthParams): Promise<IUser> => {
    return await userApi
      .signUp(data)
      .then(async ({ data, error }) => {
        if (error) {
          return {
            error: true,
            message: JSON.parse(JSON.stringify(error)).message
          }
        }

        // localStorage.setItem(`sb-${process.env.SUPABASE_URL}-auth-token`)
        localStorage.setItem('token', data?.session.access_token)
        $store.dispatch('setUserAuthData', data)

        return await userApi
          .insertRow({
            id: data.user.id,
            email: data.user.email,
            active: true,
            settings: {
              name: null,
              language: 'en'
            }
          })
          .then(row => {
            localStorage.setItem('language', row.settings.language)
            $store.dispatch('setUserData', row)
                  
            return row
          })
      })
  }

  const login = async (data: IAuthParams): Promise<IUser> => {
    return await userApi
      .signIn(data)
      .then(async ({ data, error }) => {
        if (error) {
          return {
            error: true,
            message: JSON.parse(JSON.stringify(error)).message
          }
        }

        if (data) {
          return await userApi
            .getById(data.user.id)
            .then(async (row) => {
              if (row.active) {
                // localStorage.setItem(`sb-${process.env.SUPABASE_URL}-auth-token`)
                localStorage.setItem('token', data?.session.access_token)
                $store.dispatch('setUserAuthData', data)

                return await userApi
                  .updateById({
                    last_login: data.user.updated_at
                  },
                    data.user.id
                  )
                  .then(data => {
                    $store.dispatch('setUserData', data)

                    $router.push({
                      name: 'Home'
                    })

                  return data
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
          $store.dispatch('clearUserData')
          localStorage.removeItem('token')
          $router.push({
            name: 'Auth'
          })
        }
      })
  }

  const checkSession = async () => {
    return await userApi
      .getSession()
      .then(data => {
        return data
      })
  }

  const fetchUser = async () => {
    return await userApi
      .retrieveUser()
      .then(async user => {
        if (!user.id) {
          userApi.signOut()
          
          return
        }
      
        return await userApi
          .getById(user.id)
          .then(result => {
            $store.dispatch('setUserData', result)
            return result
          })
        })
  }

  const getUser = () => {
    return computed(() => $store.state.user.data).value
  }

  const getUserData = async () => {
    return await userApi
      .getAuthUserData()
      .then(data => {
        $store.dispatch('setUserAuthData', data)
        
        return data
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

  // FIXME: Наверное нельзя удалить свой же профиль. 
  // Кажется это может только админ БД
  const deleteUser = async () => {
    return await userApi
      .retrieveUser()
      .then(async user => {
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
                  return result
                })
          //   }
          // })
      })
  }

  return {
    createUser,
    fetchUser,
    getUserData,
    login,
    logout,
    unactive,
    deleteUser,
    checkSession,
    getUser,
  }
}