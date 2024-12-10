const BannerText = ({ title, subtitle }) => {
  return (
    <>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
        {title}
      </h1>
      <p className="mt-4 text-lg sm:text-xl lg:text-2xl max-w-3xl text-gray-600">
        {subtitle}
      </p>
    </>
  )
}

export default BannerText
