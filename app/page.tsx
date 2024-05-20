import Link from "next/link";
import CardsSection from "@/components/CardsSection";
import MotionWrapper from "@/utils/MotionWrapper";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

export default function Home() {
  return (
    <main className="relative">
      <AuroraBackground>
        <MotionWrapper>
          <h1 className="text-3xl md:text-7xl text-white font-black mb-4 text-center">
            Events App
          </h1>
          <p className="text-base md:text-2xl text-neutral-200 max-w-[400px] text-center mb-4">
            Welcome to the best events app right in your city.
          </p>
          <Link
            href={"#cards"}
            className="bg-white rounded w-fit text-black px-4 py-2 hover:scale-105 transition-all duration-300"
          >
            Explore now
          </Link>
        </MotionWrapper>
      </AuroraBackground>

      <CardsSection />
    </main>
  );
}
