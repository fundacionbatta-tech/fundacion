
import Header from '@/components/home/header/header';
import { Footer } from '@/components/home/footer/footer';

export default function Cuotas() {
  return (
    <div className="homepage-container">
      <Header />
      <main className="homepage-main">
        <h2 className="homepage-title"></h2>
        <p style={{textAlign:'center',marginTop:'1.5rem',color:'#1F2937'}}></p>
      </main>
      <Footer />
    </div>
  );
}
