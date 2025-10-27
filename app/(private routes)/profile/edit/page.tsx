"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import css from "./EditProfile.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { getMe, updateMe } from "@/lib/api/clientApi";

const EditProfile = () => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getMe();
        if (currentUser) {
          setUsername(currentUser.username);
          setUser(currentUser); 
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateMe({ username });
      setUser(updatedUser); 
      router.push("/profile"); 
    } catch (err) {
      console.error(err);
      setError("Failed to update username");
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || "/default-avatar.png"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
};

export default EditProfile;