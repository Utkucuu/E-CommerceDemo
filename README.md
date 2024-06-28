


 <img src="./public/image/readmeImg.png" width="500" height="auto" alt="Fakestore API"/>

# E-CommerceDemo

E-CommerceDemo is an e-commerce demo where users can browse various products, add them to their cart, and place orders. Local storage is used for some operations in the project. It is live on Vercel: [E-CommerceDemo Live](https://e-commerce-demo-ochre.vercel.app).

[Video presentation](https://www.youtube.com/watch?v=b7ggSHUDF1M) .


## Features

- [x] Responsive design
- [x] User login and registration
- [x] Product search and filtering
- [x] View product details
- [x] User favorite management
- [x] User cart management
- [x] Place product orders
- [x] Order payment management
- [x] View order history
- [x] Order detail PDF export
- [x] Order detail Email
- [ ] User reviews
- [ ] Add products

## Technologies

<div>

  <a href="https://fakestoreapi.com">
    <img src="https://fakestoreapi.com/icons/logo.png" width="50" height="50" alt="Fakestore API"/>
  </a>
  <a href="https://reactjs.org">
    <img src="https://static-00.iconduck.com/assets.00/react-icon-512x512-u6e60ayf.png" width="50" height="50" alt="React"/>
  </a>
  <a href="https://react-icons.github.io/react-icons/">
    <img src="https://raw.githubusercontent.com/react-icons/react-icons/master/react-icons.svg" width="50" height="50" alt="React Icons"/>
  </a>
  <a href="https://react-pdf.org/">
    <img src="https://react-pdf.org/images/logo.png" width="50" height="50" alt="React PDF"/>
  </a>
  <a href="https://redux.js.org">
    <img src="https://redux.js.org/img/redux.svg" width="50" height="50" alt="Redux"/>
  </a>
  <a href="https://clerk.com/">
    <img src="https://pipedream.com/s.v0/app_dBhw8k/logo/orig" width="50" height="50" alt="Clerk"/>
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://pbs.twimg.com/profile_images/1730334391501488129/G0R0sjHH_400x400.jpg" width="50" height="50" alt="Tailwind CSS"/>
  </a>
    <a href="https://nextjs.org">
    <img src="https://static-00.iconduck.com/assets.00/next-js-icon-2048x2048-5dqjgeku.png" width="50" height="50" alt="Next.js"/>
  </a>
  <a href="https://nextui.org">
    <img src="https://nextui.org/apple-touch-icon.png" width="50" height="50" alt="NextUI"/>
  </a>
  <a href="https://www.radix-ui.com/">
    <img src="https://avatars.githubusercontent.com/u/75042455?s=280&v=4" width="50" height="50" alt="Radix UI"/>
  </a>
  <a href="https://www.typescriptlang.org">
    <img src="https://static-00.iconduck.com/assets.00/typescript-icon-icon-1024x1024-vh3pfez8.png" width="50" height="50" alt="TypeScript"/>
  </a>
  <a href="https://stripe.com">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGluJhW7I1NYU7jF77E-9K9I46_ib_DUNHw&s" width="50" height="50" alt="Stripe"/>
  </a>
</div>

##### React: 18 & Next: 14.2.3

- For other versions, see the [package.json](https://github.com/Utkucuu/E-CommerceDemo/blob/master/package.json) file.

###### Payment processing [Stripe API](https://stripe.com/)

###### State management [Redux](https://redux-toolkit.js.org/)

###### Products [Fake Store API](https://fakestoreapi.com/)

###### Authentication [Clerk](https://clerk.com/)

### Adım Adım Kurulum

### Requirements

- Node.js
- npm veya yarn
- Git

1. Clone the project files and install the necessary dependencies.

   ```bash
   git clone https://github.com/Utkucuu/E-CommerceDemo
   cd E-CommerceDemo
   npm install
   ```

2. Set up the environment variables. Create a `.env` file and add the necessary keys.

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<YOUR_PUBLİSHABLE_KEY>
   CLERK_SECRET_KEY=<YOUR_SECRET_KEY>
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   API_URL=<https://fakestoreapi.com/>
   STRIPE_SECRET_KEY=<YOUR_SECRET_KEY>
   NEXT_PUBLIC_STRIPE_API_KEY=<YOUR_STRIPE_API_KEY>
   ```

3. Run the project on the local server.

   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:3000` to start using the application.

### Structor

- To examine the directory structure, see the [directoryStructor](https://github.com/Utkucuu/E-CommerceDemo/blob/master/directoryStructor.txt) file.

### License

This project is licensed under the MIT License. For more information, see the [License](https://github.com/Utkucuu/E-CommerceDemo/blob/master/LICENSE) file.
