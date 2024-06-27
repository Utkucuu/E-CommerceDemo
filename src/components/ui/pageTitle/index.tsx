import React, { useState, useEffect } from "react";

interface PageTitleProps {
  titleContent: string;
}

export default function PageTitle({
  titleContent,
}: PageTitleProps): JSX.Element {
  function formatCategory(titles: string) {
    return titles
      .replace(/^\//, "")
      .replace(/%20/g, " ")
      .replace(/\//g, " - ")
      .toUpperCase();
  }

  const [title, setTitle] = useState(titleContent);

  useEffect(() => {
    if (titleContent.includes("/")) {
      setTitle(formatCategory(titleContent));
    }
  }, [titleContent]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold uppercase">{title}</h1>
    </div>
  );
}
