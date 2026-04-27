import { motion } from "framer-motion";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, UtensilsCrossed, GraduationCap, Award } from "lucide-react";

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/8dd3d646-97f4-4958-85f7-7dcbf598d408/wedding-catering-service-f9e31689-1777324409380.webp" 
            alt="Chef Service" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl font-bold mb-6"
          >
            L'Excellence Culinaire <br />& Professionnelle
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-slate-200"
          >
            Bayekoli School et La Main de l'Éternel : Forger l'avenir de la jeunesse congolaise à travers la passion et le savoir-faire.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/services">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:w-auto">
                Découvrir nos services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 w-full sm:w-auto">
                Qui sommes-nous ?
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Deux Pôles d'Excellence</h2>
            <div className="h-1.5 w-24 bg-amber-600 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Catering */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl shadow-xl bg-slate-50"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/8dd3d646-97f4-4958-85f7-7dcbf598d408/gourmet-congolese-dish-96ff8152-1777324408699.webp" 
                  alt="Service Traiteur" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
                    <UtensilsCrossed className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Service Traiteur</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  La Main de l'Éternel sublime vos événements avec une cuisine gastronomique valorisant le patrimoine congolais. Mariages, baptêmes, cocktails d'entreprise...
                </p>
                <Link to="/services/catering">
                  <Button variant="link" className="text-amber-600 p-0 h-auto font-bold group">
                    Voir le catalogue et devis <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Training */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl shadow-xl bg-slate-50"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/8dd3d646-97f4-4958-85f7-7dcbf598d408/culinary-training-center-8f489462-1777324410017.webp" 
                  alt="Formation Professionnelle" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-slate-200 text-slate-900 rounded-2xl">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Bayekoli School</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Centre de formation professionnelle dédié aux métiers d'avenir : cuisine, pâtisserie, esthétique, agriculture et plus encore.
                </p>
                <Link to="/services/training">
                  <Button variant="link" className="text-slate-900 p-0 h-auto font-bold group">
                    S'inscrire à une formation <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Award className="h-16 w-16 mx-auto mb-8 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-8 italic">
            "Nous optimisons notre engagement envers notre population afin de valoriser ce beau patrimoine qui est la cuisine congolaise."
          </h2>
          <div className="h-1 w-20 bg-white/40 mx-auto rounded-full" />
        </div>
      </section>
    </div>
  );
};

export default Home;