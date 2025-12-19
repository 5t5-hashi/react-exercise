import React, { Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { useMenuStore } from '@/stores/menu.js'
import ErrorPage from '@/pages/error/index.jsx'
import { Skeleton } from 'antd';

// ** ：递归匹配多级目录0 层或多层
// * ：仅匹配单层目录名，不递归
const modules = import.meta.glob('/src/pages/**/*.jsx', { eager: true })

// 递归遍历菜单列表，提取所有路由路径
function flattenMenuPaths(list) {
  var out = []
  function walk(arr) {
    if (!arr || !Array.isArray(arr)) return
    var i = 0
    for (i = 0; i < arr.length; i++) {
      var it = arr[i]
      if (it && it.key) {
        out.push(it.key)
      }
      if (it && it.children && Array.isArray(it.children) && it.children.length > 0) {
        walk(it.children)
      }
    }
  }
  walk(list)
  return out
}

// 检查路径是否在允许列表中
function isAllowedPath(pathname, allowList) {
  var i = 0
  for (i = 0; i < allowList.length; i++) {
    if (allowList[i] === pathname) {
      return true
    }
  }
  return false
}

// 将路径转换为文件路径
function pathToFile(pathname) {
  if (!pathname || pathname === '/') {
    return '/src/pages/welcome/index.jsx'
  }
  return '/src/pages' + pathname + '.jsx'
}

export default function DynamicModule() {
  var location = useLocation()
  var menus = useMenuStore(function (s) { return s.menuList })
  var pathname = location && location.pathname ? location.pathname : '/'

  var allowList = flattenMenuPaths(menus || [])
  var file = pathToFile(pathname)
  
  console.log('DynamicModule Debug:', { pathname, file, hasLoader: !!modules[file] })

  var module = modules[file]

  if (!isAllowedPath(pathname, allowList) || !module) {
    return <ErrorPage />
  }

  // Eager 模式下，modules[file] 直接就是模块对象，module.default 就是组件
  var Component = module.default
  
  return <Component />
}
