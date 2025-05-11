import { Mail, Menu, Camera, Globe, Trees, Zap } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./ui/SearchBar";
import { cookies } from 'next/headers';
import { jwtVerify } from "jose";


interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  mobileLogo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = async ({
  logo = {
    url: "/",
    src: "/paw-print1.svg",
    alt: "logo",
    title: "Thinking at 12am",
  },
  mobileLogo ={
    url:'/',
    src:'/Wordmark.svg',
    alt: 'logo',
    title: 'Moble Logo'
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Posts",
      url: "/",
      items: [
        {
          title: "Latest",
          description: "Read my latest posts",
          icon: <Zap className="size-5 shrink-0" />,
          url: "/posts",
        },
        {
          title: "All Posts",
          description: "Browse through an archive of all of my posts",
          icon: <Globe className="size-5 shrink-0" />,
          url: "/posts",
        },
        {
          title: "Tags",
          description: "Look through my posts sorted by tag",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Photos",
          description: "A colllection of recent photos",
          icon: <Camera className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Connect",
          description: "Share your thoughts or subscribe to our newsletter!",
          icon: <Mail className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "About",
      url: "/about",
    },
  ],
}: NavbarProps) => {
  const cookieStore = await cookies();
  const token = (await cookieStore).get('token')?.value

  let isAdmin = false;
  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      );
      isAdmin = payload.email === process.env.ADMIN_EMAIL;
    } catch (err) {
      console.error("JWT verification failed", err)
    }
  }

  const updatedMenu = [
    ...menu,
    ...(isAdmin
      ? [{ title: "Admin Dashboard", url: "/admin/dashboard" }]
      : []),
  ];

  return (
    <section className="p-8 m-0 w-full bg-darker text-accent">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex relative z-30">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <Image src={logo.src} alt="logo" height={80} width={80} />
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="flex gap-5">
                  {updatedMenu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <SearchBar />
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={mobileLogo.url} className="flex items-center gap-2">
              <img src={mobileLogo.src} className="max-h-10" alt={mobileLogo.alt} />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="text-black">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="max-h-8" alt={logo.alt} />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {updatedMenu.map((item) => renderMobileMenuItem(item, item.title))}
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="bg-darker text-lg font-bold">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-darker px-4 py-2 text-lg font-bold transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem, key: string) => {
  if (item.items) {
    return (
      <AccordionItem key={key} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={key} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar };
