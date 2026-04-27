import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { 
  ChefHat, 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Globe, 
  ShieldCheck,
  Settings,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface NavbarProps {
  user: { email: string; isAdmin: boolean } | null;
  logout: () => void;
}

const Navbar = ({ user, logout }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState("FR");
  const navigate = useNavigate();

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/services" },
    { name: "À Propos", href: "/about" },
    { name: "Galerie", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    toast.success("Déconnexion réussie");
    navigate("/");
  };

  const toggleLang = () => {
    const nextLang = lang === "FR" ? "EN" : "FR";
    setLang(nextLang);
    toast.info(`Langue changée en ${nextLang === 'FR' ? 'Français' : 'Anglais'}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-amber-600" />
            <div className="flex flex-col leading-tight hidden sm:flex">
              <span className="font-bold text-lg tracking-tight">
                Bayekoli <span className="text-amber-600">&</span> La Main de l'Éternel
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Excellence Culinaire</span>
            </div>
            <span className="font-bold text-lg sm:hidden">Bayekoli</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-4 w-[1px] bg-slate-200 mx-2" />

            <Link to="/policies" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
              <ShieldCheck className="h-4 w-4 inline mr-1" />
              Politiques
            </Link>

            {user ? (
              <div className="flex items-center space-x-4 ml-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full bg-slate-100 border border-slate-200 p-0 overflow-hidden">
                      <User className="h-5 w-5 text-slate-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-2">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.isAdmin ? "Chef Gradi Mpoyi" : "Mon Compte"}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {user.isAdmin && (
                      <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Tableau de Bord
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => navigate("/auth")}>
                      <Settings className="mr-2 h-4 w-4" />
                      Paramètres
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={toggleLang}>
                      <Globe className="mr-2 h-4 w-4" />
                      Langue: {lang}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnexion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700 shadow-md shadow-amber-200">Connexion</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={toggleLang} className="text-slate-600 font-bold">
              {lang}
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-amber-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden shadow-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-slate-600 hover:text-amber-600 border-b border-slate-50 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/policies"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-base font-medium text-slate-500 hover:text-slate-900 border-b border-slate-50"
              >
                Politiques de confidentialité
              </Link>
              <div className="pt-6 flex flex-col space-y-3">
                {user ? (
                  <>
                    <div className="px-3 py-2 bg-slate-50 rounded-lg mb-2">
                      <p className="text-sm font-bold">{user.isAdmin ? "Chef Gradi Mpoyi" : user.email}</p>
                      <p className="text-xs text-slate-500">Connecté</p>
                    </div>
                    {user.isAdmin && (
                      <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full justify-start h-12">
                          <LayoutDashboard className="mr-3 h-5 w-5" /> Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button variant="ghost" className="w-full justify-start h-12 text-red-600" onClick={handleLogout}>
                      <LogOut className="mr-3 h-5 w-5" /> Déconnexion
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-amber-600 h-12 text-lg shadow-lg shadow-amber-100">Connexion</Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;