import React from "react";

export default function useDebounce(value: any) {
  const [debounceValue, setDebounceValue] = React.useState();

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (value) {
      timeoutId = setTimeout(() => {
        setDebounceValue(value);
      }, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  return debounceValue;
}
