const PercentChangeBadge = ({
  deltaDirection,
  pctChange,
  _total,
  previousTotal,
}) => {
  const downArrow = (
    // <path
    //   fillRule="evenodd"
    //   d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
    //   clipRule="evenodd"
    // />

    <path
      fillRule="evenodd"
      d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
      clipRule="evenodd"
    ></path>
  )

  const upArrow = (
    // <path
    //   fillRule="evenodd"
    //   d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
    //   clipRule="evenodd"
    // />
    <path
      fillRule="evenodd"
      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
      clipRule="evenodd"
    ></path>
  )

  let pctChangeCaption = 'No change'
  let pctChangeColor = 'gray'
  let arrow = <></>

  if (deltaDirection > 0) {
    pctChangeCaption = 'Increased by'
    pctChangeColor = 'green'
    arrow = upArrow
  } else if (deltaDirection < 0) {
    pctChangeCaption = 'Decreased by'
    pctChangeColor = 'red'
    arrow = downArrow
  }

  if (pctChange == 0 && previousTotal === 0) {
    return (
      <div
        className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium leading-5 bg-orange-100 text-orange-800 md:mt-2 lg:mt-0`}
      >
        New
      </div>
    )
  }

  let pctChangeArrow = (
    <svg
      className={`-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-${pctChangeColor}-500`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      {arrow}
    </svg>
  )

  return (
    <div
      className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium leading-5 bg-${pctChangeColor}-100 text-${pctChangeColor}-800 md:mt-2 lg:mt-0`}
    >
      {pctChange !== 0 && pctChangeArrow}
      <span className="sr-only capitalize">{pctChangeCaption}</span>
      {pctChange.toFixed(0)}%
    </div>
  )
}

export default PercentChangeBadge
