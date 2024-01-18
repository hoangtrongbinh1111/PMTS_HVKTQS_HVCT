// ** Router imports
import { lazy, useContext, useEffect } from 'react'

// ** Router imports
import { useRoutes, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'

// ** Hooks Imports
import { useLayout } from '@hooks/useLayout'

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from '../utility/Utils'

// ** GetRoutes
import { getRoutes } from './routes'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'
import { initialAbility } from '../configs/acl/initialAbility'

// ** Components
const Error = lazy(() => import('../views/pages/misc/Error'))
const Login = lazy(() => import('../views/pages/authentication/Login'))
const NotAuthorized = lazy(() => import('../views/pages/misc/NotAuthorized'))
import { handleLogout } from '@store/authentication'

const _handlePermission = (memberInfo) => {
  const permissionArr = memberInfo.tenChucNang ? JSON.parse(memberInfo.tenChucNang) : []
  let permissionArrFormat = permissionArr.map(permiss => {
    return {
      action: permiss.action,
      subject: permiss.subject
    }
  })
  permissionArrFormat = permissionArrFormat.concat(initialAbility)
  if (memberInfo.tenNhom === 'ADMIN') {
    permissionArrFormat = permissionArrFormat.concat({
      action: "manage",
      subject: "all"
    })
  }
  return permissionArrFormat
}

const Router = () => {
  // ** Hooks
  const { layout } = useLayout()

  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const allRoutes = getRoutes(layout)
  const getHomeRoute = () => {
    const user = getUserData()
    if (user) {
      const listPermission = _handlePermission(user)
      ability.update(listPermission)
      return getHomeRouteForLoggedInUser(user.role)
    } else {
      return '/login'
    }
  }
  // xử lý thời gian đăng nhập là 15ph
  useEffect(() => {
    const currentTime = new Date().getTime()
    const temp = (currentTime - parseInt(localStorage.getItem('storagetime')))
    if (localStorage.getItem('storagetime') && (currentTime - parseInt(localStorage.getItem('storagetime'))) > 1000 * 60 * 15) {
      dispatch(handleLogout())
    } else {
      localStorage.setItem('storagetime', currentTime)
    }
  }, [])
  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    {
      path: '/login',
      element: <BlankLayout />,
      children: [{ path: '/login', element: <Login /> }]
    },
    {
      path: '/auth/not-auth',
      element: <BlankLayout />,
      children: [{ path: '/auth/not-auth', element: <NotAuthorized /> }]
    },
    {
      path: '*',
      element: <BlankLayout />,
      children: [{ path: '*', element: <Error /> }]
    },
    ...allRoutes
  ])

  return routes
}

export default Router
