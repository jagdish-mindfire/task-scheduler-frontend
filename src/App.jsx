import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import client from './graphql/client.js'
import { TaskProvider } from "./context/TaskContext.jsx";
import { TaskModelStatesProvider } from "./context/TaskModelStates.jsx";
import { router} from "./routes/allRoute.jsx";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient()


const App = () => {
  return (
    <ApolloProvider client={client}>
    <QueryClientProvider client={queryClient}>
      <TaskProvider>
        <TaskModelStatesProvider>
        <RouterProvider router={router} />
        <ToastContainer />
        </TaskModelStatesProvider>
      </TaskProvider>
    </QueryClientProvider>
    </ApolloProvider>
  );
};

export default App;
