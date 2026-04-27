import { ChefHat, Mail, Phone, Instagram, Music2, MessageCircle } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <ChefHat className="h-8 w-8 text-amber-500" />
              <span className="font-bold text-2xl tracking-tight">
                Bayekoli <span className="text-amber-500">&</span> La Main de l'Éternel
              </span>
            </Link>
            <p className="text-slate-400 max-w-md">
              Établissement spécialisé dans la formation de la jeunesse congolaise et l'excellence du service traiteur. Valorisons ensemble notre patrimoine culinaire.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Liens Rapides</h3>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/services" className="hover:text-amber-500 transition-colors">Nos Services</Link></li>
              <li><Link to="/about" className="hover:text-amber-500 transition-colors">Qui nous sommes</Link></li>
              <li><Link to="/gallery" className="hover:text-amber-500 transition-colors">Galerie</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Réseaux Sociaux</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com/gradi_mpoyi" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://tiktok.com/@chef_gradi" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Music2 className="h-6 w-6" />
              </a>
              <a href="https://whatsapp.com/dl/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-green-500 transition-colors">
                <MessageCircle className="h-6 w-6" />
              </a>
              <a href="mailto:gradimpoyi552@gmail.com" className="text-slate-400 hover:text-amber-500 transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-4 text-slate-400 text-sm">
              <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +243 ...</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> gradimpoyi552@gmail.com</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Bayekoli School & La Main de l'Éternel. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;