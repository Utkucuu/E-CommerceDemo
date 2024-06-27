import { Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

type FooterItemProps = {
  links: { href: string; src: string }[];
};

export default function FooterItem({ links }: FooterItemProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5 border-t-1 bg-transparent py-3 data-[hover=true]:bg-transparent">
      {links.map((link, index) => (
        <div key={index} className="">
          <Link href={link.href} target="_blank" rel="noopener noreferrer">
            <Image width={40} src={link.src} alt={`${link.src}`} />
          </Link>
        </div>
      ))}
    </div>
  );
}
