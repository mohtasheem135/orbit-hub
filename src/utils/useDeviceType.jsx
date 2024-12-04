
import { useState, useEffect } from 'react';

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;

    const handleResize = () => {
      const width = window.innerWidth;

      // Detect iPad based on user agent and screen width
      if (/iPad|Macintosh/.test(userAgent) && 'ontouchend' in document) {
        setDeviceType('tablet'); // iPads
      } else if (width <= 767) {
        setDeviceType('mobile'); // Mobile devices
      } else if (width >= 768 && width <= 1024) {
        setDeviceType('tablet'); // Tablets (like iPad or Android tablets)
      } else {
        setDeviceType('desktop'); // Desktop
      }
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resizing
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceType;
};

export default useDeviceType;
