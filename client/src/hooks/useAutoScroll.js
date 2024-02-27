import { useEffect, useRef } from 'react';

export const useAutoScroll = (dependencies) => { const elementRef = useRef(null);

useEffect(() => { if (elementRef.current) { elementRef.current.scrollIntoView({ behavior: 'smooth' }); } }, [dependencies]); 

return elementRef; };