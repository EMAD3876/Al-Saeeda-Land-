import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import HomePage from "./app/home/HomePage";
import MenuPage from "./app/menu/MenuPage";
import GalleryPage from "./app/gallery/GalleryPage";
import ReservationPage from "./app/reservation/ReservationPage";
import AboutPage from "./app/about/AboutPage";
import ContactPage from "./app/contact/ContactPage";
import SeafoodPage from "./app/seafood/SeafoodPage";
import BakeryPage from "./app/bakery/BakeryPage";
import ResortPage from "./app/resort/ResortPage";
import EventsPage from "./app/events/EventsPage";
import AdminDashboardPage from "./app/admin/AdminDashboardPage";
import AdminReservationsPage from "./app/admin/AdminReservationsPage";
// More pages will be added here

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/seafood" element={<SeafoodPage />} />
            <Route path="/bakery" element={<BakeryPage />} />
            <Route path="/resort" element={<ResortPage />} />
            <Route path="/events" element={<EventsPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["ADMIN", "STAFF"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="reservations" element={<AdminReservationsPage />} />
              {/* Add menu, gallery, settings here */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
