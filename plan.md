# Plan de mise à jour du projet Bayekoli & La Main de l'Éternel

## 1. Amélioration de la Navigation (Navbar.tsx)
- Ajouter un menu déroulant pour le compte utilisateur.
- Options : "Mon Compte", "Changer de Langue" (FR/EN), "Déconnexion".
- Ajouter un lien "Politiques" vers la nouvelle page de confidentialité.
- Améliorer l'interface pour être plus moderne et intuitive.

## 2. Authentification (Auth.tsx)
- Intégrer formellement l'option Google Sign-In (simulation réaliste).
- Maintenir l'accès admin (gradi mpoyi / 2004).

## 3. Extension des Services (Services.tsx & RentalForm.tsx)
- Modifier `Services.tsx` pour inclure le nouveau service : "Location des accessoires et ustensiles événementiels".
- Créer `src/pages/RentalForm.tsx` :
    - Formulaire complet avec : Nom, Post-nom, Prénom, Nombre de locations, Choix des articles, Durée, Adresse, Téléphone.
    - Liste des articles avec prix :
        - Chaffing dish : 5$
        - Nappes 2m : 5$
        - Couteaux : 1000fc
        - Fourchettes : 1000fc
        - Chaises Tiffany : 5$
        - Chaises Normales : 1000fc
        - Groupe électrogène : 10$/heure.
    - Calcul automatique du prix total.

## 4. Mise à jour du Service Traiteur (CateringForm.tsx)
- Mettre à jour le catalogue des menus avec les nouvelles options :
    - Menu simple : à partir de 16$/pers.
    - Menu entrée de gamme : à partir de 18$/pers.
    - Menu full sushi : à partir de 20$/pers.
- Ajouter une animation sur les photos du catalogue.
- Préparer la structure pour le stockage des factures.

## 5. Optimisation du Tableau de Bord (Dashboard.tsx)
- Ajouter une section pour la gestion des locations.
- Améliorer le traitement et l'organisation des flux (filtres, statuts).
- Permettre de visualiser les détails de chaque formulaire soumis.

## 6. Nouvelles Pages (Policies.tsx & About.tsx)
- Créer `src/pages/Policies.tsx` avec les politiques de confidentialité professionnelles.
- Mettre à jour `src/pages/About.tsx` avec le texte spécifique sur la mission culinaire congolaise et le Centre Bayekoli.

## 7. Configuration des Routes (App.tsx)
- Ajouter les nouvelles routes pour `RentalForm` et `Policies`.
- Assurer la protection des routes du Dashboard.
