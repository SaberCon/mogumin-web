export default [
  { path: '/', redirect: '/welcome' },
  { name: 'Welcome', icon: 'smile', path: '/welcome', component: './Welcome' },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: 'login',
        layout: false,
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    name: 'Account',
    icon: 'user',
    path: '/account',
    routes: [
      {
        path: '/account',
        redirect: '/account/center',
      },
      {
        name: 'Account Center',
        icon: 'smile',
        path: '/account/center',
        component: './account/center',
      },
      {
        name: 'Account Settings',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
      },
    ],
  },
  {
    name: 'Graphic Editor',
    icon: 'highlight',
    path: '/editor',
    routes: [
      {
        path: '/editor',
        redirect: '/editor/flow',
      },
      {
        name: 'Flow Editor',
        icon: 'smile',
        path: '/editor/flow',
        component: './editor/flow',
      },
      {
        name: 'Mind Editor',
        icon: 'smile',
        path: '/editor/mind',
        component: './editor/mind',
      },
      {
        name: 'Koni Editor',
        icon: 'smile',
        path: '/editor/koni',
        component: './editor/koni',
      },
    ],
  },
  { component: './404' },
]
