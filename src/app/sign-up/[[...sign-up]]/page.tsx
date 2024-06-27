import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mt-10 flex items-center justify-center">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}
