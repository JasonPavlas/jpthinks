import { Home } from "./components/Home";
import { Counter } from "./components/Counter";
import { Weather } from "./components/Weather";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/weather',
    element: <Weather />
  }
];

export default AppRoutes;
