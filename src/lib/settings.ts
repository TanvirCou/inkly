type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  '/user-profile': ['user', 'admin'],
  '/admin(.*)': ['admin'],
  '/user/(.*)': ['user'],
  '/create-post': ['user', 'admin'],
};
