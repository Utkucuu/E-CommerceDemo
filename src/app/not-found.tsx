import { Button, Card } from "@nextui-org/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center ">
      <Card className="p-10 text-center shadow-lg">
        <h2 className="text-4xl font-bold text-gray-800">
          404 - Page Not Found
        </h2>
        <p className="text-lg text-gray-600">
          Oops! The page you are looking for does not exist.
        </p>
        <Link href="/" passHref>
          <Button className="mt-4 bg-warning-500 text-white">
            Return Home
          </Button>
        </Link>
      </Card>
    </div>
  );
}
