import { motion } from "framer-motion";
import { Award, Target, Heart, ChefHat, GraduationCap, Users } from "lucide-react";

const About = () => {
  return (
    <div className="bg-white">
      {/* Story Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6">
                <ChefHat className="h-4 w-4" /> Notre Histoire
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900 leading-tight">
              L'Excellence au service de la <span className="text-amber-600">Jeunesse Congolaise</span>
            </h1>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                Le centre <strong>Bayekoli School</strong> et son service traiteur <strong>La Main de l'Éternel</strong> forment un établissement prestigieux dédié à l'émancipation professionnelle de la jeunesse congolaise. Fondé par le Chef Gradi Mpoyi, notre centre répond à un besoin critique de professionnalisme dans notre société.
              </p>
              <p>
                Nous croyons fermement que l'autonomie financière passe par l'acquisition de compétences techniques solides. Notre mission est d'armer nos étudiants avec des outils réels pour s'imposer sur le marché du travail, que ce soit en cuisine, pâtisserie, esthétique ou agriculture.
              </p>
              <p>
                À travers <strong>La Main de l'Éternel</strong>, nous portons haut les couleurs de la gastronomie congolaise. Notre engagement est de valoriser ce patrimoine exceptionnel en y injectant les standards internationaux d'excellence et une touche de modernité qui fait notre signature.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                        <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">Bayekoli</p>
                        <p className="text-sm text-slate-500 italic">École Pro</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                        <Users className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">La Main</p>
                        <p className="text-sm text-slate-500 italic">Service Traiteur</p>
                    </div>
                </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/8dd3d646-97f4-4958-85f7-7dcbf598d408/culinary-training-center-8f489462-1777324410017.webp" 
                alt="Chef Gradi Mpoyi au travail" 
                className="w-full h-full object-cover scale-105"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-amber-600 text-white p-10 rounded-[2.5rem] shadow-2xl hidden lg:block max-w-sm border-8 border-white">
              <Award className="h-12 w-12 mb-4" />
              <p className="font-bold text-2xl italic leading-tight">"L'excellence n'est pas une option, c'est notre signature et notre devoir."</p>
              <p className="mt-4 text-amber-100 font-medium">— Chef Gradi Mpoyi</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight">Nos Piliers Fondamentaux</h2>
            <div className="h-1 w-20 bg-amber-600 mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-slate-100"
            >
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-inner">
                <Target className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Rigueur & Discipline</h3>
              <p className="text-slate-500 leading-relaxed">Nous formons des experts prêts à intégrer le marché mondial avec une discipline de fer et une précision absolue dans l'exécution.</p>
            </motion.div>
            
            <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-slate-100"
            >
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-inner">
                <Heart className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Patrimoine Culinaire</h3>
              <p className="text-slate-500 leading-relaxed">Valorisation systématique des ingrédients et recettes traditionnelles congolaises, réinventées pour la haute gastronomie.</p>
            </motion.div>
            
            <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-slate-100"
            >
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-inner">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Innovation Sociale</h3>
              <p className="text-slate-500 leading-relaxed">Utiliser la gastronomie et la formation comme leviers de développement économique et d'autonomisation pour les jeunes de Kinshasa.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;