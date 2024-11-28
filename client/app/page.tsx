import Herosection from "./_component/Herosection";
import HeRosection2 from "./_component/HeRosection2";
import TeamSection from "./_component/TeamSection";
import EventSlide from "./_component/EventSlide";
import FlowCard from './_component/FlowCard'

export default function Home() {
  return (
    <div>
      <Herosection />
      <FlowCard/>
      <HeRosection2 />
      <TeamSection />
      <EventSlide/>
    </div>
  );
}
