'use client'
import Link from 'next/link'
import LoginLogoutButton from 'components/buttons/LoginLogout'

const Navbar = ({ user }) => {
  return (
    <div className="relative z-10 w-full max-w-7xl font-mono text-sm flex justify-between items-center p-4 mx-auto">
      <div className="flex-grow"></div>
      <div className="flex gap-4 items-center">
        <Link
          href="/about"
          className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
        >
          Sobre Nosotros
        </Link>
        {user?.id && (
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
          >
            Dashboard
          </Link>
        )}
        <LoginLogoutButton user={user} />
      </div>
    </div>
  )
}

export default Navbar
