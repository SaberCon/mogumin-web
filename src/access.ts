/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser }) {
  return {
    canAdmin: initialState.currentUser != null,
  }
}
