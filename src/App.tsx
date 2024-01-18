import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ServerStatusWrapper from './component/ServerStatusWrapper';
import AuthProvider from './providers/AuthProvider';
import AppRouter from './router/AppRouter';
import useAuthStore from './store/authStore';

function App() {
  const queryClient = new QueryClient();

  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    const handleStorageChange = () => {
      window.location.reload();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Poppins',
          fontSize: 14,
        },
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ServerStatusWrapper>
            {isLoggedIn ? (
              <AuthProvider>
                <AppRouter />
              </AuthProvider>
            ) : (
              <AppRouter />
            )}
          </ServerStatusWrapper>
        </QueryClientProvider>
      </BrowserRouter>

      <ToastContainer
        position="bottom-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ConfigProvider>
  );
}

export default App;
