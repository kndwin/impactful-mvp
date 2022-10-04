import tw from "tailwind-styled-components";
import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "common/ui";
import { HiOutlineHome, HiOutlineDocument } from "react-icons/hi";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Logo } from "common/svg";
import clsx from "clsx";
import { Menu, Transition } from "@headlessui/react";
import { Fragment,  } from "react";

const nav = [
  {
    label: "Home",
    href: "/dashboard",
    icon: <HiOutlineHome />,
  },
  {
    label: "Survey",
    href: "/dashboard/survey",
    icon: <HiOutlineDocument />,
  },
];

const t = {
  logOut: "Log out",
};

type LayoutRootProps = {
  children: ReactNode;
};

const LayoutRoot = ({ children }: LayoutRootProps) => {
  return (
    <StyledContainer>
      <Nav />
      <StyledContent>{children}</StyledContent>
    </StyledContainer>
  );
};

const Nav = () => {
  const router = useRouter();
  const { data } = useSession();

  return (
    <StyledNav>
        <div className="flex items-center px-4 gap-2">
          <Logo size={32} />
          <p className="px-2 py-1 text-xs font-bold rounded bg-zinc-200 text-zinc-700">
            BETA
          </p>
        </div>
      <div className="flex flex-col flex-1 px-3 pt-4 gap-1">
        {nav.map((nav) => (
          <Link key={nav.href} href={nav.href}>
            <a
              className={clsx(
                "py-2 rounded flex items-center",
                router.pathname === nav.href ? "bg-zinc-200 " : " bg-zinc-100"
              )}
            >
              <span className="flex items-center justify-center w-8 h-8 mx-2">
                {nav.icon}
              </span>
              <span className="bold">{nav.label}</span>
            </a>
          </Link>
        ))}
      </div>
      <div className="p-3">
        <Menu as="div" className="relative inline-block w-full text-left">
					<Menu.Button className="flex items-center justify-start w-full p-3 rounded gap-4 hover:bg-zinc-200">
            <StyledImg src={data?.user?.image ?? ""} alt="Profile Image" />
            <div className="flex flex-col items-start gap-1">
              <p className="text-sm font-bold">{data?.user?.name}</p>
              <p className="text-xs truncate w-30 text-ellipsis">
                {data?.user?.email}
              </p>
            </div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="p-2 absolute top-[-100%] mt-2 bg-white shadow-lg w-44 left-0 origin-top-right divide-y divide-gray-100 rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <Link href="/">
                  <Button className="w-full border-none">{t.logOut}</Button>
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </StyledNav>
  );
};

const StyledImg = tw.img`h-12 w-12 rounded-xl ring-2 ring-zinc-200
	bg-white
`;
const StyledContainer = tw.div`w-full h-full min-h-screen bg-zinc-100
	flex
`;
const StyledHeader = tw.header`py-4 flex justify-between  items-center
	border-b-2 border-b-zinc-200 px-5 h-full max-h-[4em] min-h-[4em]
`;
const StyledMain = tw.main`flex flex-1 flex-col p-4 overflow-auto
	
`;
const StyledNav = tw.nav`w-full h-full min-w-[15em] max-w-[15em]
	border-r-2 border-r-gray-200 min-h-screen
	flex flex-col pt-4 
`;

const StyledContent = tw.div`flex flex-col flex-1`;

export const Layout = Object.assign(LayoutRoot, {
  Header: StyledHeader,
  Main: StyledMain,
});
