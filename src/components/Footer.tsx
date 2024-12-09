import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Información de la empresa */}
        <div className="text-gray-600 text-sm text-center md:text-left mb-4 md:mb-0">
          <p>&copy; 2024 Nombre de la Empresa</p>
          <p>Todos los derechos reservados</p>
        </div>

        {/* Redes sociales */}
        <div className="flex space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition"
            aria-label="Facebook"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
