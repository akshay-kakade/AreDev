import Image from "next/image"
import Link from "next/link"
import GradientText from "./GradientText"


const NavBar = () => {
  return (
    <header>
        <nav>
            <Link href="/" className="logo">
               <Image src="/icons/logo.png" alt="logo" width={64} height={64} />
                  
                
                  <GradientText
                    colors={["#40ffaa", "#407900", "#40ffaa", "#4079ff", "#40ffaa"]}
                    animationSpeed={3}
                    showBorder={false}
                    className="custom-class text-3xl font-bold px-2"
                  >
                   AreDev
                  </GradientText> 
                  
                  
            </Link>
            <ul>
              <Link href="/">Home</Link>
              <Link href="/">Event&apos;s</Link>
              <Link href="/">Create Event</Link>
            </ul>
        </nav>
    </header>
  )
}

export default NavBar

///01:25:49