import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
      <Spinner color="warning" size="lg" />
    </div>
  );
};

export default Loading;
