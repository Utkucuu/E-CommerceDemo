
import FooterItem from "./FooterItem";

const links = [
  {
    href: "https://fakestoreapi.com",
    src: "https://fakestoreapi.com/icons/logo.png",
  },
  {
    href: "https://reactjs.org",
    src: "https://static-00.iconduck.com/assets.00/react-icon-512x512-u6e60ayf.png",
  },
  {
    href: "https://react-icons.github.io/react-icons/",
    src: "https://raw.githubusercontent.com/react-icons/react-icons/master/react-icons.svg",
  },
  {
    href: "https://react-pdf.org//",
    src: "https://react-pdf.org/images/logo.png",
  },
  { href: "https://redux.js.org", src: "https://redux.js.org/img/redux.svg" },
  {
    href: "https://clerk.com/",
    src: "https://pipedream.com/s.v0/app_dBhw8k/logo/orig",
  },
  {
    href: "https://tailwindcss.com/",
    src: "https://pbs.twimg.com/profile_images/1730334391501488129/G0R0sjHH_400x400.jpg",
  },
  {
    href: "https://nextjs.org",
    src: "https://static-00.iconduck.com/assets.00/next-js-icon-2048x2048-5dqjgeku.png",
  },
  {
    href: "https://nextui.org",
    src: "https://nextui.org/apple-touch-icon.png",
  },
  {
    href: "https://www.radix-ui.com/",
    src: "https://avatars.githubusercontent.com/u/75042455?s=280&v=4",
  },

  {
    href: "https://www.typescriptlang.org",
    src: "https://static-00.iconduck.com/assets.00/typescript-icon-icon-1024x1024-vh3pfez8.png",
  },

  {
    href: "https://stripe.com",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGluJhW7I1NYU7jF77E-9K9I46_ib_DUNHw&s",
  },
];

const Footer = () => {
 


  return (
    <footer className="">
      <FooterItem links={links} />
    </footer>
  );
};

export default Footer;
