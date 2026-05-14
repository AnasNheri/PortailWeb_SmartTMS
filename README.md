# PortailWeb_SmartTMS

Portail web client de la solution **SmartTMS** — Système de Gestion de Transport basé sur Microsoft Power Platform.

---

## Description

Ce portail web est destiné aux **clients** de la société de transport. Il leur permet de soumettre des demandes de transport via un formulaire structuré, sans nécessiter de compte ou d'authentification.

Une fois le formulaire soumis, les données sont transmises automatiquement à **Microsoft Dataverse** via un flux **Power Automate (HTTP Request)**, ce qui déclenche la création automatique d'une nouvelle course dans le système avec le statut **"À vérifier"**, prête à être traitée par le dispatcher.

---

## Fonctionnalités

- Formulaire de demande de transport structuré
- Validation des champs obligatoires côté client
- Soumission des données via Power Automate (HTTP Request)
- Création automatique d'une course dans Dataverse
- Interface responsive adaptée à tous les écrans

---

## Contenu du formulaire

Le formulaire de demande de transport contient les champs suivants :

**Informations de l'expéditeur**
- Nom de la société
- Nom du contact
- Adresse e-mail
- Numéro de téléphone

**Informations de transport**
- Adresse de chargement
- Adresse de livraison
- Date de chargement souhaitée
- Date de livraison souhaitée

**Informations sur la marchandise**
- Type de marchandise
- Quantité
- Observations / remarques

---

## Technologies utilisées

| Technologie | Rôle |
|---|---|
| **React** | Framework JavaScript pour la construction de l'interface utilisateur |
| **Tailwind CSS** | Framework CSS utility-first pour le style et le responsive |
| **Power Automate** | Réception des données via HTTP Request et création de la course dans Dataverse |
| **Microsoft Dataverse** | Base de données centrale de la solution SmartTMS |

---

## Installation et lancement

### Prérequis
- Node.js >= 18.x
- npm >= 9.x

### Étapes

```bash
# Cloner le repository
git clone https://github.com/<votre-username>/PortailWeb_SmartTMS.git

# Accéder au dossier
cd PortailWeb_SmartTMS

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

---

## Intégration Power Automate

Le formulaire envoie une requête **HTTP POST** vers un flux Power Automate déclenché manuellement via un connecteur HTTP.

Le flux Power Automate :
1. Reçoit les données du formulaire
2. Crée un enregistrement **Course** dans Dataverse
3. Définit le statut de la course à **"À vérifier"**
4. Notifie le dispatcher pour qu'il finalise la planification

---

## Lien avec la solution SmartTMS

Ce portail s'intègre dans l'écosystème **SmartTMS** composé de :

| Interface | Acteur | Technologie |
|---|---|---|
| Application back-office | Administrateur système & Dispatcher | Power Apps (Model-Driven App) |
| Application mobile SmartTMS Drivers | Chauffeur | Power Apps (Canvas App) |
| **Portail web** | **Client** | **React & Tailwind CSS** |

---

## Auteur

Développé dans le cadre d'un projet de fin d'études — **Licence Nationale en Informatique**  
Entreprise d'accueil : **Askware-Tunisia**
