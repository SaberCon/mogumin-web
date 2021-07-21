import {history, useModel} from 'umi'
import {getCurrentUser} from '@/services/user'


export const useCurrentUser = () => {
  const {initialState, setInitialState} = useModel('@@initialState')

  if (initialState!.currentUser == null) {
    history.push({
      pathname: '/user/login',
      query: {redirect: history.location.pathname},
    })
  }

  const refreshCurrentUser = async () => {
    try {
      setInitialState({...initialState!, currentUser: await getCurrentUser()})
    } catch (error) {
      setInitialState({...initialState!, currentUser: undefined})
    }
  }

  return {currentUser: initialState!.currentUser, refreshCurrentUser}
}
