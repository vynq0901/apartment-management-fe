import ReactPaginate from 'react-paginate'
import { HiChevronLeft, HiChevronRight, HiDotsHorizontal } from "react-icons/hi";
const Pagination = ({pagination, onPageChange}) => {
    const {limit, totalApts} =  pagination
    const totalPages = Math.ceil(totalApts / limit)
    const handlePageClick = (newPage) => {
        onPageChange(newPage)
        window.scrollTo(0, 0)
    }
    return (
        <ReactPaginate
          previousLabel={<HiChevronLeft />}
          previousClassName={'text-2xl'}
          nextClassName={'text-2xl'}
          nextLabel={<HiChevronRight />}
          breakLabel={<HiDotsHorizontal />}
          pageCount={totalPages}
          pageRangeDisplayed={4}
          containerClassName={'flex items-center justify-center col-span-4 mt-4'}
          disabledClassName={'text-gray-300'}
          pageClassName={'min-w-[30px] px-0 py-[3px] bg-gray-200 font-semibold text-sm mx-[5px] text-center border-2 border-transparent rounded hover:bg-white hover:border-yellow-500'}
          activeClassName={'!text-white !bg-yellow-500'}
          pageLinkClassName={'inline-block w-full'}
          onPageChange={handlePageClick}
        />
    )
}

export default Pagination
