'use client';

import UpdatePasswordForm from '@/components/UpdatePasswordForm';
import { motion } from 'framer-motion';

export default function changePassword() {
  return (
    <section className="flex justify-between p-[3rem] smd:px-[1.5rem] py-[2rem] rounded-lg bg-color-secondary-3 ">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.3 }}
        className="w-full self-start  "
      >
        <p className="text-[1.8rem] text-color-primary-1 font-semibold mb-[1.5rem] uppercase">
          Update Password
        </p>
        <UpdatePasswordForm />
      </motion.div>
    </section>
  );
}
