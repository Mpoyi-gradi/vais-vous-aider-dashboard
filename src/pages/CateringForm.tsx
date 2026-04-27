import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ChevronLeft, CheckCircle2, Download, ChefHat, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";

const menuCatalogue = [
  { 
    id: 1, 
    title: "Menu Simple", 
    description: "Formule équilibrée : Plat principal traditionnel, accompagnement et boisson.", 
    price: 16, 
    img: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/8dd3d646-97f4-4958-85f7-7dcbf598d408/menu-simple-4bf43a2e-1777326572756.webp" 
  },
  { 
    id: 2, 
    title: "Menu Entrée de Gamme", 
    description: "Buffet varié : Entrée froide, 2 plats au choix, desserts maison.", 
    price: 18, 
    img: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/8dd3d646-97f4-4958-85f7-7dcbf598d408/menu-entry-level-52de91c6-1777326572892.webp" 
  },
  { 
    id: 3, 
    title: "Menu Full Sushi", 
    description: "Expérience Fusion : Assortiment premium de sushis, sashimis et rolls créatifs.", 
    price: 20, 
    img: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/8dd3d646-97f4-4958-85f7-7dcbf598d408/menu-sushi-27fe52ee-1777326575457.webp" 
  },
  { 
    id: 4, 
    title: "Menu Prestige", 
    description: "Gastronomie de luxe : Cocktail de bienvenue, service à table 4 services.", 
    price: 25, 
    img: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/8dd3d646-97f4-4958-85f7-7dcbf598d408/gourmet-congolese-dish-96ff8152-1777324408699.webp" 
  },
];

const CateringForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: "",
    postnom: "",
    prenom: "",
    eventType: "",
    eventDate: "",
    menuChoice: "",
    guestCount: "",
    contact: "",
    email: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const menu = menuCatalogue.find(m => m.title === formData.menuChoice);
    const total = (menu?.price || 0) * parseInt(formData.guestCount || "0");

    doc.setFontSize(22);
    doc.setTextColor(217, 119, 6); // Amber-600
    doc.text("LA MAIN DE L'ÉTERNEL", 105, 20, { align: "center" });
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("FACTURE / DEVIS CATERING", 105, 30, { align: "center" });
    
    doc.setFontSize(12);
    doc.text(`N° Devis: ${Date.now().toString().slice(-6)}`, 20, 45);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 45);
    
    doc.setFont("helvetica", "bold");
    doc.text("COORDONNÉES CLIENT", 20, 55);
    doc.setFont("helvetica", "normal");
    doc.text(`Nom complet: ${formData.prenom} ${formData.nom} ${formData.postnom}`, 20, 62);
    doc.text(`Contact: ${formData.contact}`, 20, 69);
    doc.text(`Email: ${formData.email}`, 20, 76);
    
    doc.line(20, 82, 190, 82);
    
    doc.setFont("helvetica", "bold");
    doc.text("DÉTAILS DE L'ÉVÉNEMENT", 20, 92);
    doc.setFont("helvetica", "normal");
    doc.text(`Type: ${formData.eventType}`, 20, 99);
    doc.text(`Date de l'événement: ${formData.eventDate}`, 20, 106);
    doc.text(`Nombre de convives: ${formData.guestCount}`, 20, 113);
    
    doc.line(20, 120, 190, 120);
    
    doc.setFont("helvetica", "bold");
    doc.text("SERVICE & TARIFICATION", 20, 130);
    doc.setFont("helvetica", "normal");
    doc.text(`Menu sélectionné: ${formData.menuChoice}`, 20, 137);
    doc.text(`Prix unitaire par personne: $${menu?.price || 0}`, 20, 144);
    
    doc.setFillColor(248, 250, 252);
    doc.rect(20, 155, 170, 20, "F");
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`MONTANT TOTAL À RÉGLER: $${total}`, 105, 168, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Ce devis est valable pour une durée de 30 jours.", 105, 185, { align: "center" });
    doc.text("Merci de nous avoir choisis pour votre excellence culinaire.", 105, 192, { align: "center" });
    
    doc.save(`Devis_Traiteur_${formData.nom}_${Date.now().toString().slice(-4)}.pdf`);
    
    // Store in localStorage for dashboard
    const existing = JSON.parse(localStorage.getItem("catering_requests") || "[]");
    localStorage.setItem("catering_requests", JSON.stringify([...existing, { ...formData, id: Date.now(), total, status: 'Nouveau' }]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePDF();
    toast.success("Votre demande a été traitée avec succès !");
    setStep(3);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-200"
          >
            <ChefHat className="text-white h-8 w-8" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Service Traiteur Prestige</h1>
          <p className="text-slate-500 mt-2">La Main de l'Éternel : Votre partenaire gastronomique</p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-16 max-w-sm mx-auto relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2" />
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= s ? 'bg-amber-600 text-white shadow-lg shadow-amber-100 scale-110' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>
                {step > s ? <CheckCircle2 className="h-6 w-6" /> : s}
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-bold mt-2 ${step >= s ? 'text-amber-600' : 'text-slate-400'}`}>
                {s === 1 ? 'Catalogue' : s === 2 ? 'Formulaire' : 'Facture'}
              </span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {menuCatalogue.map((menu) => (
                  <motion.div
                    key={menu.id}
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="overflow-hidden group hover:shadow-2xl transition-all border-0 rounded-3xl bg-white h-full flex flex-col">
                      <div className="h-48 overflow-hidden relative">
                        <motion.img 
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          src={menu.img} 
                          alt={menu.title} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        <div className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          ${menu.price}/pers
                        </div>
                      </div>
                      <CardContent className="p-5 flex-grow flex flex-col">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-amber-600 transition-colors">{menu.title}</h3>
                        <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-grow">{menu.description}</p>
                        <Button 
                          className="w-full rounded-xl bg-slate-900 hover:bg-amber-600 text-white transition-all shadow-md group-hover:scale-105"
                          onClick={() => {
                            handleSelectChange("menuChoice", menu.title);
                            setStep(2);
                          }}
                        >
                          Choisir ce menu
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100"
            >
              <div className="grid md:grid-cols-5 h-full">
                <div className="md:col-span-2 bg-slate-900 p-10 text-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-8 cursor-pointer text-slate-400 hover:text-white transition-colors" onClick={() => setStep(1)}>
                      <ChevronLeft className="h-4 w-4" /> Retour
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Votre Événement</h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Complétez ces informations pour générer votre devis personnalisé. Une copie vous sera envoyée par email.
                    </p>
                  </div>
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-2">Menu Sélectionné</p>
                    <p className="text-xl font-bold text-amber-500">{formData.menuChoice}</p>
                    <p className="text-sm text-slate-400 mt-1">À partir de ${menuCatalogue.find(m => m.title === formData.menuChoice)?.price}/personne</p>
                  </div>
                </div>
                
                <div className="md:col-span-3 p-10">
                  <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-amber-600" /> 
                    Informations du Devis
                  </h3>

                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="nom">Nom</Label>
                      <Input id="nom" required className="rounded-xl border-slate-200 h-11" onChange={handleInputChange} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="postnom">Post-nom</Label>
                      <Input id="postnom" required className="rounded-xl border-slate-200 h-11" onChange={handleInputChange} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="prenom">Prénom</Label>
                      <Input id="prenom" required className="rounded-xl border-slate-200 h-11" onChange={handleInputChange} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="eventType">Type d'événement</Label>
                      <Select onValueChange={(v) => handleSelectChange("eventType", v)} required>
                        <SelectTrigger className="rounded-xl border-slate-200 h-11">
                          <SelectValue placeholder="Choisir..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mariage">Mariage</SelectItem>
                          <SelectItem value="Cocktail Entreprise">Cocktail Entreprise</SelectItem>
                          <SelectItem value="Baptême">Baptême</SelectItem>
                          <SelectItem value="Anniversaire">Anniversaire</SelectItem>
                          <SelectItem value="Conférence">Conférence</SelectItem>
                          <SelectItem value="Privé">Repas Privé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="eventDate">Date souhaitée</Label>
                      <Input id="eventDate" type="date" required className="rounded-xl border-slate-200 h-11" onChange={handleInputChange} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="guestCount">Nbr de convives</Label>
                      <Input id="guestCount" type="number" required min="1" className="rounded-xl border-slate-200 h-11" onChange={handleInputChange} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact">Téléphone</Label>
                      <Input id="contact" required placeholder="+243..." className="rounded-xl border-slate-200 h-11" onChange={handleInputChange} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required placeholder="contact@exemple.com" className="rounded-xl border-slate-200 h-11" onChange={handleInputChange} />
                    </div>
                    
                    <div className="md:col-span-2 mt-6">
                      <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 h-12 text-lg rounded-xl shadow-lg shadow-amber-100 transition-all font-bold">
                        Générer mon Devis (PDF)
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white rounded-[2rem] shadow-2xl p-16 max-w-2xl mx-auto border border-slate-100"
            >
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Sparkles className="h-10 w-10" />
              </div>
              <h2 className="text-4xl font-bold mb-4 text-slate-900">Félicitations !</h2>
              <p className="text-slate-500 mb-10 text-lg leading-relaxed">
                Votre demande de devis a été enregistrée. Notre maître d'hôtel vous contactera sous 24h pour affiner les détails de votre événement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => setStep(1)} className="h-14 px-8 rounded-2xl border-slate-200 font-bold">
                  Nouveau Devis
                </Button>
                <Button className="bg-slate-900 hover:bg-black h-14 px-8 rounded-2xl shadow-xl transition-all font-bold" onClick={generatePDF}>
                  <Download className="mr-3 h-5 w-5" /> Télécharger mon PDF
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CateringForm;