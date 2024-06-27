import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mt-10 flex items-center justify-center">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
}
