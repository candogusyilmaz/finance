/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedWorksitesIndexImport } from './routes/_authenticated/worksites/index'
import { Route as AuthenticatedPurchasesIndexImport } from './routes/_authenticated/purchases/index'
import { Route as AuthenticatedProductsIndexImport } from './routes/_authenticated/products/index'
import { Route as AuthenticatedOrganizationsIndexImport } from './routes/_authenticated/organizations/index'
import { Route as AuthenticatedEmployeesIndexImport } from './routes/_authenticated/employees/index'
import { Route as AuthenticatedDeliveriesIndexImport } from './routes/_authenticated/deliveries/index'
import { Route as AuthenticatedDashboardIndexImport } from './routes/_authenticated/dashboard/index'
import { Route as AuthenticatedPurchasesNewImport } from './routes/_authenticated/purchases/new'
import { Route as AuthenticatedProductsProductIdImport } from './routes/_authenticated/products/$productId'
import { Route as AuthenticatedEmployeesEmployeeIdImport } from './routes/_authenticated/employees/$employeeId'
import { Route as AuthenticatedDeliveriesNewImport } from './routes/_authenticated/deliveries/new'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedWorksitesIndexRoute =
  AuthenticatedWorksitesIndexImport.update({
    path: '/worksites/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedPurchasesIndexRoute =
  AuthenticatedPurchasesIndexImport.update({
    path: '/purchases/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedProductsIndexRoute = AuthenticatedProductsIndexImport.update(
  {
    path: '/products/',
    getParentRoute: () => AuthenticatedRoute,
  } as any,
)

const AuthenticatedOrganizationsIndexRoute =
  AuthenticatedOrganizationsIndexImport.update({
    path: '/organizations/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedEmployeesIndexRoute =
  AuthenticatedEmployeesIndexImport.update({
    path: '/employees/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedDeliveriesIndexRoute =
  AuthenticatedDeliveriesIndexImport.update({
    path: '/deliveries/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedDashboardIndexRoute =
  AuthenticatedDashboardIndexImport.update({
    path: '/dashboard/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedPurchasesNewRoute = AuthenticatedPurchasesNewImport.update({
  path: '/purchases/new',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedProductsProductIdRoute =
  AuthenticatedProductsProductIdImport.update({
    path: '/products/$productId',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedEmployeesEmployeeIdRoute =
  AuthenticatedEmployeesEmployeeIdImport.update({
    path: '/employees/$employeeId',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedDeliveriesNewRoute = AuthenticatedDeliveriesNewImport.update(
  {
    path: '/deliveries/new',
    getParentRoute: () => AuthenticatedRoute,
  } as any,
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/deliveries/new': {
      id: '/_authenticated/deliveries/new'
      path: '/deliveries/new'
      fullPath: '/deliveries/new'
      preLoaderRoute: typeof AuthenticatedDeliveriesNewImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/employees/$employeeId': {
      id: '/_authenticated/employees/$employeeId'
      path: '/employees/$employeeId'
      fullPath: '/employees/$employeeId'
      preLoaderRoute: typeof AuthenticatedEmployeesEmployeeIdImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/products/$productId': {
      id: '/_authenticated/products/$productId'
      path: '/products/$productId'
      fullPath: '/products/$productId'
      preLoaderRoute: typeof AuthenticatedProductsProductIdImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/purchases/new': {
      id: '/_authenticated/purchases/new'
      path: '/purchases/new'
      fullPath: '/purchases/new'
      preLoaderRoute: typeof AuthenticatedPurchasesNewImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/dashboard/': {
      id: '/_authenticated/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthenticatedDashboardIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/deliveries/': {
      id: '/_authenticated/deliveries/'
      path: '/deliveries'
      fullPath: '/deliveries'
      preLoaderRoute: typeof AuthenticatedDeliveriesIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/employees/': {
      id: '/_authenticated/employees/'
      path: '/employees'
      fullPath: '/employees'
      preLoaderRoute: typeof AuthenticatedEmployeesIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/organizations/': {
      id: '/_authenticated/organizations/'
      path: '/organizations'
      fullPath: '/organizations'
      preLoaderRoute: typeof AuthenticatedOrganizationsIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/products/': {
      id: '/_authenticated/products/'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof AuthenticatedProductsIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/purchases/': {
      id: '/_authenticated/purchases/'
      path: '/purchases'
      fullPath: '/purchases'
      preLoaderRoute: typeof AuthenticatedPurchasesIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/worksites/': {
      id: '/_authenticated/worksites/'
      path: '/worksites'
      fullPath: '/worksites'
      preLoaderRoute: typeof AuthenticatedWorksitesIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedDeliveriesNewRoute: typeof AuthenticatedDeliveriesNewRoute
  AuthenticatedEmployeesEmployeeIdRoute: typeof AuthenticatedEmployeesEmployeeIdRoute
  AuthenticatedProductsProductIdRoute: typeof AuthenticatedProductsProductIdRoute
  AuthenticatedPurchasesNewRoute: typeof AuthenticatedPurchasesNewRoute
  AuthenticatedDashboardIndexRoute: typeof AuthenticatedDashboardIndexRoute
  AuthenticatedDeliveriesIndexRoute: typeof AuthenticatedDeliveriesIndexRoute
  AuthenticatedEmployeesIndexRoute: typeof AuthenticatedEmployeesIndexRoute
  AuthenticatedOrganizationsIndexRoute: typeof AuthenticatedOrganizationsIndexRoute
  AuthenticatedProductsIndexRoute: typeof AuthenticatedProductsIndexRoute
  AuthenticatedPurchasesIndexRoute: typeof AuthenticatedPurchasesIndexRoute
  AuthenticatedWorksitesIndexRoute: typeof AuthenticatedWorksitesIndexRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedDeliveriesNewRoute: AuthenticatedDeliveriesNewRoute,
  AuthenticatedEmployeesEmployeeIdRoute: AuthenticatedEmployeesEmployeeIdRoute,
  AuthenticatedProductsProductIdRoute: AuthenticatedProductsProductIdRoute,
  AuthenticatedPurchasesNewRoute: AuthenticatedPurchasesNewRoute,
  AuthenticatedDashboardIndexRoute: AuthenticatedDashboardIndexRoute,
  AuthenticatedDeliveriesIndexRoute: AuthenticatedDeliveriesIndexRoute,
  AuthenticatedEmployeesIndexRoute: AuthenticatedEmployeesIndexRoute,
  AuthenticatedOrganizationsIndexRoute: AuthenticatedOrganizationsIndexRoute,
  AuthenticatedProductsIndexRoute: AuthenticatedProductsIndexRoute,
  AuthenticatedPurchasesIndexRoute: AuthenticatedPurchasesIndexRoute,
  AuthenticatedWorksitesIndexRoute: AuthenticatedWorksitesIndexRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof AuthenticatedRouteWithChildren
  '/login': typeof LoginRoute
  '/deliveries/new': typeof AuthenticatedDeliveriesNewRoute
  '/employees/$employeeId': typeof AuthenticatedEmployeesEmployeeIdRoute
  '/products/$productId': typeof AuthenticatedProductsProductIdRoute
  '/purchases/new': typeof AuthenticatedPurchasesNewRoute
  '/dashboard': typeof AuthenticatedDashboardIndexRoute
  '/deliveries': typeof AuthenticatedDeliveriesIndexRoute
  '/employees': typeof AuthenticatedEmployeesIndexRoute
  '/organizations': typeof AuthenticatedOrganizationsIndexRoute
  '/products': typeof AuthenticatedProductsIndexRoute
  '/purchases': typeof AuthenticatedPurchasesIndexRoute
  '/worksites': typeof AuthenticatedWorksitesIndexRoute
}

export interface FileRoutesByTo {
  '': typeof AuthenticatedRouteWithChildren
  '/login': typeof LoginRoute
  '/deliveries/new': typeof AuthenticatedDeliveriesNewRoute
  '/employees/$employeeId': typeof AuthenticatedEmployeesEmployeeIdRoute
  '/products/$productId': typeof AuthenticatedProductsProductIdRoute
  '/purchases/new': typeof AuthenticatedPurchasesNewRoute
  '/dashboard': typeof AuthenticatedDashboardIndexRoute
  '/deliveries': typeof AuthenticatedDeliveriesIndexRoute
  '/employees': typeof AuthenticatedEmployeesIndexRoute
  '/organizations': typeof AuthenticatedOrganizationsIndexRoute
  '/products': typeof AuthenticatedProductsIndexRoute
  '/purchases': typeof AuthenticatedPurchasesIndexRoute
  '/worksites': typeof AuthenticatedWorksitesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/login': typeof LoginRoute
  '/_authenticated/deliveries/new': typeof AuthenticatedDeliveriesNewRoute
  '/_authenticated/employees/$employeeId': typeof AuthenticatedEmployeesEmployeeIdRoute
  '/_authenticated/products/$productId': typeof AuthenticatedProductsProductIdRoute
  '/_authenticated/purchases/new': typeof AuthenticatedPurchasesNewRoute
  '/_authenticated/dashboard/': typeof AuthenticatedDashboardIndexRoute
  '/_authenticated/deliveries/': typeof AuthenticatedDeliveriesIndexRoute
  '/_authenticated/employees/': typeof AuthenticatedEmployeesIndexRoute
  '/_authenticated/organizations/': typeof AuthenticatedOrganizationsIndexRoute
  '/_authenticated/products/': typeof AuthenticatedProductsIndexRoute
  '/_authenticated/purchases/': typeof AuthenticatedPurchasesIndexRoute
  '/_authenticated/worksites/': typeof AuthenticatedWorksitesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/login'
    | '/deliveries/new'
    | '/employees/$employeeId'
    | '/products/$productId'
    | '/purchases/new'
    | '/dashboard'
    | '/deliveries'
    | '/employees'
    | '/organizations'
    | '/products'
    | '/purchases'
    | '/worksites'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/login'
    | '/deliveries/new'
    | '/employees/$employeeId'
    | '/products/$productId'
    | '/purchases/new'
    | '/dashboard'
    | '/deliveries'
    | '/employees'
    | '/organizations'
    | '/products'
    | '/purchases'
    | '/worksites'
  id:
    | '__root__'
    | '/_authenticated'
    | '/login'
    | '/_authenticated/deliveries/new'
    | '/_authenticated/employees/$employeeId'
    | '/_authenticated/products/$productId'
    | '/_authenticated/purchases/new'
    | '/_authenticated/dashboard/'
    | '/_authenticated/deliveries/'
    | '/_authenticated/employees/'
    | '/_authenticated/organizations/'
    | '/_authenticated/products/'
    | '/_authenticated/purchases/'
    | '/_authenticated/worksites/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/login"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/deliveries/new",
        "/_authenticated/employees/$employeeId",
        "/_authenticated/products/$productId",
        "/_authenticated/purchases/new",
        "/_authenticated/dashboard/",
        "/_authenticated/deliveries/",
        "/_authenticated/employees/",
        "/_authenticated/organizations/",
        "/_authenticated/products/",
        "/_authenticated/purchases/",
        "/_authenticated/worksites/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_authenticated/deliveries/new": {
      "filePath": "_authenticated/deliveries/new.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/employees/$employeeId": {
      "filePath": "_authenticated/employees/$employeeId.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/products/$productId": {
      "filePath": "_authenticated/products/$productId.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/purchases/new": {
      "filePath": "_authenticated/purchases/new.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/dashboard/": {
      "filePath": "_authenticated/dashboard/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/deliveries/": {
      "filePath": "_authenticated/deliveries/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/employees/": {
      "filePath": "_authenticated/employees/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/organizations/": {
      "filePath": "_authenticated/organizations/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/products/": {
      "filePath": "_authenticated/products/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/purchases/": {
      "filePath": "_authenticated/purchases/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/worksites/": {
      "filePath": "_authenticated/worksites/index.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
