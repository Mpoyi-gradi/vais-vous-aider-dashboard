import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, Info, DollarSign } from "lucide-react";
import { toast } from "sonner";

const TrainingForm = () => {
  const [formData, setFormData] = useState({
    nom: "", postnom: "", prenom: "",
    formation: "", type: "", sex: "",
    age: "", contact: "", email: "", address: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const existing = JSON.parse(localStorage.getItem("training_registrations") || "[]");
    localStorage.setItem("training_registrations", JSON.stringify([...existing, { ...formData, id: Date.now(), date: new Date().toISOString() }]));
    
    toast.success("Inscription enregistrée ! Veuillez passer au centre pour finaliser le paiement.");
    // Reset or redirect logic here
  };

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Info Panel */}
          <div className="md:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg bg-slate-900 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-amber-500" />
                  Tarifs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span>Inscription</span>
                  <span className="font-bold text-amber-500">$5 (Obligatoire)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Mensualité</span>
                  <span className="font-bold text-amber-500">$30 / mois</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Durées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-600">
                <p>• <b>Perfectionnement</b>: 4 mois</p>
                <p>• <b>Qualification</b>: 6 mois</p>
              </CardContent>
            </Card>
          </div>

          {/* Form Panel */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardHeader className="bg-amber-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6" />
                    Formulaire d'Inscription
                  </CardTitle>
                  <CardDescription className="text-amber-100">
                    Rejoignez Bayekoli School et développez vos talents.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input id="nom" required onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postnom">Post-nom</Label>
                      <Input id="postnom" required onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom</Label>
                      <Input id="prenom" required onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sex">Sexe</Label>
                      <Select onValueChange={(v) => handleSelectChange("sex", v)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="M">Masculin</SelectItem>
                          <SelectItem value="F">Féminin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Âge</Label>
                      <Input id="age" type="number" required onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact</Label>
                      <Input id="contact" required onChange={handleInputChange} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required onChange={handleInputChange} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address">Adresse physique</Label>
                      <Input id="address" required onChange={handleInputChange} />
                    </div>
                    
                    <div className="md:col-span-2 space-y-4 pt-4 border-t">
                      <div className="space-y-2">
                        <Label>Choix de la formation</Label>
                        <Select onValueChange={(v) => handleSelectChange("formation", v)} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir une filière..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Cuisine Congolaise">Cuisine Congolaise</SelectItem>
                            <SelectItem value="Pâtisserie">Pâtisserie</SelectItem>
                            <SelectItem value="Cuisine Gastronomique">Cuisine Gastronomique</SelectItem>
                            <SelectItem value="Make-up">Make-up</SelectItem>
                            <SelectItem value="Coiffure mixte et Esthétique">Coiffure mixte et Esthétique</SelectItem>
                            <SelectItem value="Décoration événementielle">Décoration événementielle</SelectItem>
                            <SelectItem value="Perlage">Perlage</SelectItem>
                            <SelectItem value="Cuir : Maroquinerie">Cuir : Maroquinerie</SelectItem>
                            <SelectItem value="Agriculture">Agriculture</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Type de formation</Label>
                        <RadioGroup onValueChange={(v) => handleSelectChange("type", v)} className="grid grid-cols-1 gap-2">
                          <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-slate-50">
                            <RadioGroupItem value="Perfectionnement (4 mois)" id="t1" />
                            <Label htmlFor="t1" className="cursor-pointer">Perfectionnement Professionnel (4 mois)</Label>
                          </div>
                          <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-slate-50">
                            <RadioGroupItem value="Qualification (6 mois)" id="t2" />
                            <Label htmlFor="t2" className="cursor-pointer">Qualification Professionnelle (6 mois)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="md:col-span-2 mt-4">
                      <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 h-12">
                        Confirmer l'Inscription
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingForm;