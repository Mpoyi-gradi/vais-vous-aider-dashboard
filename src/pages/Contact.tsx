import { motion } from "framer-motion";
import { Mail, MessageCircle, Instagram, Music2, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message envoyé avec succès !");
  };

  const socials = [
    { icon: Mail, label: "Email", val: "gradimpoyi552@gmail.com", link: "mailto:gradimpoyi552@gmail.com", color: "bg-amber-100 text-amber-600" },
    { icon: MessageCircle, label: "WhatsApp", val: "+243 123 456 789", link: "https://whatsapp.com/dl/", color: "bg-green-100 text-green-600" },
    { icon: Instagram, label: "Instagram", val: "gradi mpoyi", link: "https://instagram.com/gradi_mpoyi", color: "bg-pink-100 text-pink-600" },
    { icon: Music2, label: "TikTok", val: "chef Gradi", link: "https://tiktok.com/@chef_gradi", color: "bg-slate-100 text-slate-900" },
  ];

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold mb-6">Parlons de votre Projet</h1>
            <p className="text-slate-600 mb-10 text-lg">
              Une question sur nos formations ou besoin d'un service traiteur sur mesure ? Contactez-nous via le formulaire ou nos réseaux sociaux.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {socials.map((s) => (
                <a 
                  key={s.label} 
                  href={s.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
                >
                  <div className={`p-3 rounded-xl ${s.color}`}>
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
                    <p className="text-slate-900 font-medium">{s.val}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-10 p-6 bg-white rounded-2xl shadow-sm flex items-center gap-4">
               <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                 <MapPin className="h-6 w-6" />
               </div>
               <div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Localisation</p>
                 <p className="text-slate-900 font-medium">Kinshasa, République Démocratique du Congo</p>
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Envoyez un Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom complet</Label>
                  <Input placeholder="Votre nom" required />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="votre@email.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Sujet</Label>
                <Input placeholder="De quoi s'agit-il ?" required />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea placeholder="Décrivez votre besoin..." className="min-h-[150px]" required />
              </div>
              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 h-12">
                <Send className="mr-2 h-5 w-5" /> Envoyer
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;