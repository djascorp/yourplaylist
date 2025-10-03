Exigences Fonctionnelles (Functional Requirements) - Application de Playlist Collaborative

#### 1. Gestion des Utilisateurs (User Management)
*   **FR-U1: Inscription :** Un nouvel utilisateur doit pouvoir créer un compte en fournissant une adresse e-mail et un mot de passe.
*   **FR-U2: Authentification :** Un utilisateur enregistré doit pouvoir se connecter à son compte avec son e-mail et son mot de passe, et pouvoir se déconnecter.

#### 2. Gestion des Playlists (Playlist Management)
*   **FR-P1: Création de Playlist :** Un utilisateur connecté doit pouvoir créer une nouvelle playlist en lui donnant un titre (ex: "Mes sons du moment").
*   **FR-P2: Affichage des Playlists :** L'utilisateur doit pouvoir voir la liste de toutes les playlists qu'il a créées ou auxquelles il a accès.
*   **FR-P3: Affichage du Détail d'une Playlist :** En sélectionnant une playlist, l'utilisateur doit voir une vue détaillée (similaire à votre image) qui liste tous les morceaux qu'elle contient.
*   **FR-P4: Modification de Playlist :** L'utilisateur doit pouvoir renommer ses propres playlists.
*   **FR-P5: Suppression de Playlist :** L'utilisateur doit pouvoir supprimer une playlist qu'il a créée.

#### 3. Gestion des Morceaux (Track Management)
*   **FR-T1: Ajout de morceau via URL YouTube :** Tout utilisateur ayant accès à une playlist (avec les droits d'édition) doit pouvoir y ajouter un morceau en collant une URL de vidéo YouTube.
*   **FR-T2: Traitement Côté Serveur (Backend) :** Le système doit automatiquement :
    *   Valider l'URL YouTube.
    *   Utiliser une librairie (comme `yt-stream`) pour extraire le flux audio (MP3) de la vidéo.
    *   Récupérer les métadonnées de la vidéo (titre, artiste, durée) pour les afficher dans la playlist.
*   **FR-T3: Suppression de morceau :** Un utilisateur doit pouvoir retirer un morceau d'une playlist (via le menu "..." à côté de chaque titre, comme sur votre maquette).
*   **FR-T4: Réorganisation des morceaux :** (Optionnel mais recommandé) L'utilisateur doit pouvoir changer l'ordre des morceaux dans une playlist (par glisser-déposer, par exemple).

#### 4. Lecteur Audio (Music Player)
*   **FR-L1: Lecture :** L'utilisateur doit pouvoir lancer la lecture d'un morceau en cliquant dessus dans la liste.
*   **FR-L2: Contrôles de base :** Le lecteur doit fournir les contrôles suivants :
    *   **Play / Pause :** Mettre en pause et reprendre la lecture du morceau en cours.
    *   **Morceau Suivant (Next) :** Passer au morceau suivant dans la liste de la playlist.
    *   **Morceau Précédent (Previous) :** Revenir au début du morceau en cours ou passer au morceau précédent.
*   **FR-L3: Affichage des informations :** Le lecteur doit clairement afficher :
    *   Le titre du morceau en cours de lecture.
    *   Une barre de progression montrant le temps écoulé et la durée totale du morceau.
*   **FR-L4: Lecture continue :** À la fin d'un morceau, le lecteur doit automatiquement enchaîner avec le morceau suivant de la playlist.
*   **FR-L5: Contrôle du volume :** L'utilisateur doit pouvoir ajuster le volume sonore.

#### 5. Partage et Collaboration (Sharing & Collaboration)
*   **FR-S1: Génération de lien de partage :** Pour chaque playlist, l'utilisateur doit pouvoir générer un lien de partage unique via un menu d'options.
*   **FR-S2: Accès via le lien :** Tout utilisateur (connecté ou non) qui accède à ce lien doit pouvoir voir et écouter la playlist.
*   **FR-S3: Gestion des permissions :** (Optionnel, à définir) Lors du partage, le créateur de la playlist pourrait définir les permissions :
    *   **Lecteur seul :** Les autres utilisateurs peuvent seulement écouter la playlist.
    *   **Collaborateur :** Les autres utilisateurs connectés peuvent écouter ET ajouter/supprimer des morceaux.

---

### **Résumé des Exigences pour l'Interface (UI/UX)**

En plus des fonctions, votre demande "minimal mais complet" se traduit en exigences pour l'interface :

*   **UI-1: Vue "Mes Playlists" :** Une page principale listant les playlists de l'utilisateur.
*   **UI-2: Vue "Détails de la Playlist" :** L'écran principal que vous avez fourni en image, montrant les morceaux et le menu d'options.
*   **UI-3: Lecteur Persistant :** Le lecteur audio (en bas de l'écran sur votre image) doit rester visible et fonctionnel même si l'utilisateur navigue entre différentes playlists.
*   **UI-4: Modal/Pop-up d'ajout :** Un champ simple pour coller l'URL YouTube et l'ajouter à la playlist active.
*   **UI-5: Menu d'options :**
    *   Au niveau de la playlist : pour "Partager", "Renommer", "Supprimer".
    *   Au niveau du morceau (les "...") : pour "Supprimer de la playlist".