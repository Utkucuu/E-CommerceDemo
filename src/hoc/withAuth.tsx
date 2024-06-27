import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Loading from "@/app/loading";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuthComponent = (props: any) => {
    const { isLoaded, isSignedIn } = useUser();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
      if (isLoaded && !isSignedIn && !isRedirecting) {
        setIsRedirecting(true);
        router.push("/sign-in");
      }
    }, [isLoaded, isSignedIn, isRedirecting, router]);

    if (!isLoaded || isRedirecting) {
      return <Loading/>;
    }

    if (!isSignedIn) {
      return <Loading/>;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuthComponent;
};

function getDisplayName(WrappedComponent: React.ComponentType) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;
