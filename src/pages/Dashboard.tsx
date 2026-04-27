import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Utensils, 
  GraduationCap, 
  Users, 
  Trash2, 
  Package, 
  Search, 
  Filter, 
  CheckCircle,
  Clock,
  LayoutDashboard,
  CalendarDays,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const [cateringRequests, setCateringRequests] = useState<any[]>([]);
  const [trainingRegistrations, setTrainingRegistrations] = useState<any[]>([]);
  const [rentalRequests, setRentalRequests] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const catering = JSON.parse(localStorage.getItem("catering_requests") || "[]");
    const training = JSON.parse(localStorage.getItem("training_registrations") || "[]");
    const rental = JSON.parse(localStorage.getItem("rental_requests") || "[]");
    
    setCateringRequests(catering.reverse());
    setTrainingRegistrations(training.reverse());
    setRentalRequests(rental.reverse());
  }, []);

  const clearData = (type: string) => {
    localStorage.setItem(`${type}_requests`, "[]");
    if (type === 'catering') setCateringRequests([]);
    if (type === 'rental') setRentalRequests([]);
    if (type === 'training') {
        localStorage.setItem("training_registrations", "[]");
        setTrainingRegistrations([]);
    }
    toast.success(`Historique ${type} effacé`);
  };

  const deleteItem = (id: number, type: string) => {
    let key = `${type}_requests`;
    if (type === 'training') key = "training_registrations";
    
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    const filtered = existing.filter((item: any) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(filtered));
    
    if (type === 'catering') setCateringRequests(filtered.reverse());
    if (type === 'rental') setRentalRequests(filtered.reverse());
    if (type === 'training') setTrainingRegistrations(filtered.reverse());
    
    toast.info("Entrée supprimée");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
        case 'Confirmé': return <Badge className="bg-green-100 text-green-700 border-green-200">Confirmé</Badge>;
        case 'Nouveau': return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Nouveau</Badge>;
        default: return <Badge className="bg-slate-100 text-slate-700 border-slate-200">{status || 'En attente'}</Badge>;
    }
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <LayoutDashboard className="h-8 w-8 text-amber-600" />
                    Administration Centralisée
                </h1>
                <p className="text-slate-500 mt-1">Gérez vos formulaires, vos clients et vos flux de travail.</p>
            </div>
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="Rechercher un client..." 
                        className="pl-10 w-full md:w-[300px] bg-white border-slate-200 rounded-xl"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button variant="outline" size="icon" className="rounded-xl border-slate-200">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm rounded-2xl bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">Service Traiteur</CardTitle>
              <Utensils className="h-5 w-5 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{cateringRequests.length}</div>
              <p className="text-[10px] text-green-600 font-bold mt-1 flex items-center gap-1">
                <Clock className="h-3 w-3" /> +2 aujourd'hui
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm rounded-2xl bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">Locations</CardTitle>
              <Package className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{rentalRequests.length}</div>
              <p className="text-[10px] text-blue-600 font-bold mt-1 flex items-center gap-1">
                <CalendarDays className="h-3 w-3" /> En cours de traitement
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm rounded-2xl bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">Inscriptions</CardTitle>
              <GraduationCap className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{trainingRegistrations.length}</div>
              <p className="text-[10px] text-slate-400 font-bold mt-1">Bayekoli School</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm rounded-2xl bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">Revenus Estimés</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                ${cateringRequests.reduce((acc, curr) => acc + (curr.total || 0), 0) + rentalRequests.reduce((acc, curr) => acc + (curr.totals?.usd || 0), 0)}
              </div>
              <p className="text-[10px] text-slate-400 font-bold mt-1">Simulation basée sur devis</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="catering" className="w-full">
          <TabsList className="bg-white p-1 rounded-2xl border border-slate-200 mb-8 h-14 w-fit shadow-sm">
            <TabsTrigger value="catering" className="flex items-center gap-2 px-6 rounded-xl data-[state=active]:bg-amber-600 data-[state=active]:text-white h-full">
              <Utensils className="h-4 w-4" /> Traiteur
            </TabsTrigger>
            <TabsTrigger value="rental" className="flex items-center gap-2 px-6 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white h-full">
              <Package className="h-4 w-4" /> Locations
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2 px-6 rounded-xl data-[state=active]:bg-purple-600 data-[state=active]:text-white h-full">
              <GraduationCap className="h-4 w-4" /> Formations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catering">
            <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-white">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 p-6">
                <div>
                    <CardTitle>Demandes de Devis Traiteur</CardTitle>
                    <CardDescription>Visualisez et traitez les demandes de vos clients.</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => clearData('catering')} className="text-red-600 hover:bg-red-50 hover:text-red-700 font-bold">
                  <Trash2 className="h-4 w-4 mr-2" /> Effacer tout
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="pl-6 py-4">Client</TableHead>
                      <TableHead>Événement</TableHead>
                      <TableHead>Menu</TableHead>
                      <TableHead>Pers.</TableHead>
                      <TableHead>Date Év.</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="pr-6 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cateringRequests.map((req) => (
                      <TableRow key={req.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="pl-6 py-4">
                            <div className="font-bold">{req.prenom} {req.nom}</div>
                            <div className="text-[10px] text-slate-400">{req.email}</div>
                        </TableCell>
                        <TableCell><Badge variant="outline">{req.eventType}</Badge></TableCell>
                        <TableCell className="text-sm font-medium">{req.menuChoice}</TableCell>
                        <TableCell className="text-slate-500">{req.guestCount}</TableCell>
                        <TableCell className="text-sm">{req.eventDate}</TableCell>
                        <TableCell className="font-bold text-amber-600">${req.total}</TableCell>
                        <TableCell>{getStatusBadge(req.status)}</TableCell>
                        <TableCell className="pr-6 text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => deleteItem(req.id, 'catering')} className="text-red-600">Supprimer</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                    {cateringRequests.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-20 text-slate-400">Aucune demande enregistrée</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rental">
            <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-white">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 p-6">
                <div>
                    <CardTitle>Commandes de Location</CardTitle>
                    <CardDescription>Suivi du matériel et des livraisons logistiques.</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => clearData('rental')} className="text-red-600 font-bold">
                  <Trash2 className="h-4 w-4 mr-2" /> Effacer tout
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="pl-6 py-4">Client</TableHead>
                      <TableHead>Adresse Livraison</TableHead>
                      <TableHead>Articles</TableHead>
                      <TableHead>Durée</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="pr-6 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rentalRequests.map((req) => (
                      <TableRow key={req.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="pl-6 py-4">
                            <div className="font-bold">{req.prenom} {req.nom}</div>
                            <div className="text-[10px] text-slate-400">{req.phone}</div>
                        </TableCell>
                        <TableCell className="max-w-[150px] truncate text-sm">{req.address}</TableCell>
                        <TableCell>
                            <div className="flex flex-wrap gap-1">
                                {Object.entries(req.items).filter(([_, v]) => (v as number) > 0).map(([k, v]) => (
                                    <Badge key={k} variant="secondary" className="text-[9px] h-5">{k}: {v as number}</Badge>
                                ))}
                            </div>
                        </TableCell>
                        <TableCell className="text-sm">{req.duration}</TableCell>
                        <TableCell className="font-bold">
                            <div className="text-blue-600">${req.totals?.usd}</div>
                            <div className="text-[10px] text-slate-400">{req.totals?.fc} FC</div>
                        </TableCell>
                        <TableCell>{getStatusBadge(req.status)}</TableCell>
                        <TableCell className="pr-6 text-right">
                             <Button variant="ghost" size="icon" onClick={() => deleteItem(req.id, 'rental')}><Trash2 className="h-4 w-4 text-slate-300 hover:text-red-600" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {rentalRequests.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-20 text-slate-400">Aucune commande de location</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training">
            <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-white">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 p-6">
                <div>
                    <CardTitle>Inscriptions aux Formations</CardTitle>
                    <CardDescription>Bayekoli School : Suivi des futurs professionnels.</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => clearData('training')} className="text-red-600 font-bold">
                  <Trash2 className="h-4 w-4 mr-2" /> Effacer tout
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="pl-6 py-4">Apprenant</TableHead>
                      <TableHead>Formation</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Détails</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Date Inscr.</TableHead>
                      <TableHead className="pr-6 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trainingRegistrations.map((reg) => (
                      <TableRow key={reg.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="pl-6 py-4">
                            <div className="font-bold">{reg.prenom} {reg.nom}</div>
                            <div className="text-[10px] text-slate-400">{reg.email}</div>
                        </TableCell>
                        <TableCell><Badge className="bg-purple-100 text-purple-700 border-purple-200">{reg.formation}</Badge></TableCell>
                        <TableCell className="text-sm">{reg.type}</TableCell>
                        <TableCell className="text-xs text-slate-500">{reg.sex} / {reg.age} ans</TableCell>
                        <TableCell className="text-sm font-medium">{reg.contact}</TableCell>
                        <TableCell className="text-sm">{new Date(reg.date).toLocaleDateString()}</TableCell>
                        <TableCell className="pr-6 text-right">
                             <Button variant="ghost" size="icon" onClick={() => deleteItem(reg.id, 'training')}><Trash2 className="h-4 w-4 text-slate-300 hover:text-red-600" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {trainingRegistrations.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-20 text-slate-400">Aucune inscription enregistrée</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;