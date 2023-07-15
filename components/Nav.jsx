"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          alt="Promptopia Logo"
          className="object-contain"
          src="/assets/images/logo.svg"
          width={32}
          height={32}
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Logout
            </button>
            <Link href="/profile" className="flex gap-2 flex-center">
              <Image
                alt="Profile Picture"
                className="object-contain rounded-full"
                src={session?.user?.image}
                width={37}
                height={37}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Nav */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              alt="Profile Picture"
              className="object-contain rounded-full"
              src={session?.user?.image}
              width={37}
              height={37}
              onClick={() => setToggleDropdown((prevState) => !prevState)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  onClick={() => setToggleDropdown(false)}
                  href="/profile"
                  className="dropdown_link"
                >
                  My Profile
                </Link>
                <Link
                  onClick={() => setToggleDropdown(false)}
                  href="/create-prompt"
                  className="dropdown_link"
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
