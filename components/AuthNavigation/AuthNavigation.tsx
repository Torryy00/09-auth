"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import css from "./AuthNavigation.module.css";
import { useAuthStore } from "../../lib/store/authStore";
import { logout as logoutApi } from "../../lib/api/clientApi";

const AuthNavigation = () => {
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutApi();
      clearIsAuthenticated();
      router.push("/sign-in");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" className={css.navigationLink} prefetch={false}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in" className={css.navigationLink} prefetch={false}>
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/sign-up" className={css.navigationLink} prefetch={false}>
              Register
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;