import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { UsersPage } from './pages/Users.page';
import { UserPage } from './pages/User.page';
import { UserEditPage } from './pages/UserEdit.page';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/users',
    element: <UsersPage />,
  },
  {
    path: '/users/view/:id',
    element:<UserPage/>,
  },
  {
    path: '/users/edit/:id',
    element:<UserEditPage/>,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
