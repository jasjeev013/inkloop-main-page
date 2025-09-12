import { SiteHeader } from "@/components/main/SiteHeader"
import { Button } from "@/components/ui/button"
// import VortexParticleSystemExact from "@/components/ui/vortex-particle-system";
import { motion } from "framer-motion";

const MainPage = () => {
    return (
        <>
            {/* <div className="absolute inset-0 -z-10 opacity-40">
        <VortexParticleSystemExact />
      </div> */}
            <div className="min-h-screen flex flex-col">

                <SiteHeader />

                {/* Main Content */}
                <div className="flex flex-col-reverse md:flex-row flex-1">
                    {/* Left Section (Text) */}
                    <div className="flex flex-col justify-center w-full md:w-1/2 p-8 md:pl-20 lg:pl-28">
                        <div className="text-center md:text-left mb-40">
                            <h1 className="text-4xl  md:text-6xl  lg:text-8xl font-bold mb-4 text-black font-playfair">
                                Coming Soon
                            </h1>
                            <div className="mt-10">

                                <p className="text-lg md:text-xl ml-2 text-black/80 font-roboto">
                                    Get ready to redefine productivity our website is coming soon.<br/>Stay tuned and visit us again shortly!
                                </p>
                                
                            </div>
                            <div className="mt-8 flex justify-center md:justify-start">
                                <Button className="relative overflow-hidden bg-black/90 text-white ml-2 rounded-lg px-6 py-2.5 hover:bg-black/80 transition-all shadow-lg border border-white/30 backdrop-blur-sm">
                                    {/* Button Shine Effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        animate={{
                                            x: ["-100%", "100%"]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatDelay: 3,
                                            ease: "easeInOut"
                                        }}
                                    />
                                    <a href="https://join.inkloop.app" target="_blank" rel="noopener noreferrer" className="relative z-10">
                                        Join Waitlist
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Section (Image) */}
                    <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                        <img
                            src="/asset.png"
                            alt="Coming Soon"
                            className="w-60 md:w-80 lg:w-90 h-auto max-h-[500px] object-contain"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage
