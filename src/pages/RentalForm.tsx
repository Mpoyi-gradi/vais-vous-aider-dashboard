import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Package, 
  ChevronLeft, 
  CheckCircle2, 
  Download, 
  ShoppingCart,
  Clock,
  MapPin,
  Phone,
  Calculator
} from "lucide-react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";

const RENTAL_ITEMS = [
  { id: "chafing", name: "Chafing Dish", price: 5, unit: "$/pièce" },
  { id: "nappes", name: "Nappes 2m", price: 5, unit: "$/pièce" },
  { id: "couteaux", name: "Couteaux", price: 1000, unit: "FC/pièce" },
  { id: "fourchettes", name: "Fourchettes", price: 1000, unit: "FC/pièce" },
  { id: "tiffani", name: "Chaises Tiffani", price: 5, unit: "$/pièce" },
  { id: "normal", name: "Chaises Normales", price: 1000, unit: "FC/pièce" },
  { id: "groupe", name: "Groupe Électrogène", price: 10, unit: "$/heure" },
];

const RentalForm = () => {
  const [step, setStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState({
    nom: "",
    postnom: "",
    prenom: "",
    duration: "",
    address: "",
    phone: "",
    email: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleItemQuantityChange = (id: string, qty: string) => {
    const n = parseInt(qty) || 0;
    setSelectedItems({ ...selectedItems, [id]: n });
  };

  const totals = useMemo(() => {
    let usd = 0;
    let fc = 0;
    
    RENTAL_ITEMS.forEach(item => {
      const qty = selectedItems[item.id] || 0;
      if (item.unit.includes("$")) {
        usd += item.price * qty;
      } else {
        fc += item.price * qty;
      }
    });

    // Special case for generator duration
    if (selectedItems["groupe"] && formData.duration) {
        // duration is in hours if it's a number
        const hours = parseInt(formData.duration) || 0;
        // The base price is already handled in the loop for 1 unit, 
        // but if it's per hour, we multiply by duration.
        // Let's refine: item.price is per hour.
        usd = usd - (10 * (selectedItems["groupe"] || 0)) + (10 * (selectedItems["groupe"] || 0) * hours);
    }

    return { usd, fc };
  }, [selectedItems, formData.duration]);

  const generateInvoice = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.setTextColor(217, 119, 6);
    doc.text("BAYEKOLI RENTAL SERVICES", 105, 20, { align: "center" });
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("BON DE COMMANDE / FACTURE DE LOCATION", 105, 30, { align: "center" });
    
    doc.setFontSize(11);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 45);
    doc.text(`Client: ${formData.prenom} ${formData.nom}`, 20, 52);
    doc.text(`Téléphone: ${formData.phone}`, 20, 59);
    doc.text(`Adresse Livraison: ${formData.address}`, 20, 66);
    
    doc.line(20, 75, 190, 75);
    
    let y = 85;
    doc.setFont("helvetica", "bold");
    doc.text("Article", 20, y);
    doc.text("Qté", 100, y);
    doc.text("Prix Unitaire", 130, y);
    doc.text("Total", 170, y);
    doc.setFont("helvetica", "normal");
    
    y += 10;
    RENTAL_ITEMS.forEach(item => {
      const qty = selectedItems[item.id] || 0;
      if (qty > 0) {
        let itemTotal = item.price * qty;
        let displayPrice = `${item.price} ${item.unit.split('/')[0]}`;
        
        if (item.id === "groupe") {
            const hrs = parseInt(formData.duration) || 1;
            itemTotal = item.price * qty * hrs;
            displayPrice = `${item.price} $/h`;
        }

        doc.text(item.name, 20, y);
        doc.text(qty.toString(), 100, y);
        doc.text(displayPrice, 130, y);
        doc.text(`${itemTotal} ${item.unit.split('/')[0]}`, 170, y);
        y += 8;
      }
    });

    doc.line(20, y + 2, 190, y + 2);
    y += 12;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL À PAYER: ${totals.usd}$ + ${totals.fc} FC`, 20, y);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Durée de location prévue: " + (formData.duration || "N/A") + " heures/jours", 20, y + 10);
    
    doc.text("Conditions: Une caution peut être exigée. Le matériel doit être rendu propre.", 105, y + 30, { align: "center" });
    
    doc.save(`Facture_Location_${formData.nom}_${Date.now()}.pdf`);

    // Store for dashboard
    const existing = JSON.parse(localStorage.getItem("rental_requests") || "[]");
    localStorage.setItem("rental_requests", JSON.stringify([...existing, { ...formData, items: selectedItems, totals, id: Date.now(), status: 'En attente' }]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(selectedItems).every(v => v === 0)) {
        toast.error("Veuillez sélectionner au moins un article");
        return;
    }
    generateInvoice();
    toast.success("Votre commande de location a été enregistrée");
    setStep(3);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200"
          >
            <Package className="text-white h-8 w-8" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Location de Matériel Événementiel</h1>
          <p className="text-slate-500 mt-2">Équipez vos événements avec notre matériel professionnel</p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-12 max-w-sm mx-auto relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2" />
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>
                {step > s ? <CheckCircle2 className="h-6 w-6" /> : s}
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-bold mt-2 ${step >= s ? 'text-blue-600' : 'text-slate-400'}`}>
                {s === 1 ? 'Matériel' : s === 2 ? 'Livraison' : 'Confirmation'}
              </span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-xl rounded-[2rem] overflow-hidden bg-white">
                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <ShoppingCart className="h-6 w-6 text-blue-600" />
                        Choisir vos articles
                    </h2>
                    <div className="space-y-4">
                        {RENTAL_ITEMS.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                                <div className="flex-grow">
                                    <Label htmlFor={`qty-${item.id}`} className="font-bold text-lg block">{item.name}</Label>
                                    <span className="text-sm text-blue-600 font-semibold">{item.price} {item.unit}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Input 
                                        id={`qty-${item.id}`}
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        className="w-24 h-11 rounded-xl text-center bg-white border-slate-200"
                                        value={selectedItems[item.id] || ""}
                                        onChange={(e) => handleItemQuantityChange(item.id, e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="border-0 shadow-xl rounded-[2rem] bg-slate-900 text-white p-8 sticky top-24">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-blue-400" />
                        Récapitulatif
                    </h3>
                    <div className="space-y-4 mb-8">
                        {RENTAL_ITEMS.filter(i => selectedItems[i.id] > 0).map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-slate-400">{item.name} x {selectedItems[item.id]}</span>
                                <span>{item.price * selectedItems[item.id]} {item.unit.split('/')[0]}</span>
                            </div>
                        ))}
                        {Object.values(selectedItems).every(v => v === 0) && (
                            <p className="text-slate-500 italic text-sm">Aucun article sélectionné</p>
                        )}
                    </div>
                    <div className="border-t border-slate-800 pt-6 mb-8">
                        <div className="flex justify-between items-baseline mb-2">
                            <span className="text-slate-400">Total USD</span>
                            <span className="text-2xl font-bold text-blue-400">${totals.usd}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <span className="text-slate-400">Total Francs</span>
                            <span className="text-xl font-bold text-white">{totals.fc} FC</span>
                        </div>
                    </div>
                    <Button 
                        disabled={Object.values(selectedItems).every(v => v === 0)}
                        onClick={() => setStep(2)}
                        className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all"
                    >
                        Continuer vers la livraison
                    </Button>
                </Card>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="grid md:grid-cols-5">
                <div className="md:col-span-2 bg-slate-900 p-10 text-white">
                  <Button variant="ghost" onClick={() => setStep(1)} className="text-slate-400 hover:text-white p-0 h-auto mb-10">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Retour au matériel
                  </Button>
                  <h2 className="text-3xl font-bold mb-4">Livraison</h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    Indiquez-nous où et quand livrer le matériel. Nous gérons le transport (frais en sus selon la distance).
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-blue-400" />
                        </div>
                        <p className="text-sm font-medium">Kinshasa & Environs</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-blue-400" />
                        </div>
                        <p className="text-sm font-medium">Livraison 24h/24 possible</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3 p-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="prenom">Prénom</Label>
                            <Input id="prenom" required className="rounded-xl border-slate-200" value={formData.prenom} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="nom">Nom</Label>
                            <Input id="nom" required className="rounded-xl border-slate-200" value={formData.nom} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="postnom">Post-nom</Label>
                        <Input id="postnom" required className="rounded-xl border-slate-200" value={formData.postnom} onChange={handleInputChange} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="phone">N° Téléphone</Label>
                            <Input id="phone" required placeholder="+243..." className="rounded-xl border-slate-200" value={formData.phone} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="duration">Durée (Jours/Heures)</Label>
                            <Input id="duration" required placeholder="ex: 2 jours" className="rounded-xl border-slate-200" value={formData.duration} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="address">Adresse de Livraison</Label>
                        <Input id="address" required placeholder="Commune, Quartier, Avenue, N°" className="rounded-xl border-slate-200" value={formData.address} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="email">Email (pour la facture)</Label>
                        <Input id="email" type="email" required placeholder="votre@email.com" className="rounded-xl border-slate-200" value={formData.email} onChange={handleInputChange} />
                    </div>
                    
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-14 rounded-xl font-bold shadow-lg shadow-blue-100 mt-6">
                        Générer la Facture de Location
                    </Button>
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
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Réservation Confirmée !</h2>
              <p className="text-slate-500 mb-10 leading-relaxed">
                Votre demande de location a été transmise à notre équipe logistique. Vous recevrez un appel de confirmation sous peu pour les frais de transport.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => setStep(1)} className="h-14 px-8 rounded-2xl font-bold">
                  Nouvelle Réservation
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 h-14 px-8 rounded-2xl shadow-xl font-bold" onClick={generateInvoice}>
                  <Download className="mr-3 h-5 w-5" /> Télécharger la Facture
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RentalForm;