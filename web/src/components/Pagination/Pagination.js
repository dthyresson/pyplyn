import { Link, routes } from '@redwoodjs/router'

const FirstButton = ({ _offset, _total, _limit }) => {
  let page = 1

  return (
    <Link
      to={routes.tweets({ page })}
      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
      aria-label="Previous"
    >
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </Link>
  )
}

const LastButton = ({ _offset, total, limit }) => {
  let page = Math.ceil(total / limit)

  return (
    <Link
      to={routes.tweets({ page: page })}
      className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
      aria-label="Next"
    >
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </Link>
  )
}

const PreviousButton = ({ offset, _total, limit }) => {
  let page = 1

  if (offset !== 0) {
    page = Math.ceil((offset - limit) / limit) + 1
  }

  return (
    <Link
      to={routes.tweets({ page })}
      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      aria-label="Previous"
    >
      <span>Previous</span>
    </Link>
  )
}

const NextButton = ({ offset, total, limit }) => {
  let page = Math.ceil(total / limit)

  if (offset + limit <= total) {
    page = Math.ceil((offset + limit) / limit) + 1
  }

  return (
    <Link
      to={routes.tweets({ page: page })}
      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      aria-label="Next"
    >
      <span>Next</span>
    </Link>
  )
}

const WindowLinks = ({ offset, total, limit }) => {
  const pages = Math.ceil(total / limit)
  let leftPage = Math.ceil(offset / limit) + 2 + 1
  let rightPage = Math.ceil(total / limit) - 2

  return (
    <>
      <Link
        key={`tweet-page-${leftPage}`}
        to={routes.tweets({ page: leftPage })}
        className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      >
        {leftPage}
      </Link>
      <span className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
        ...
      </span>
      <Link
        key={`tweet-page-${rightPage}`}
        to={routes.tweets({ page: rightPage })}
        className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      >
        {rightPage}
      </Link>
    </>
  )
}

const FirstLinks = ({ offset, _total, limit }) => {
  let page = Math.ceil(offset / limit)

  const items = []

  for (let i = page; i <= page + 1; i++) {
    items.push(
      <Link
        key={`tweet-page-${i}`}
        to={routes.tweets({ page: i + 1 })}
        className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      >
        {i + 1}
      </Link>
    )
  }

  return items
}

const LastLinks = ({ _offset, total, limit }) => {
  let page = Math.ceil(total / limit) - 2

  const items = []

  for (let i = page; i <= page + 1; i++) {
    items.push(
      <Link
        key={`tweet-page=${i}`}
        to={routes.tweets({ page: i + 1 })}
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
        <span className="px-1 font-medium">{offset + 1}</span>
        to
        <span className="px-1 font-medium">{offset + limit}</span>
        of
        <span className="px-1 font-medium">{total || 0}</span>
        results
      </p>
    </div>
  )
}
const Pagination = ({ offset = 1, total = 0, limit = 20 }) => {
  // const pages = total % limit
  // const items = []

  // for (let i = 0; i < Math.ceil(total / limit); i++) {
  //   items.push(
  //     <Link
  //       key={`tweet-page=${i}`}
  //       to={routes.tweets({ page: i + 1 })}
  //       className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
  //     >
  //       {i + 1}
  //     </Link>
  //   )
  // }

  return (
    <div className="mt-5 bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <PreviousButton offset={offset} total={total} limit={limit} />
        <NextButton offset={offset} total={total} limit={limit} />
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <ShowingRecords offset={offset} total={total} limit={limit} />
        <div>
          <nav className="relative z-0 inline-flex shadow-sm">
            <FirstButton offset={offset} total={total} limit={limit} />
            <FirstLinks offset={offset} total={total} limit={limit} />
            <WindowLinks offset={offset} total={total} limit={limit} />
            <LastLinks offset={offset} total={total} limit={limit} />
            <LastButton offset={offset} total={total} limit={limit} />
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
