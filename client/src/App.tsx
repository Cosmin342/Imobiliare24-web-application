import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { AppIntlProvider } from "@presentation/components/ui/AppIntlProvider";
import { ToastNotifier } from "@presentation/components/ui/ToastNotifier";
import { AnnouncementsPage } from "@presentation/pages/AnnouncementPage";
import { FollowedAnnouncementsPage } from "@presentation/pages/FollowedAnnouncementPage";
import { HomePage } from "@presentation/pages/HomePage";
import { LoginPage } from "@presentation/pages/LoginPage";
import { NotificationsPage } from "@presentation/pages/NotificationPage";
import { SignUpPage } from "@presentation/pages/SignUpPage";
import { UserFilesPage } from "@presentation/pages/UserFilesPage";
import { UsersPage } from "@presentation/pages/UsersPage";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "routes";

export function App() {
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  return <AppIntlProvider> {/* AppIntlProvider provides the functions to search the text after the provides string ids. */}
      <ToastNotifier />
      {/* This adds the routes and route mappings on the various components. */}
      <Routes>
        <Route path={AppRoute.Index} element={<HomePage />} /> {/* Add a new route with a element as the page. */}
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.SignUp} element={<SignUpPage />} />
        <Route path={AppRoute.Notifications} element={<NotificationsPage />} />
        <Route path={AppRoute.Announcements} element={<AnnouncementsPage />} />
        <Route path={AppRoute.Subscriptions} element={<FollowedAnnouncementsPage />} />
        {isAdmin && <Route path={AppRoute.Users} element={<UsersPage />} />} {/* If the user doesn't have the right role this route shouldn't be used. */}
        {isAdmin && <Route path={AppRoute.UserFiles} element={<UserFilesPage />} />}
      </Routes>
    </AppIntlProvider>
}
