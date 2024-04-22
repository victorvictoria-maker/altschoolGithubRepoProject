import ReactPaginate from "react-paginate";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const Paginate = ({ handlePageChange, pageCount }) => {
  const paginateVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1,
      },
    },
  };

  return (
    <motion.div variants={paginateVariants} initial='hidden' animate='visible'>
      <ReactPaginate
        nextLabel={
          <span className='w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md'>
            <FaArrowRight className='ml-2' />
          </span>
        }
        onPageChange={handlePageChange}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        pageClassName='block border border-solid border-red bg-gray-100 hover:bg-purple-100 w-10 h-10 flex items-center justify-center rounded-md mx-3'
        previousLabel={
          <span className='w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md mr-3'>
            <FaArrowLeft />
          </span>
        }
        containerClassName='flex items-center justify-center mt-8'
        activeClassName='bg-green-600 hover:bg-green-600 text-white font-bold'
      />
    </motion.div>
  );
};

export default Paginate;
