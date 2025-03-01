import React from "react";
import { assets } from "../assets/assets";
import Bgimage from "../assets/gbu_crc.jpeg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AppDownload = () => {
  return (
    <motion.div
      style={{ willChange: "transform, opacity" }}
      whileInView={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0.25, 0.1, 0.25, 1], // Use a simpler easing curve
      }}
      viewport={{ once: true }} // Prevents re-triggering when scrolling back
    >
      <section className='overflow-hidden bg-white py-8 sm:py-16'>
        <div className='mx-auto max-w-8xl px-6 lg:px-[100px] '>
          <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-40'>
            <div className='lg:pr-8 lg:pt-4'>
              <div className='lg:max-w-lg'>
                <h2 className='text-[16px] font-semibold leading-7 text-primary'>
                  About CRC
                </h2>
                <p className='mt-2 text-3xl font-bold tracking-tight text-[#252525] sm:text-5xl font-primary '>
                  Corporate Relations Cell (CRC)
                </p>
                <p className='mt-6 text-lg leading-8 text-gray-600'>
                  of Gautam Buddha University (GBU) is dedicated in advising and
                  counselling students over career options. CRC is the primary
                  tool for the students to branch out of their classrooms and
                  explore and experiment the classroom learning.
                </p>
                <dl className='mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none'>
                  <div className='relative pl-9'>
                    <dt className='inline font-semibold text-gray-900'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='absolute left-1 top-1 h-5 w-5 text-indigo-600'
                      >
                        <path d='M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z'></path>
                        <path d='M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z'></path>
                        <path d='M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z'></path>
                      </svg>
                    </dt>
                    <dd className='inline'>
                      CRC secures internships, projects, events, and jobs by
                      staying current with industry trends.
                    </dd>
                  </div>
                  <div className='relative pl-9'>
                    <dt className='inline font-semibold text-gray-900'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='absolute left-1 top-1 h-5 w-5 text-indigo-600'
                      >
                        <path d='M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z'></path>
                        <path d='M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z'></path>
                        <path d='M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z'></path>
                      </svg>
                    </dt>
                    <dd className='inline'>
                      They provide personalized counseling, skill-building
                      workshops, and resume/application support to enhance
                      student employability.
                    </dd>
                  </div>
                  <div className='relative pl-9'>
                    <dt className='inline font-semibold text-gray-900'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='absolute left-1 top-1 h-5 w-5 text-indigo-600'
                      >
                        <path d='M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z'></path>
                        <path d='M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z'></path>
                        <path d='M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z'></path>
                      </svg>
                    </dt>
                    <dd className='inline'>
                      CRC maintains strong connections with academia and
                      corporations, acting as a vital link between students and
                      the professional world.
                    </dd>
                  </div>
                </dl>
              </div>
              {/* <div className='mt-10 flex items-center gap-x-6'>
                <a
                  href='/'
                  className='rounded-md bg-primary   px-8 py-4 text-md font-primary font-semibold text-white shadow-sm hover:bg-slate-600 transition duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Find Jobs
                </a>
                <Link
                  to='/recruiter-login'
                  className='text-sm font-semibold leading-6 text-gray-700'
                >
                  Recruiter Dashboard
                  <span aria-hidden='true'>→</span>
                </Link>
              </div> */}
            </div>
            <div className='flex item-center justify-center'>
              <img
                src={Bgimage}
                alt='Product screenshot'
                className='h-full w-full rounded-xl shadow-xl ring-1 ring-gray-400/10 border-[#BEBEBE] object-cover lg:h-auto'
              />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AppDownload;
