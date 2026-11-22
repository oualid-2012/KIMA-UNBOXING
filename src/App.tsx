import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import BoxBuilder from './components/BoxBuilder/BoxBuilder';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Footer from './components/Footer/Footer';
import MyBox from './components/MyBox/MyBox';
import Checkout from './components/Checkout/Checkout';
import { useBoxStore } from './store/boxStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

export default function App() {
  const { isBoxOpen, toggleBox, totalItems, isBoxFull } = useBoxStore();
  const count = totalItems();

  return (
    <div className="bg-[#101114] min-h-screen text-white antialiased selection:bg-[#F34D83]/30 selection:text-white">
      <Navbar />
      <Hero />
      <BoxBuilder />
      <HowItWorks />
      <Footer />

      {/* My Box slide-over */}
      <MyBox />

      {/* Checkout modal */}
      <Checkout />

      {/* Mobile sticky My Box button */}
      <div className="fixed bottom-4 right-4 z-40 lg:hidden">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleBox}
          className="relative flex items-center gap-2 bg-gradient-to-r from-[#F34D83] to-[#D92968] text-white px-5 py-3.5 rounded-full shadow-xl shadow-[#F34D83]/30 font-bold text-sm"
        >
          <ShoppingBag size={18} />
          <span>Ma Box</span>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-[#D92968] text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </motion.button>
      </div>

      {/* Box full toast */}
      <AnimatePresence>
        {isBoxFull() && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#D92968] text-white px-6 py-3 rounded-full text-sm font-semibold shadow-xl whitespace-nowrap"
          >
            🎁 Votre Box est pleine !
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
