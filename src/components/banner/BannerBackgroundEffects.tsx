const BannerBackgroundEffects = () => {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute w-[300px] h-[300px] bg-gradient-radial from-gray-200 to-transparent blur-3xl top-1/4 left-1/4"></div>
      <div className="absolute w-[200px] h-[200px] bg-gradient-conic from-black via-gray-800 to-gray-200 blur-2xl top-2/3 right-1/4"></div>
    </div>
  )
}

export default BannerBackgroundEffects
