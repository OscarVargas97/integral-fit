import BannerWrapper from './BannerWrapper'
import BannerContent from './BannerContent'
import BannerBackgroundEffects from './BannerBackgroundEffects'

const Banner = ({
  backgroundImage,
  children,
  content,
  textAlign = { text: 'center', vertical: 'center' },
  align = { horizontal: 'right' },
}) => {
  return (
    <BannerWrapper backgroundImage={backgroundImage} align={align}>
      <div className="relative w-full h-full overflow-hidden">
        <div className="relative w-full h-full flex">
          {/* Imagen de fondo */}
          <div className="relative w-[600px] h-full flex-shrink-0 md:block hidden">
            <img
              src={backgroundImage}
              alt="Persona entrenando"
              className="absolute top-[-25%] left-0 w-full h-auto object-cover pointer-events-none"
            />
          </div>

          {/* Contenido del banner */}
          <div className="relative z-10 flex-1 h-full pointer-events-auto">
            <BannerContent {...content} textAlign={textAlign}>
              {children}
            </BannerContent>
          </div>
        </div>

        {/* Efectos de fondo */}
        <BannerBackgroundEffects />
      </div>
    </BannerWrapper>
  )
}

export default Banner
