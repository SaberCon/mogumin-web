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
        name: 'Login',
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
        path: '/account/center',
        component: './account/center',
      },
      {
        name: 'Account Settings',
        path: '/account/settings',
        component: './account/settings',
      },
      {
        name: 'Account Settings',
        path: '/account/settings/:type?/:subtype?',
        hideInMenu: true,
        component: './account/settings',
      },
    ],
  },
  {
    name: 'Note',
    icon: 'book',
    path: '/note',
    routes: [
      {
        path: '/note',
        redirect: '/note/list',
      },
      {
        name: 'Note List',
        path: '/note/list',
        component: './note/list',
      },
      {
        name: 'Add Note',
        path: '/note/add',
        component: './note/edit',
      },
      {
        name: 'Edit Note',
        path: '/note/edit/:id',
        hideInMenu: true,
        component: './note/edit',
      },
      {
        name: 'Read Note',
        path: '/note/read/:id',
        hideInMenu: true,
        component: './note/read',
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
        path: '/editor/flow',
        component: './editor/flow',
      },
      {
        name: 'Mind Editor',
        path: '/editor/mind',
        component: './editor/mind',
      },
      {
        name: 'Koni Editor',
        path: '/editor/koni',
        component: './editor/koni',
      },
    ],
  },
  { component: './404' },
]
