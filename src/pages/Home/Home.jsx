import Hero from '../../components/Hero';
import ReportsGrid from '../../components/ReportsGrid';
import ResourcesGrid from '../../components/ResourcesGrid';
import Contact from '../../components/Contact';
import './Home.css';

const Home = () => {
  return (
    <main className="home-page">
      <Hero />
      <ReportsGrid />
      <ResourcesGrid />
      <Contact />
    </main>
  );
};

export default Home;
