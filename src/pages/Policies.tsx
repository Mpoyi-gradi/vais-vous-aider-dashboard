import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  UserCheck, 
  Database, 
  FileWarning 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Policies = () => {
  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl"
          >
            <ShieldCheck className="text-white h-8 w-8" />
          </motion.div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Politiques de Confidentialité</h1>
          <p className="text-slate-500">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
        </div>

        <div className="space-y-8">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-6 w-6 text-amber-600" />
              <h2 className="text-2xl font-bold">1. Collecte des Données</h2>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              Le Centre <strong>Bayekoli & La Main de l'Éternel</strong> collecte des informations personnelles lors de l'utilisation de nos services (formulaires de devis, inscriptions aux formations, location de matériel). Ces données incluent :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 italic">
              <li>Noms, post-noms et prénoms</li>
              <li>Coordonnées de contact (téléphone, email, adresse de livraison)</li>
              <li>Détails relatifs à vos événements ou projets de formation</li>
            </ul>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold">2. Utilisation de vos Informations</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Vos informations sont exclusivement utilisées pour :
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-slate-50 rounded-xl text-sm font-medium text-slate-700">Traitement de vos devis et factures</div>
                <div className="p-4 bg-slate-50 rounded-xl text-sm font-medium text-slate-700">Gestion logistique des livraisons</div>
                <div className="p-4 bg-slate-50 rounded-xl text-sm font-medium text-slate-700">Communication sur l'état de vos demandes</div>
                <div className="p-4 bg-slate-50 rounded-xl text-sm font-medium text-slate-700">Amélioration de notre qualité de service</div>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold">3. Sécurité et Stockage</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé. Vos factures et devis générés sont stockés de manière sécurisée et ne sont accessibles qu'au personnel autorisé (Chef Gradi Mpoyi et l'équipe administrative).
            </p>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold">4. Partage des Données</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Le Centre s'engage à ne jamais vendre, louer ou céder vos données personnelles à des tiers à des fins commerciales. Vos données ne sont partagées qu'en interne pour assurer le service que vous avez sollicité.
            </p>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileWarning className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold">5. Vos Droits</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Conformément aux réglementations en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ce droit, vous pouvez nous contacter via notre formulaire de contact ou par téléphone.
            </p>
          </motion.section>
        </div>

        <div className="mt-16 p-8 bg-slate-900 rounded-3xl text-white text-center">
            <h3 className="text-xl font-bold mb-4">Besoin de plus d'informations ?</h3>
            <p className="text-slate-400 mb-6">Notre délégué à la protection des données est à votre écoute pour toute question relative à la confidentialité.</p>
            <Button className="bg-amber-600 hover:bg-amber-700">Nous Contacter</Button>
        </div>
      </div>
    </div>
  );
};

export default Policies;