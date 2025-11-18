import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../src/pages/Landing';
import Dashboard from '../src/pages/Dashboard';
import { ProtectedRoute } from '../src/components/auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
