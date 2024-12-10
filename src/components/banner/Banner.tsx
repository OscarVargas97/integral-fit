import BannerWrapper from './BannerWrapper'
import BannerContent from './BannerContent'
import BannerBackgroundEffects from './BannerBackgroundEffects'
import React from 'react'
import Image from 'next/image'

interface BannerProps {
  backgroundImage: string // Ajusta este tipo según lo que necesites (puede ser una URL o algún otro formato).
  children?: React.ReactNode
  content?: React.ReactNode
  textAlign?: {
    text: 'left' | 'center' | 'right'
    vertical: 'top' | 'center' | 'bottom'
  }
}

const Banner: React.FC<BannerProps> = ({
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
            <Image
              src={backgroundImage}
              alt="Persona entrenando"
              layout="fill"
              objectFit="cover"
              className="absolute top-[-25%] left-0 w-full h-auto pointer-events-none"
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
