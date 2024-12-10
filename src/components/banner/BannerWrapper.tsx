const BannerWrapper = ({
  children,
  backgroundImage,
  backgroundColor = 'bg-gray-200', // Color de fondo predeterminado
  align = { horizontal: 'right' },
}) => {
  const horizontalAlignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  const horizontalClass =
    horizontalAlignClasses[align.horizontal] || 'justify-end'

  return (
    <div
      className={`overflow-hidden relative w-full h-[600px] text-black flex ${horizontalClass} ${backgroundColor}`}
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </div>
  )
}

export default BannerWrapper
