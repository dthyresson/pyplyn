import AppLayout from 'src/layouts/AppLayout'

const AboutPage = () => {
  return (
    <AppLayout>
      <div className="p-8">
        {Array(20)
          .fill()
          .map((_, i) => {
            return (
              <div
                key={`slide-${i}`}
                className="bg-white overflow-hidden shadow rounded-lg m-4"
              >
                <div className="px-4 py-5 sm:p-6">
                  <img
                    src={`/presentation/slides/${i + 1}.png`}
                    alt={`Slide ${i + 1}`}
                  />
                </div>
              </div>
            )
          })}
      </div>
    </AppLayout>
  )
}

export default AboutPage
