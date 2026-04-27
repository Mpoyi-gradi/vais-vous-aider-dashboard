import { motion } from "framer-motion";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UtensilsCrossed, GraduationCap, Users, Package } from "lucide-react";

const Services = () => {
  const servicesList = [
    {
      title: "Service Traiteur",
      description: "La Main de l'Éternel : Service complet pour mariages, cocktails d'entreprise, baptêmes, etc. Une excellence culinaire pour vos plus grands moments.",
      icon: UtensilsCrossed,
      color: "bg-amber-100 text-amber-600",
      link: "/services/catering",
      cta: "Voir le catalogue & devis"
    },
    {
      title: "Formation Professionnelle",
      description: "Bayekoli School : Cuisine, pâtisserie, make-up, agriculture, et bien plus. Développez des compétences réelles pour votre avenir.",
      icon: GraduationCap,
      color: "bg-slate-100 text-slate-900",
      link: "/services/training",
      cta: "S'inscrire à une formation"
    },
    {
      title: "Location d'accessoires",
      description: "Location d'ustensiles et accessoires événementiels : Chafing dishes, nappes, couverts, chaises et groupes électrogènes.",
      icon: Package,
      color: "bg-blue-50 text-blue-600",
      link: "/services/rental",
      cta: "Réserver du matériel"
    },
    {
      title: "Consulting",
      description: "Conseils stratégiques pour lancer votre service traiteur ou développer votre marque de restauration et gastronomie.",
      icon: Users,
      color: "bg-green-50 text-green-600",
      link: "/contact",
      cta: "Demander conseil"
    }
  ];

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            Nos Services Professionnels
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-24 bg-amber-600 mx-auto mb-6"
          />
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto"
          >
            Nous vous accompagnons dans vos projets culinaires, vos événements prestigieux et votre avenir professionnel avec rigueur et passion.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full flex flex-col shadow-sm hover:shadow-xl transition-all border-0 rounded-3xl overflow-hidden bg-white">
                <CardHeader className="pb-4">
                  <div className={`p-4 w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-4 shadow-sm`}>
                    <service.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed mt-2 text-slate-500">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-4">
                  <Link to={service.link}>
                    <Button className={`w-full h-11 rounded-xl font-semibold transition-all ${service.color.includes('amber') ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-100' : 'bg-slate-900 hover:bg-black text-white'}`}>
                      {service.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;