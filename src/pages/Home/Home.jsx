import Hero from '../../components/Hero';
import ReportsGrid from '../../components/ReportsGrid';
import ResourcesGrid from '../../components/ResourcesGrid';
import Contact from '../../components/Contact';

const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <ReportsGrid />
      <ResourcesGrid />
      <Contact />
    </main>
  );
};

export default Home;
