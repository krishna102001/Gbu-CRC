import React from "react";
import logo from "../assets/gbu_logo.png";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <section className='pt-16 pb-7 bg-gray-900 mt-[10rem]'>
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
          <div className='grid grid-cols-12 pb-12 border-b-2 border-gray-700 max-lg:gap-7'>
            <div className='col-span-12 lg:col-span-7'>
              <h2 className='font-primary font-bold text-4xl leading-tight text-white mb-2 max-lg:text-center'>
                Sign up to Mail Notification
              </h2>
              <p className='text-base text-gray-400 font-normal max-lg:text-center'>
                Stay informed with the latest job opportunities, updates, and
                announcements.
              </p>
            </div>
            <div className='col-span-12 lg:col-span-5 flex flex-col gap-4 items-center'>
              <div className='flex items-center justify-between bg-gray-800 w-full max-w-md mx-auto lg:mr-0 rounded-full p-2.5 pl-8 border border-gray-700 transition-all duration-300 hover:border-primary focus-within:border-gray-400'>
                <input
                  type='text'
                  className='bg-transparent text-base font-normal text-white placeholder-gray-500 focus:outline-none'
                  placeholder='Your email here...'
                />
                <button className='py-3 px-7 hidden min-[470px]:block rounded-full bg-primary text-base font-semibold text-white shadow-sm transition-all duration-500 hover:bg-[#444444] focus:outline-none'>
                  Submit
                </button>
              </div>
              <button className='py-3 px-7 min-[470px]:hidden rounded-full bg-violet-500 text-base font-semibold text-white shadow-sm transition-all duration-500 hover:bg-violet-700 focus:outline-none'>
                Submit
              </button>
            </div>
          </div>

          {/* Footer Links */}
          <div className='grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 gap-y-8 py-14 border-b-2 border-gray-700'>
            <div>
              <h6 className='text-xl font-bold text-white mb-7 font-primary'>
                GBU CRC
              </h6>
              <ul className='flex flex-col gap-6'>
                <li>
                  <a
                    href='/'
                    className='text-lg font-normal text-gray-400 transition-all duration-300 hover:text-violet-400 focus:outline-none'
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href='/dashboard'
                    className='text-lg font-normal text-gray-400 transition-all duration-300 hover:text-violet-400 focus:outline-none'
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href='/'
                    className='text-lg font-normal text-gray-400 transition-all duration-300 hover:text-violet-400 focus:outline-none'
                  >
                    Jobs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h6 className='text-xl font-bold text-white mb-7 font-primary'>
                Job Seekers
              </h6>
              <ul className='flex flex-col gap-6'>
                <li>
                  <a
                    href='/'
                    className='text-lg font-normal text-gray-400 transition-all duration-300 hover:text-violet-400 focus:outline-none'
                  >
                    Resume Builder
                  </a>
                </li>
                <li>
                  <a
                    href='/'
                    className='text-lg font-normal text-gray-400 transition-all duration-300 hover:text-violet-400 focus:outline-none'
                  >
                    Career Guidance
                  </a>
                </li>
                <li>
                  <a
                    href='/'
                    className='text-lg font-normal text-gray-400 transition-all duration-300 hover:text-violet-400 focus:outline-none'
                  >
                    Skill Development
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h6 className='text-xl font-bold text-white mb-7 font-primary'>
                Resources
              </h6>
              <ul className='flex flex-col gap-6'>
                <li>
                  <a
                    href='/'
                    className='text-lg font-normal text-gray-400 transition-all duration-300 hover:text-violet-400 focus:outline-none'
                  >
                    Training Videos
                  </a>
                </li>
                <li>
                  <a
                    href='/'
                    className='text-lg font-normal text-gray-400 transition-all duration-300 hover:text-violet-400 focus:outline-none'
                  >
                    Resume Building Tips
                  </a>
                </li>
                <li>
                  <a
                    href='/'
                    className='text-lg font-normal text-gray-400 transition-all duration-300 hover:text-violet-400 focus:outline-none'
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h6 className='text-xl font-bold text-white mb-3 font-primary'>
                Contact Us
              </h6>
              <div className='text-white flex flex-col'>
                <h1 className='text-lg'>Corporate Relations Cell Office</h1>
                <h3 className='text-sm'>School of Management Building, GBU</h3>
                <p>(During office hours 9.30 am-5.30 pm)</p>
                <p>+91-120-2344209</p>
                <a href='mailto:crc@gbu.ac.in' target='_blank'>
                  <p className='underline decoration-solid'>crc@gbu.ac.in</p>
                </a>
              </div>
            </div>
          </div>

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

export default Footer;
