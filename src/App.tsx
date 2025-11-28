import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import Layout from './components/Layout'
import Index from './pages/Index'
import NotFound from './pages/NotFound'

// Public Pages
import PastureManagement from './pages/public/PastureManagement'
import NutritionalManagement from './pages/public/NutritionalManagement'
import SanitaryControl from './pages/public/SanitaryControl'
import ReproductiveManagement from './pages/public/ReproductiveManagement'
import HerdManagement from './pages/public/HerdManagement'
import ManagementAid from './pages/public/ManagementAid'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminFarms from './pages/admin/AdminFarms'
import AdminPasture from './pages/admin/AdminPasture'
import AdminNutrition from './pages/admin/AdminNutrition'
import AdminSanitary from './pages/admin/AdminSanitary'
import AdminReproduction from './pages/admin/AdminReproduction'
import AdminHerd from './pages/admin/AdminHerd'
import AdminAid from './pages/admin/AdminAid'

// Farm Pages
import FarmDashboard from './pages/farm/FarmDashboard'
import FarmPasture from './pages/farm/FarmPasture'
import FarmNutrition from './pages/farm/FarmNutrition'
import FarmSanitary from './pages/farm/FarmSanitary'
import FarmReproduction from './pages/farm/FarmReproduction'
import FarmHerd from './pages/farm/FarmHerd'
import FarmAid from './pages/farm/FarmAid'

const ProtectedRoute = ({
  children,
  role,
}: {
  children: React.ReactNode
  role: 'admin' | 'farm'
}) => {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Carregando...</div>
  if (!user) return <Navigate to="/" replace />
  if (user.role !== role) return <Navigate to="/" replace />

  return <>{children}</>
}

const App = () => (
  <BrowserRouter
    future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
  >
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/pastagens" element={<PastureManagement />} />
            <Route path="/nutricao" element={<NutritionalManagement />} />
            <Route path="/sanitario" element={<SanitaryControl />} />
            <Route path="/reproducao" element={<ReproductiveManagement />} />
            <Route path="/rebanho" element={<HerdManagement />} />
            <Route path="/auxilio" element={<ManagementAid />} />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/fazendas"
              element={
                <ProtectedRoute role="admin">
                  <AdminFarms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manejo-fazendas"
              element={
                <ProtectedRoute role="admin">
                  <AdminPasture />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/nutricao"
              element={
                <ProtectedRoute role="admin">
                  <AdminNutrition />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/sanitario"
              element={
                <ProtectedRoute role="admin">
                  <AdminSanitary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reproducao"
              element={
                <ProtectedRoute role="admin">
                  <AdminReproduction />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/rebanho"
              element={
                <ProtectedRoute role="admin">
                  <AdminHerd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/auxilio"
              element={
                <ProtectedRoute role="admin">
                  <AdminAid />
                </ProtectedRoute>
              }
            />

            {/* Farm Routes */}
            <Route
              path="/farm/:farmId/dashboard"
              element={
                <ProtectedRoute role="farm">
                  <FarmDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farm/:farmId/pastagens"
              element={
                <ProtectedRoute role="farm">
                  <FarmPasture />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farm/:farmId/nutricao"
              element={
                <ProtectedRoute role="farm">
                  <FarmNutrition />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farm/:farmId/sanitario"
              element={
                <ProtectedRoute role="farm">
                  <FarmSanitary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farm/:farmId/reproducao"
              element={
                <ProtectedRoute role="farm">
                  <FarmReproduction />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farm/:farmId/rebanho"
              element={
                <ProtectedRoute role="farm">
                  <FarmHerd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farm/:farmId/auxilio"
              element={
                <ProtectedRoute role="farm">
                  <FarmAid />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
