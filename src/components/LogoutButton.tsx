'use client';

import { logout } from '@/app/actions/authActions';

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-brand-gray hover:text-red-500 transition-colors text-sm font-medium cursor-pointer"
      >
        Déconnexion
      </button>
    </form>
  );
}
