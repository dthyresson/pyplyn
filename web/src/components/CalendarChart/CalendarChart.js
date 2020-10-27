import { ResponsiveCalendar } from '@nivo/calendar'

const CalendarChart = ({ calendar }) => {
  const firstDay = calendar.calendar[0].day
  const lastDay = calendar.calendar.slice(-1).pop().day

  return (
    <div className="h-32 md:h-48 lg:h-64 xl:h-64 mb-4 mt-4">
      <div className="pb-2 border-b border-gray-200">
        <h3 className="text-md leading-6 font-medium text-gray-900">
          {calendar.label}
        </h3>
      </div>
      <ResponsiveCalendar
        data={calendar.calendar}
        from={firstDay}
        to={lastDay}
        emptyColor="#eeeeee"
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left',
          },
        ]}
      />
    </div>
  )
}

export default CalendarChart
