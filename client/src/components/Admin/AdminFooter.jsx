import logo from "../../assets/gbu_logo.png";
import { motion } from "framer-motion";

const AdminFooter = () => {
  return (
    <section className='pt-16 pb-7 bg-gray-900 '>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Signup Section */}
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          viewport={{ once: true }} // Prevents re-triggering when scrolling back
        >
          {/* Footer Bottom */}
          <div className='pt-3 flex flex-col min-[500px]:flex-row items-center justify-between'>
            <a href='/' className=' py-1.5'>
              <div className='flex items-center gap-2'>
                <img src={logo} alt='gbu Logo' width='70' height='70' />
                <div>
                  <h1 className='text-white font-bold tracking-wider'>
                    GAUTAM BUDDHA UNIVERSITY
                  </h1>
                  <p className='text-white'>Corporate Relations Cell</p>
                </div>
              </div>
            </a>
            <p className='text-sm text-gray-400 mt-4 min-[500px]:mt-0 px-10'>
              © 2025{" "}
              <a href='https://gbu.ac.in' target='_blank'>
                GBU
              </a>
              . All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdminFooter;
