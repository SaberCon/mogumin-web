import { history, useModel } from 'umi'
import { getCurrentUser } from '@/services/user'

const EMPTY_USER: API.CurrentUser = {
  id: 0,
  username: '',
  phone: '',
  avatar: '',
}

export const useCurrentUser = (): { currentUser: API.CurrentUser | undefined; refreshCurrentUser: () => Promise<void> } => {
  const { initialState = { settings: {} }, setInitialState } = useModel('@@initialState')

  const refreshCurrentUser = async () => {
    try {
      await setInitialState({ ...initialState, currentUser: await getCurrentUser() })
    } catch (error) {
      await setInitialState({ ...initialState, currentUser: undefined })
    }
  }

  return { currentUser: initialState.currentUser, refreshCurrentUser }
}

export const useCurrentUserOrGoToLogin = (): { currentUser: API.CurrentUser; refreshCurrentUser: () => Promise<void> } => {
  const { currentUser, refreshCurrentUser } = useCurrentUser()

  if (!currentUser) {
    if (history.location.pathname !== '/user/login') {
      history.push({
        pathname: '/user/login',
        query: { redirect: history.location.pathname },
      })
    }
    return { currentUser: EMPTY_USER, refreshCurrentUser }
  }

  return { currentUser, refreshCurrentUser }
}
