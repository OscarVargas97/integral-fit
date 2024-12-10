import BannerText from './BannerText'

const BannerContent = ({
  title,
  subtitle,
  content,
  children,
  buttons = [],
  textAlign = { text: 'center', vertical: 'center' },
  align = { horizontal: 'center' },
}) => {
  const horizontalAlignment = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  const verticalAlignment = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end',
  }

  const horizontalClass =
    horizontalAlignment[align.horizontal] || 'justify-center'
  const verticalClass = verticalAlignment[textAlign.vertical] || 'items-center'

  return (
    <div className="relative w-full h-full flex">
      {/* Contenedor interno para alinear el contenido */}
      <div className={`w-full h-full flex ${horizontalClass} ${verticalClass}`}>
        <div className={`flex flex-col text-${textAlign.text} relative`}>
          <BannerText title={title} subtitle={subtitle} />
          <div className="mt-6 flex flex-wrap gap-4 relative z-10 pointer-events-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerContent
