import { createContext, useState, type ReactNode } from "react";

export const RefetchContext = createContext({
  refetchFlag: false,
  triggerRefetch: () => {},
});

export const RefetchContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [refetchFlag, setRefetchFlag] = useState<boolean>(false);
  const triggerRefetch = () => {
    setRefetchFlag((prev) => !prev);
  };
  return (
    <RefetchContext.Provider value={{ refetchFlag, triggerRefetch }}>
      {children}
    </RefetchContext.Provider>
  );
};
