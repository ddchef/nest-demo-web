import _import from './_import'
function deepLoopDecorateRoutes (routes = [], permissions) {
  return routes.map(route => {
    route.meta = {}
    route.meta.id = route.id
    route.meta.title = route.title
    if (!route.name && route.id) {
      route.name = route.id
    }
    if (route.permissionId) {
      route.meta.id = route.permissionId
    }
    if (!permissions[route.id]) {
      return undefined
    }
    if (route.component) {
      route.component = _import(route.component)
    }
    route.props = true
    route.children = deepLoopDecorateRoutes(route.children, permissions)
    if (!route.component && route.children.length > 0) {
      route.component = _import('/layout/supplement.vue')
      route.redirect = { name: route.children[0].name }
    }
    return route
  }).filter(v => v)
}

function getMenus (routes = []) {
  return routes.map(route => {
    if (route.isMenu) {
      return {
        id: route.meta.id,
        title: route.title,
        path: route.path,
        children: getMenus(route.children)
      }
    }
    return undefined
  }).filter(v => v)
}

export default function (routes, permissions) {
  const _routes = deepLoopDecorateRoutes(routes, permissions)
  const _menus = getMenus(_routes)
  return [_routes, _menus]
}
