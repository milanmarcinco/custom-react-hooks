import React, { useState, useEffect, useRef, useCallback } from "react";

interface IDimensions {
  width: number | undefined;
  height: number | undefined;
}

// Simple hook to obtain element's current width and height
const useKeepDimensions = <T extends HTMLElement>(): [React.RefObject<T>, IDimensions, typeof reevaluate] => {
  const nodeRef = useRef<T>(null);

  const [dimensions, setDimensions] = useState<IDimensions>({
    width: undefined,
    height: undefined,
  });

  const reevaluate = useCallback((node: React.RefObject<T>) => {
    if (!node.current) return;

    const width = node.current.offsetWidth;
    const height = node.current.offsetHeight;

    setDimensions({ width, height });
  }, []);

  useEffect(() => {
    reevaluate(nodeRef);
  }, [nodeRef, reevaluate]);

  return [nodeRef, dimensions, reevaluate];
};

export default useKeepDimensions;
