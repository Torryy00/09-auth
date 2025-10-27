'use client';

import React, { FormEvent, JSX, useState } from 'react';
import css from './EditProfilePage.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { User } from '@/types/user';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/lib/api/clientApi'; // 

const useAuthStoreSelector = useAuthStore as unknown as <T>(
  selector: (state: {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    clearIsAuthenticated: () => void;
  }) => T
) => T;

export default function EditProfilePage(): JSX.Element {
  const router = useRouter();

  const user = useAuthStoreSelector((s) => s.user);
  const setUser = useAuthStoreSelector((s) => s.setUser);

  const [username, setUsername] = useState<string>(user?.username ?? '');
  const [email] = useState<string>(user?.email ?? ''); // readonly
  const [avatarUrl, setAvatarUrl] = useState<string>(user?.avatar ?? '/default-avatar.png');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  if (!user) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>
          <p>Loading user data...</p>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {

      const payload = {
        username: username.trim(),
        avatar: avatarUrl,
      };

      const res = await updateMe(payload);

      let updatedUser: User | null = null;
      if (res && typeof res === 'object' && 'user' in res) {
        updatedUser = (res as { user: User }).user;
      } else if (res && typeof res === 'object' && 'username' in res) {
        updatedUser = res as User;
      }

      if (!updatedUser) {
        throw new Error('Invalid response from server');
      }

      setUser(updatedUser);

      router.push('/profile');
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = (): void => {
    router.back();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarUrl(e.target.value);
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <div className={css.avatarWrapper}>
          <Image
            src={avatarUrl || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="email">Email (read-only)</label>
            <input
              id="email"
              name="email"
              type="email"
              className={css.input}
              value={email}
              readOnly
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="avatar">Avatar URL</label>
            <input
              id="avatar"
              name="avatar"
              type="url"
              className={css.input}
              value={avatarUrl}
              onChange={handleAvatarChange}
              placeholder="https://..."
            />
          </div>

          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>

            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}