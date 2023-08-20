 import { useState, useEffect } from "react";
 
 const useWindowSize = () => {

    const [windowSize, SetWindowSize] = useState({
        width: undefined,
        height: undefined
    })
    
    useEffect(()=>{
      const handleResize = () =>{
        SetWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }
      handleResize()

      window.addEventListener('resize', handleResize)

      const handleCleanUp = () =>{
        window.removeEventListener('resize', handleResize)
      }
      return handleCleanUp;
    }, [])
    return windowSize;
 };
 
 export default useWindowSize;
 