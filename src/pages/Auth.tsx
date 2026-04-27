import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChefHat, Mail, Lock, Chrome } from "lucide-react";
import { toast } from "sonner";

interface AuthProps {
  login: (email: string, isAdmin: boolean) => void;
}

const Auth = ({ login }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
        // Admin check
        if ((email === "gradi mpoyi" || email === "admin@bayekoli.com") && password === "2004") {
          login(email, true);
          toast.success("Bienvenue Chef Gradi ! Accès Administration activé.");
          navigate("/dashboard");
          return;
        }

        if (email && password) {
          login(email, false);
          toast.success(isLogin ? "Heureux de vous revoir !" : "Bienvenue parmi nous !");
          navigate("/services");
        } else {
          toast.error("Veuillez remplir tous les champs obligatoires");
        }
        setIsLoading(false);
    }, 1000);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    toast.info("Connexion avec Google en cours...");
    
    setTimeout(() => {
      login("client.google@gmail.com", false);
      toast.success("Authentification Google réussie");
      navigate("/services");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[440px]"
      >
        <Card className="shadow-2xl border-0 rounded-[2.5rem] overflow-hidden bg-white">
          <CardHeader className="text-center pt-10 pb-6 space-y-4">
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mx-auto bg-amber-600 p-4 rounded-3xl w-fit shadow-lg shadow-amber-100"
            >
              <ChefHat className="h-10 w-10 text-white" />
            </motion.div>
            <div className="space-y-1">
                <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
                {isLogin ? "Bon retour" : "Rejoignez-nous"}
                </CardTitle>
                <CardDescription className="text-slate-500">
                Votre porte d'entrée vers l'excellence culinaire
                </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-600 font-medium ml-1">Identifiant</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input 
                    id="email" 
                    placeholder="Email ou Nom d'utilisateur" 
                    className="pl-11 h-12 rounded-2xl border-slate-200 focus:border-amber-600 focus:ring-amber-600 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password border-slate-200" className="text-slate-600 font-medium ml-1">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-11 h-12 rounded-2xl border-slate-200 focus:border-amber-600 focus:ring-amber-600 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end">
                <button type="button" className="text-xs font-semibold text-amber-600 hover:underline">Mot de passe oublié ?</button>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-amber-600 hover:bg-amber-700 h-13 text-lg font-bold rounded-2xl shadow-xl shadow-amber-100 transition-all mt-2"
              >
                {isLoading ? "Traitement..." : isLogin ? "Se connecter" : "Créer mon compte"}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                <span className="bg-white px-4 text-slate-400">Ou</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full h-13 space-x-3 rounded-2xl border-slate-200 hover:bg-slate-50 transition-all font-semibold" 
              onClick={handleGoogleAuth}
              disabled={isLoading}
            >
              <Chrome className="h-5 w-5 text-red-500" />
              <span>Continuer avec Google</span>
            </Button>

            <p className="text-center text-sm text-slate-500 mt-8 font-medium">
              {isLogin ? "Nouveau ici ?" : "Déjà membre ?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-amber-600 font-bold hover:underline"
              >
                {isLogin ? "Créer un compte" : "Se connecter"}
              </button>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;