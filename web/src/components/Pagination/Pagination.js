import { Link } from '@redwoodjs/router'
import { FirstArrowIcon } from 'src/components/icons/FirstArrowIcon'
import { LastArrowIcon } from 'src/components/icons/LastArrowIcon'
import { NextArrowIcon } from 'src/components/icons/NextArrowIcon'
import { PreviousArrowIcon } from 'src/components/icons/PreviousArrowIcon'

const totalPages = ({ total, limit }) => {
  return Math.ceil(total / limit)
}

const currentPage = ({ offset, _total, limit }) => {
  return Math.ceil(offset / limit) + 1
}

const paginatedPageCount = ({ offset, total, limit }) => {
  return Math.ceil((total - (offset + limit)) / limit) + 1
}

const FirstLink = ({ paginatedRoute, _offset, _total, _limit }) => {
  let page = 1

  return (
    <Link
      to={paginatedRoute({ page })}
      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
      aria-label="First"
    >
      <FirstArrowIcon />
    </Link>
  )
}

const PreviousLink = ({ paginatedRoute, offset, total, limit }) => {
  let page = Math.max(currentPage({ offset, total, limit }) - 1, 1)

  return (
    <Link
      to={paginatedRoute({ page })}
      className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
      aria-label="Previous"
    >
      <PreviousArrowIcon />
    </Link>
  )
}

const NextLink = ({ paginatedRoute, offset, total, limit }) => {
  let page = Math.min(
    currentPage({ offset, total, limit }) + 1,
    totalPages({ total, limit })
  )

  return (
    <Link
      to={paginatedRoute({ page })}
      className="-ml-px relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
      aria-label="Next"
    >
      <NextArrowIcon />
    </Link>
  )
}

const LastLink = ({ paginatedRoute, _offset, total, limit }) => {
  let page = totalPages({ total, limit })

  return (
    <Link
      to={paginatedRoute({ page })}
      className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
      aria-label="Last"
    >
      <LastArrowIcon />
    </Link>
  )
}

const PreviousButton = ({ paginatedRoute, offset, _total, limit }) => {
  let page = 1

  if (offset !== 0) {
    page = Math.ceil((offset - limit) / limit) + 1
  }

  return (
    <Link
      to={paginatedRoute({ page })}
      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      aria-label="Previous"
    >
      <span>Previous</span>
    </Link>
  )
}

const NextButton = ({ paginatedRoute, offset, total, limit }) => {
  let page = Math.ceil(total / limit)

  if (offset + limit <= total) {
    page = Math.ceil((offset + limit) / limit) + 1
  }

  return (
    <Link
      to={paginatedRoute({ page })}
      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      aria-label="Next"
    >
      <span>Next</span>
    </Link>
  )
}

const WindowLinks = ({ offset, total, limit }) => {
  if (paginatedPageCount({ offset, total, limit }) < 5) return <></>

  return (
    <span className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
      ...
    </span>
  )
}

const FirstLinks = ({ paginatedRoute, offset, total, limit }) => {
  let page = Math.ceil(offset / limit)

  const items = []

  for (var i = page; i < page + 3; i++) {
    if (i + 1 <= totalPages({ total, limit })) {
      items.push(
        <Link
          key={`tweet-page-${i + 1}`}
          to={paginatedRoute({ page: i + 1 })}
          className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
        >
          {i + 1}
        </Link>
      )
    }
  }

  return items
}

const LastLinks = ({ paginatedRoute, offset, total, limit }) => {
  const pages = totalPages({ total, limit })
  const page = pages - 3

  if (currentPage({ offset, limit }) >= page) return <></>

  const items = []

  for (var i = page; i < page + 3; i++) {
    items.push(
      <Link
        key={`tweet-page-${i + 1}`}
        to={paginatedRoute({ page: i + 1 })}
        className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      >
        {i + 1}
      </Link>
    )
  }

  return items
}

const ShowingRecords = ({ offset, total, limit }) => {
  return (
    <div>
      <p className="text-sm leading-5 text-gray-700">
        Showing
        <span className="px-1 font-medium">{offset + 1} </span>
        to
        <span className="px-1 font-medium">
          {Math.min(offset + limit, total)}
        </span>
        of
        <span className="px-1 font-medium">{total || 0}</span>
        results
      </p>
    </div>
  )
}
const Pagination = ({ paginatedRoute, offset = 0, total = 0, limit = 20 }) => {
  if (offset < 0 || total == 0 || paginatedRoute === undefined) {
    return <></>
  }
  return (
    <div className="mt-5 bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <PreviousButton
          paginatedRoute={paginatedRoute}
          offset={offset}
          total={total}
          limit={limit}
        />
        <NextButton
          paginatedRoute={paginatedRoute}
          offset={offset}
          total={total}
          limit={limit}
        />
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <ShowingRecords offset={offset} total={total} limit={limit} />
        <div>
          <nav className="relative z-0 inline-flex shadow-sm">
            <FirstLink
              paginatedRoute={paginatedRoute}
              offset={offset}
              total={total}
              limit={limit}
            />
            <PreviousLink
              paginatedRoute={paginatedRoute}
              offset={offset}
              total={total}
              limit={limit}
            />
            <FirstLinks
              paginatedRoute={paginatedRoute}
              offset={offset}
              total={total}
              limit={limit}
            />
            <WindowLinks
              paginatedRoute={paginatedRoute}
              offset={offset}
              total={total}
              limit={limit}
            />
            <LastLinks
              paginatedRoute={paginatedRoute}
              offset={offset}
              total={total}
              limit={limit}
            />
            <NextLink
              paginatedRoute={paginatedRoute}
              offset={offset}
              total={total}
              limit={limit}
            />
            <LastLink
              paginatedRoute={paginatedRoute}
              offset={offset}
              total={total}
              limit={limit}
            />
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
