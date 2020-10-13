import { Link, routes } from '@redwoodjs/router'
import PercentChangeBadge from 'src/components/PercentChangeBadge'

const PeriodTotalStat = ({
  caption,
  periodTotalStat,
  route = routes.tweets(),
}) => {
  return (
    <dl>
      <dt className="capitalize text-base leading-6 font-normal text-gray-900">
        Total {caption} Processed
      </dt>
      <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
        <div className="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
          <Link to={route}>{periodTotalStat.currentPeriodTotal}</Link>
          <span className="ml-2 text-sm leading-5 font-medium text-gray-500">
            from {periodTotalStat.priorPeriodTotal}
          </span>
        </div>
        <PercentChangeBadge
          deltaDirection={periodTotalStat.deltaDirection}
          pctChange={periodTotalStat.pctChange}
        />
      </dd>
    </dl>
  )
}

export default PeriodTotalStat
