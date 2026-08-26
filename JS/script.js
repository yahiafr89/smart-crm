const API_URL =
    "https://subway-goliath-reversing.ngrok-free.dev/webhook-test/crm/lead-intake";


const translations = {

    fr: {

        "page.homeTitle":
            "Smart CRM - Gérez vos prospects intelligemment",

        "about.pageTitle":
            "À propos - Smart CRM",

        "services.pageTitle":
            "Services - Smart CRM",

        "contact.pageTitle":
            "Demander un devis - Smart CRM",

        "login.pageTitle":
            "Smart CRM - Connexion",

        "dashboard.pageTitle":
            "Dashboard - Smart CRM",

        "prospects.pageTitle":
            "Prospects - Smart CRM",

        "salespeople.pageTitle":
            "Commerciaux - Smart CRM",

        "admin.pageTitle":
            "Administration - Smart CRM",


        "nav.mainLabel":
            "Navigation principale",

        "nav.home":
            "Accueil",

        "nav.about":
            "À propos",

        "nav.services":
            "Services",

        "nav.contact":
            "Contact",

        "nav.dashboard":
            "Tableau de bord",

        "nav.prospects":
            "Prospects",

        "nav.salespeople":
            "Commerciaux",

        "nav.administration":
            "Administration",


        "language.selectorLabel":
            "Choix de la langue",

        "language.french":
            "🇫🇷 Français",

        "language.english":
            "🇬🇧 English",


        "home.heroLabel":
            "Un projet ? Parlons-en.",

        "home.heroTitle":
            "Donnez vie à votre projet avec une solution adaptée à vos besoins.",

        "home.heroText":
            "Décrivez-nous votre projet, votre besoin ou votre problématique. Notre équipe étudiera votre demande et vous proposera une solution adaptée.",

        "home.requestQuote":
            "Demander un devis",

        "home.servicesLabel":
            "Nos services",

        "home.servicesTitle":
            "Des solutions adaptées à vos besoins",

        "home.servicesText":
            "Découvrez nos services et décrivez-nous votre projet pour recevoir une proposition adaptée.",

        "home.benefitsLabel":
            "Pourquoi nous choisir ?",

        "home.benefitsTitle":
            "Une approche pensée pour votre projet",

        "home.benefitsText":
            "Nous commençons par comprendre votre besoin avant de proposer une solution adaptée.",

        "home.quoteLabel":
            "Votre projet",

        "home.quoteTitle":
            "Décrivez-nous votre besoin",

        "home.quoteText":
            "Expliquez-nous votre projet et notre équipe vous contactera pour étudier votre demande.",


        "service.webTitle":
            "Développement web",

        "service.webText":
            "Création de sites web et d'applications adaptés aux besoins de votre entreprise.",

        "service.automationTitle":
            "Automatisation",

        "service.automationText":
            "Automatisez vos tâches répétitives et optimisez vos processus métier.",

        "service.digitalTitle":
            "Solutions digitales",

        "service.digitalText":
            "Conception de solutions numériques adaptées à vos objectifs et à votre activité.",

        "service.businessTitle":
            "Applications métier",

        "service.businessText":
            "Développez des applications personnalisées pour améliorer vos opérations quotidiennes.",

        "service.consultingTitle":
            "Conseil digital",

        "service.consultingText":
            "Identifiez les meilleures solutions numériques pour faire évoluer votre activité.",

        "service.customTitle":
            "Projet personnalisé",

        "service.customText":
            "Vous avez un besoin spécifique ? Décrivez-nous votre projet et discutons-en.",

        "service.customButton":
            "Décrire mon projet",


        "benefit.understandTitle":
            "Comprendre votre besoin",

        "benefit.understandText":
            "Nous analysons votre demande, vos objectifs et les contraintes de votre projet.",

        "benefit.solutionTitle":
            "Proposer la bonne solution",

        "benefit.solutionText":
            "Nous vous proposons une solution adaptée à votre situation et à vos objectifs.",

        "benefit.supportTitle":
            "Vous accompagner",

        "benefit.supportText":
            "Notre équipe vous accompagne de la première demande jusqu'à la réalisation du projet.",


        "about.heroLabel":
            "À propos de nous",

        "about.heroTitle":
            "Nous transformons les idées en solutions concrètes.",

        "about.heroText":
            "Notre équipe accompagne les entreprises dans la réalisation de leurs projets en proposant des solutions adaptées à leurs besoins.",

        "about.approachLabel":
            "Notre approche",

        "about.approachTitle":
            "Comprendre avant de proposer",

        "about.approachText":
            "Chaque projet est différent. Nous commençons donc par comprendre les objectifs, les contraintes et les attentes de nos clients avant de construire une solution adaptée.",


        "services.heroLabel":
            "Nos services",

        "services.heroTitle":
            "Des solutions adaptées à vos projets.",

        "services.heroText":
            "Découvrez nos différentes prestations et choisissez celle qui correspond le mieux à votre besoin.",

        "services.expertiseLabel":
            "Nos expertises",

        "services.expertiseTitle":
            "Ce que nous pouvons réaliser pour vous",

        "services.expertiseText":
            "Chaque demande est étudiée individuellement afin de proposer une solution adaptée.",


        "contact.heroLabel":
            "Votre projet",

        "contact.heroTitle":
            "Parlons de votre projet.",

        "contact.heroText":
            "Décrivez-nous votre besoin et notre équipe vous contactera pour étudier votre demande.",

        "contact.formLabel":
            "Demande de devis",

        "contact.formTitle":
            "Décrivez-nous votre projet",

        "contact.formText":
            "Plus votre demande est précise, plus nous pourrons comprendre rapidement votre besoin.",

        "contact.success":
            "Votre demande a bien été enregistrée. Notre équipe vous contactera prochainement.",


        "form.firstName":
            "Prénom *",

        "form.firstNamePlaceholder":
            "Votre prénom",

        "form.lastName":
            "Nom *",

        "form.lastNamePlaceholder":
            "Votre nom",

        "form.company":
            "Entreprise",

        "form.companyPlaceholder":
            "Nom de votre entreprise",

        "form.email":
            "Email *",

        "form.emailPlaceholder":
            "vous@entreprise.com",

        "form.phone":
            "Téléphone",

        "form.phonePlaceholder":
            "+212 6...",

        "form.message":
            "Décrivez votre projet *",

        "form.messagePlaceholder":
            "Décrivez votre besoin, vos objectifs et les fonctionnalités souhaitées...",

        "form.submit":
            "Envoyer ma demande",


        "login.eyebrow":
            "Espace Smart CRM",

        "login.welcome":
            "Bienvenue",

        "login.subtitle":
            "Connectez-vous pour accéder à votre espace.",

        "login.rememberMe":
            "Se souvenir de moi",

        "login.forgotPassword":
            "Mot de passe oublié ?",

        "login.visualLabel":
            "Présentation Smart CRM",

        "login.visualEyebrow":
            "CRM intelligent",

        "login.visualTitle":
            "Transformez chaque opportunité en prochaine action.",

        "login.visualText":
            "Centralisez vos prospects, priorisez les opportunités et donnez à votre équipe une vue claire pour avancer plus vite.",

        "login.pipeline":
            "Pipeline commercial",

        "login.trustNote":
            "Une interface pensée pour les équipes commerciales modernes.",

        "login.email":
            "Adresse e-mail",

        "login.emailPlaceholder":
            "vous@entreprise.com",

        "login.password":
            "Mot de passe",

        "login.passwordPlaceholder":
            "Votre mot de passe",

        "login.submit":
            "Se connecter",

        "login.authorizedUsers":
            "Espace réservé aux utilisateurs autorisés.",


        "dashboard.overview":
            "Vue d'ensemble",

        "dashboard.welcome":
            "Bienvenue dans votre espace de gestion des prospects.",

        "dashboard.newProspect":
            "+ Nouveau prospect",

        "dashboard.pipelineLabel":
            "Pipeline commercial",

        "dashboard.pipelineTitle":
            "Répartition des leads par statut",

        "dashboard.pipelineDescription":
            "Visualisez en un coup d'œil la progression de vos leads dans le cycle commercial.",

        "dashboard.pipelineTotal":
            "Total leads",

        "dashboard.recentActivity":
            "Activité récente",

        "dashboard.latestProspects":
            "Derniers prospects",

        "dashboard.recentlyAdded":
            "Les prospects récemment ajoutés au CRM.",

        "dashboard.viewAll":
            "Voir tous les prospects",


        "prospects.management":
            "Gestion commerciale",

        "prospects.pageDescription":
            "Consultez, recherchez et gérez vos prospects.",

        "prospects.newProspect":
            "Nouveau prospect",

        "prospects.addProspect":
            "Ajouter un prospect",

        "prospects.formDescription":
            "Renseignez les informations du nouveau prospect.",

        "prospects.firstNamePlaceholder":
            "Ex. Ahmed",

        "prospects.lastNamePlaceholder":
            "Ex. Benali",

        "prospects.companyPlaceholder":
            "Ex. Atlas Solutions",

        "prospects.emailPlaceholder":
            "Ex. ahmed@example.com",

        "prospects.phonePlaceholder":
            "+212 6...",

        "prospects.cityPlaceholder":
            "Ex. Casablanca",

        "prospects.comments":
            "Commentaires",

        "prospects.commentsPlaceholder":
            "Ajoutez des informations complémentaires...",

        "prospects.database":
            "Base prospects",

        "prospects.listTitle":
            "Liste des prospects",

        "prospects.listDescription":
            "Retrouvez ici l'ensemble des prospects enregistrés.",

        "prospects.searchLabel":
            "Rechercher un prospect",

        "prospects.searchPlaceholder":
            "Nom, entreprise ou e-mail...",

        "prospects.actions":
            "Actions",

        "prospects.details":
            "Détails du prospect",

        "prospects.close":
            "Fermer",

        "prospects.profileLabel":
            "Fiche CRM",

        "prospects.contactInfo":
            "Coordonnées",

        "prospects.commercialInfo":
            "Suivi commercial",

        "prospects.qualification":
            "Qualification",

        "prospects.qualificationPending":
            "À définir",

        "prospects.createdAt":
            "Créé le",

        "prospects.updatedAt":
            "Dernière mise à jour",

        "prospects.aiSection":
            "Assistant IA",

        "prospects.aiSummary":
            "Résumé IA",

        "prospects.aiSummaryPending":
            "Le résumé généré par IA sera affiché ici lorsque CRM-06 sera connecté.",

        "prospects.nextAction":
            "Prochaine action",

        "prospects.nextActionPending":
            "La prochaine action recommandée sera affichée ici lorsque CRM-06 sera connecté.",

        "prospects.editProfile":
            "Modifier le prospect",


        "prospect.firstName":
            "Prénom",

        "prospect.firstNameRequired":
            "Prénom *",

        "prospect.lastName":
            "Nom",

        "prospect.lastNameRequired":
            "Nom *",

        "prospect.name":
            "Prospect",

        "prospect.company":
            "Entreprise",

        "prospect.email":
            "E-mail",

        "prospect.emailRequired":
            "E-mail *",

        "prospect.phone":
            "Téléphone",

        "prospect.city":
            "Ville",

        "prospect.status":
            "Statut",

        "prospect.salesperson":
            "Commercial",


        "status.new":
            "Nouveau",

        "status.contacted":
            "Contacté",

        "status.qualified":
            "Qualifié",

        "status.proposalSent":
            "Proposition envoyée",

        "status.negotiation":
            "Négociation",

        "status.won":
            "Gagné",

        "status.lost":
            "Perdu",

        "status.archived":
            "Archivé",

        "status.active":
            "Actif",

        "status.inactive":
            "Inactif",


        "common.all":
            "Tous",

        "common.unassigned":
            "Non assigné",


        "actions.save":
            "Enregistrer le prospect",

        "actions.cancel":
            "Annuler",

        "actions.edit":
            "Modifier",

        "actions.delete":
            "Supprimer",

        "actions.view":
            "Voir",


        "salespeople.title":
            "Commerciaux",

        "salespeople.pageDescription":
            "Gérez les membres de votre équipe commerciale.",

        "salespeople.addButton":
            "+ Ajouter un commercial",

        "salespeople.addTitle":
            "Ajouter un commercial",

        "salespeople.addDescription":
            "Enregistrez les informations d'un nouveau membre de l'équipe.",

        "salespeople.lastNameRequired":
            "Nom *",

        "salespeople.lastNamePlaceholder":
            "Nom",

        "salespeople.firstNameRequired":
            "Prénom *",

        "salespeople.firstNamePlaceholder":
            "Prénom",

        "salespeople.emailRequired":
            "E-mail professionnel *",

        "salespeople.emailPlaceholder":
            "prenom@entreprise.com",

        "salespeople.phone":
            "Téléphone",

        "salespeople.phonePlaceholder":
            "+212 6...",

        "salespeople.roleRequired":
            "Rôle *",

        "salespeople.rolePlaceholder":
            "Choisissez un rôle",

        "salespeople.status":
            "Statut",

        "salespeople.addSubmit":
            "Ajouter le commercial",

        "salespeople.teamTitle":
            "Équipe commerciale",

        "salespeople.teamDescription":
            "Consultez les membres de votre équipe.",

        "salespeople.lastName":
            "Nom",

        "salespeople.role":
            "Rôle",


        "roles.commercial":
            "Commercial",

        "roles.manager":
            "Manager",

        "roles.administrator":
            "Administrateur",


        "admin.title":
            "Administration",

        "admin.description":
            "Gérez les utilisateurs, les statistiques et les paramètres du CRM.",

        "admin.statistics.title":
            "Statistiques générales",

        "admin.statistics.description":
            "Vue globale de l'activité du CRM.",

        "admin.stats.prospects":
            "Total prospects",

        "admin.stats.salespeople":
            "Commerciaux",

        "admin.stats.clients":
            "Clients",

        "admin.stats.contracts":
            "Contrats signés",

        "admin.users.title":
            "Gestion des utilisateurs",

        "admin.users.description":
            "Gérez les utilisateurs ayant accès au CRM.",

        "admin.users.add":
            "+ Ajouter un utilisateur",

        "admin.users.user":
            "Utilisateur",

        "admin.users.email":
            "E-mail",

        "admin.users.role":
            "Rôle",

        "admin.users.status":
            "Statut",

        "admin.users.actions":
            "Actions",

        "admin.settings.title":
            "Paramètres",

        "admin.settings.description":
            "Configurez les paramètres généraux du CRM.",

        "admin.settings.companyName":
            "Nom de l'entreprise",

        "admin.settings.companyNamePlaceholder":
            "Nom de votre entreprise",

        "admin.settings.companyEmail":
            "E-mail de contact",

        "admin.settings.companyEmailPlaceholder":
            "contact@entreprise.com",

        "admin.settings.defaultStatus":
            "Statut par défaut d'un nouveau prospect",

        "admin.settings.reset":
            "Réinitialiser",

        "admin.settings.save":
            "Sauvegarder",


        "footer.description":
            "Des solutions adaptées à vos projets et aux besoins de votre entreprise.",

        "footer.crmDescription":
            "Gestion intelligente des prospects et des équipes commerciales.",

        "footer.navigation":
            "Navigation",

        "footer.contact":
            "Contact",

        "footer.email":
            "Email",

        "footer.phone":
            "Téléphone",

        "footer.country":
            "Maroc",

        "footer.internalSpace":
            "Espace de gestion interne",

        "footer.copyright":
            "© 2026 Smart CRM. Tous droits réservés."

    },


    en: {

        "page.homeTitle":
            "Smart CRM - Manage your leads intelligently",

        "about.pageTitle":
            "About - Smart CRM",

        "services.pageTitle":
            "Services - Smart CRM",

        "contact.pageTitle":
            "Request a quote - Smart CRM",

        "login.pageTitle":
            "Smart CRM - Login",

        "dashboard.pageTitle":
            "Dashboard - Smart CRM",

        "prospects.pageTitle":
            "Prospects - Smart CRM",

        "salespeople.pageTitle":
            "Salespeople - Smart CRM",

        "admin.pageTitle":
            "Administration - Smart CRM",


        "nav.mainLabel":
            "Main navigation",

        "nav.home":
            "Home",

        "nav.about":
            "About",

        "nav.services":
            "Services",

        "nav.contact":
            "Contact",

        "nav.dashboard":
            "Dashboard",

        "nav.prospects":
            "Prospects",

        "nav.salespeople":
            "Salespeople",

        "nav.administration":
            "Administration",


        "language.selectorLabel":
            "Language selection",

        "language.french":
            "🇫🇷 French",

        "language.english":
            "🇬🇧 English",


        "home.heroLabel":
            "Have a project? Let's talk.",

        "home.heroTitle":
            "Bring your project to life with a solution tailored to your needs.",

        "home.heroText":
            "Tell us about your project, need or challenge. Our team will review your request and propose an appropriate solution.",

        "home.requestQuote":
            "Request a quote",

        "home.servicesLabel":
            "Our services",

        "home.servicesTitle":
            "Solutions tailored to your needs",

        "home.servicesText":
            "Discover our services and tell us about your project to receive a tailored proposal.",

        "home.benefitsLabel":
            "Why choose us?",

        "home.benefitsTitle":
            "An approach designed around your project",

        "home.benefitsText":
            "We start by understanding your needs before proposing the right solution.",

        "home.quoteLabel":
            "Your project",

        "home.quoteTitle":
            "Tell us what you need",

        "home.quoteText":
            "Describe your project and our team will contact you to review your request.",


        "service.webTitle":
            "Web development",

        "service.webText":
            "Websites and applications designed around your business needs.",

        "service.automationTitle":
            "Automation",

        "service.automationText":
            "Automate repetitive tasks and optimize your business processes.",

        "service.digitalTitle":
            "Digital solutions",

        "service.digitalText":
            "Digital solutions tailored to your goals and business activity.",

        "service.businessTitle":
            "Business applications",

        "service.businessText":
            "Custom applications designed to improve your daily operations.",

        "service.consultingTitle":
            "Digital consulting",

        "service.consultingText":
            "Identify the best digital solutions to support your business growth.",

        "service.customTitle":
            "Custom project",

        "service.customText":
            "Have a specific need? Tell us about your project and let's discuss it.",

        "service.customButton":
            "Describe my project",


        "benefit.understandTitle":
            "Understand your needs",

        "benefit.understandText":
            "We analyze your request, objectives and project constraints.",

        "benefit.solutionTitle":
            "Provide the right solution",

        "benefit.solutionText":
            "We propose a solution tailored to your situation and objectives.",

        "benefit.supportTitle":
            "Support you",

        "benefit.supportText":
            "Our team supports you from the initial request through project delivery.",


        "about.heroLabel":
            "About us",

        "about.heroTitle":
            "We turn ideas into practical solutions.",

        "about.heroText":
            "Our team helps companies deliver their projects with solutions tailored to their needs.",

        "about.approachLabel":
            "Our approach",

        "about.approachTitle":
            "Understand before proposing",

        "about.approachText":
            "Every project is different. We begin by understanding our clients' goals, constraints and expectations before building the right solution.",


        "services.heroLabel":
            "Our services",

        "services.heroTitle":
            "Solutions tailored to your projects.",

        "services.heroText":
            "Discover our services and choose the one that best matches your needs.",

        "services.expertiseLabel":
            "Our expertise",

        "services.expertiseTitle":
            "What we can build for you",

        "services.expertiseText":
            "Each request is reviewed individually in order to provide the right solution.",


        "contact.heroLabel":
            "Your project",

        "contact.heroTitle":
            "Let's talk about your project.",

        "contact.heroText":
            "Tell us about your needs and our team will contact you to review your request.",

        "contact.formLabel":
            "Quote request",

        "contact.formTitle":
            "Tell us about your project",

        "contact.formText":
            "The more precise your request is, the faster we can understand your needs.",

        "contact.success":
            "Your request has been successfully submitted. Our team will contact you soon.",


        "form.firstName":
            "First name *",

        "form.firstNamePlaceholder":
            "Your first name",

        "form.lastName":
            "Last name *",

        "form.lastNamePlaceholder":
            "Your last name",

        "form.company":
            "Company",

        "form.companyPlaceholder":
            "Company name",

        "form.email":
            "Email *",

        "form.emailPlaceholder":
            "you@company.com",

        "form.phone":
            "Phone",

        "form.phonePlaceholder":
            "+212 6...",

        "form.message":
            "Describe your project *",

        "form.messagePlaceholder":
            "Describe your needs, objectives and desired features...",

        "form.submit":
            "Send my request",


        "login.eyebrow":
            "Smart CRM workspace",

        "login.welcome":
            "Welcome",

        "login.subtitle":
            "Sign in to access your workspace.",

        "login.rememberMe":
            "Remember me",

        "login.forgotPassword":
            "Forgot password?",

        "login.visualLabel":
            "Smart CRM presentation",

        "login.visualEyebrow":
            "Intelligent CRM",

        "login.visualTitle":
            "Turn every opportunity into the next best action.",

        "login.visualText":
            "Centralize your prospects, prioritize opportunities and give your team a clear view to move faster.",

        "login.pipeline":
            "Sales pipeline",

        "login.trustNote":
            "An interface designed for modern sales teams.",

        "login.email":
            "Email address",

        "login.emailPlaceholder":
            "you@company.com",

        "login.password":
            "Password",

        "login.passwordPlaceholder":
            "Your password",

        "login.submit":
            "Sign in",

        "login.authorizedUsers":
            "Authorized users only.",


        "dashboard.overview":
            "Overview",

        "dashboard.welcome":
            "Welcome to your prospect management workspace.",

        "dashboard.newProspect":
            "+ New prospect",

        "dashboard.pipelineLabel":
            "Sales pipeline",

        "dashboard.pipelineTitle":
            "Lead distribution by status",

        "dashboard.pipelineDescription":
            "See at a glance how your leads progress through the sales cycle.",

        "dashboard.pipelineTotal":
            "Total leads",

        "dashboard.recentActivity":
            "Recent activity",

        "dashboard.latestProspects":
            "Latest prospects",

        "dashboard.recentlyAdded":
            "Recently added prospects.",

        "dashboard.viewAll":
            "View all prospects",


        "prospects.management":
            "Sales management",

        "prospects.pageDescription":
            "View, search and manage your prospects.",

        "prospects.newProspect":
            "New prospect",

        "prospects.addProspect":
            "Add prospect",

        "prospects.formDescription":
            "Enter the new prospect's information.",

        "prospects.firstNamePlaceholder":
            "Example: Ahmed",

        "prospects.lastNamePlaceholder":
            "Example: Benali",

        "prospects.companyPlaceholder":
            "Example: Atlas Solutions",

        "prospects.emailPlaceholder":
            "Example: ahmed@example.com",

        "prospects.phonePlaceholder":
            "+212 6...",

        "prospects.cityPlaceholder":
            "Example: Casablanca",

        "prospects.comments":
            "Comments",

        "prospects.commentsPlaceholder":
            "Add additional information...",

        "prospects.database":
            "Prospect database",

        "prospects.listTitle":
            "Prospect list",

        "prospects.listDescription":
            "Find all registered prospects here.",

        "prospects.searchLabel":
            "Search prospect",

        "prospects.searchPlaceholder":
            "Name, company or email...",

        "prospects.actions":
            "Actions",

        "prospects.details":
            "Prospect details",

        "prospects.close":
            "Close",

        "prospects.profileLabel":
            "CRM profile",

        "prospects.contactInfo":
            "Contact information",

        "prospects.commercialInfo":
            "Sales follow-up",

        "prospects.qualification":
            "Qualification",

        "prospects.qualificationPending":
            "To be defined",

        "prospects.createdAt":
            "Created on",

        "prospects.updatedAt":
            "Last updated",

        "prospects.aiSection":
            "AI Assistant",

        "prospects.aiSummary":
            "AI summary",

        "prospects.aiSummaryPending":
            "The AI-generated summary will appear here when CRM-06 is connected.",

        "prospects.nextAction":
            "Next action",

        "prospects.nextActionPending":
            "The recommended next action will appear here when CRM-06 is connected.",

        "prospects.editProfile":
            "Edit prospect",


        "prospect.firstName":
            "First name",

        "prospect.firstNameRequired":
            "First name *",

        "prospect.lastName":
            "Last name",

        "prospect.lastNameRequired":
            "Last name *",

        "prospect.name":
            "Prospect",

        "prospect.company":
            "Company",

        "prospect.email":
            "Email",

        "prospect.emailRequired":
            "Email *",

        "prospect.phone":
            "Phone",

        "prospect.city":
            "City",

        "prospect.status":
            "Status",

        "prospect.salesperson":
            "Salesperson",


        "status.new":
            "New",

        "status.contacted":
            "Contacted",

        "status.qualified":
            "Qualified",

        "status.proposalSent":
            "Proposal sent",

        "status.negotiation":
            "Negotiation",

        "status.won":
            "Won",

        "status.lost":
            "Lost",

        "status.archived":
            "Archived",

        "status.active":
            "Active",

        "status.inactive":
            "Inactive",


        "common.all":
            "All",

        "common.unassigned":
            "Unassigned",


        "actions.save":
            "Save prospect",

        "actions.cancel":
            "Cancel",

        "actions.edit":
            "Edit",

        "actions.delete":
            "Delete",

        "actions.view":
            "View",


        "salespeople.title":
            "Salespeople",

        "salespeople.pageDescription":
            "Manage the members of your sales team.",

        "salespeople.addButton":
            "+ Add salesperson",

        "salespeople.addTitle":
            "Add salesperson",

        "salespeople.addDescription":
            "Register a new member of the sales team.",

        "salespeople.lastNameRequired":
            "Last name *",

        "salespeople.lastNamePlaceholder":
            "Last name",

        "salespeople.firstNameRequired":
            "First name *",

        "salespeople.firstNamePlaceholder":
            "First name",

        "salespeople.emailRequired":
            "Professional email *",

        "salespeople.emailPlaceholder":
            "name@company.com",

        "salespeople.phone":
            "Phone",

        "salespeople.phonePlaceholder":
            "+212 6...",

        "salespeople.roleRequired":
            "Role *",

        "salespeople.rolePlaceholder":
            "Choose a role",

        "salespeople.status":
            "Status",

        "salespeople.addSubmit":
            "Add salesperson",

        "salespeople.teamTitle":
            "Sales team",

        "salespeople.teamDescription":
            "View your team members.",

        "salespeople.lastName":
            "Name",

        "salespeople.role":
            "Role",


        "roles.commercial":
            "Salesperson",

        "roles.manager":
            "Manager",

        "roles.administrator":
            "Administrator",


        "admin.title":
            "Administration",

        "admin.description":
            "Manage CRM users, statistics and settings.",

        "admin.statistics.title":
            "General statistics",

        "admin.statistics.description":
            "Global view of CRM activity.",

        "admin.stats.prospects":
            "Total prospects",

        "admin.stats.salespeople":
            "Salespeople",

        "admin.stats.clients":
            "Clients",

        "admin.stats.contracts":
            "Signed contracts",

        "admin.users.title":
            "User management",

        "admin.users.description":
            "Manage users who have access to the CRM.",

        "admin.users.add":
            "+ Add user",

        "admin.users.user":
            "User",

        "admin.users.email":
            "Email",

        "admin.users.role":
            "Role",

        "admin.users.status":
            "Status",

        "admin.users.actions":
            "Actions",

        "admin.settings.title":
            "Settings",

        "admin.settings.description":
            "Configure general CRM settings.",

        "admin.settings.companyName":
            "Company name",

        "admin.settings.companyNamePlaceholder":
            "Your company name",

        "admin.settings.companyEmail":
            "Contact email",

        "admin.settings.companyEmailPlaceholder":
            "contact@company.com",

        "admin.settings.defaultStatus":
            "Default status for a new prospect",

        "admin.settings.reset":
            "Reset",

        "admin.settings.save":
            "Save",


        "footer.description":
            "Solutions tailored to your projects and business needs.",

        "footer.crmDescription":
            "Smart prospect and sales team management.",

        "footer.navigation":
            "Navigation",

        "footer.contact":
            "Contact",

        "footer.email":
            "Email",

        "footer.phone":
            "Phone",

        "footer.country":
            "Morocco",

        "footer.internalSpace":
            "Internal management workspace",

        "footer.copyright":
            "© 2026 Smart CRM. All rights reserved."

    }

};


const statusOrder = [
    "new",
    "contacted",
    "qualified",
    "proposal_sent",
    "negotiation",
    "won",
    "lost",
    "archived"
];


const statusTranslationKeys = {

    new:
        "status.new",

    contacted:
        "status.contacted",

    qualified:
        "status.qualified",

    proposal_sent:
        "status.proposalSent",

    negotiation:
        "status.negotiation",

    won:
        "status.won",

    lost:
        "status.lost",

    archived:
        "status.archived"

};


let currentLanguage =
    localStorage.getItem(
        "smartcrm-language"
    ) || "fr";


const DEMO_ROLE_STORAGE_KEY =
    "smartcrm-demo-role";


const DEMO_ROLES = [
    "commercial",
    "manager",
    "administrator"
];


let currentDemoRole =
    localStorage.getItem(
        DEMO_ROLE_STORAGE_KEY
    ) || "administrator";


if (
    !DEMO_ROLES.includes(
        currentDemoRole
    )
) {

    currentDemoRole =
        "administrator";

}


let prospects =
    JSON.parse(
        localStorage.getItem(
            "smartcrm-prospects"
        )
    ) || [];


let salespeople =
    JSON.parse(
        localStorage.getItem(
            "smartcrm-salespeople"
        )
    ) || [];


let editingProspectId =
    null;


let editingSalespersonId =
    null;



function translate(
    key
) {

    return (
        translations[
            currentLanguage
        ]?.[
            key
        ] ||
        translations.fr?.[
            key
        ] ||
        key
    );

}



function getDemoRoleLabel(
    role
) {

    const roleKey = {

        commercial:
            "roles.commercial",

        manager:
            "roles.manager",

        administrator:
            "roles.administrator"

    }[role];


    return roleKey
        ? translate(
            roleKey
        )
        : role;

}



function getDemoProfile(
    role
) {

    const profiles = {

        commercial: {
            name:
                currentLanguage === "fr"
                    ? "Démo Commercial"
                    : "Sales Demo",
            initials:
                "DC"
        },

        manager: {
            name:
                currentLanguage === "fr"
                    ? "Démo Manager"
                    : "Manager Demo",
            initials:
                "DM"
        },

        administrator: {
            name:
                currentLanguage === "fr"
                    ? "Démo Administrateur"
                    : "Administrator Demo",
            initials:
                "DA"
        }

    };


    return (
        profiles[role] ||
        profiles.administrator
    );

}



function canDemoRoleSeePage(
    role,
    page
) {

    const navigation = {

        commercial: [
            "dashboard.html",
            "prospects.html"
        ],

        manager: [
            "dashboard.html",
            "prospects.html",
            "commerciaux.html"
        ],

        administrator: [
            "dashboard.html",
            "prospects.html",
            "commerciaux.html",
            "administration.html"
        ]

    };


    return (
        navigation[role] ||
        navigation.administrator
    ).includes(
        page
    );

}



function updateDemoNavigation() {

    const links =
        document.querySelectorAll(
            ".crm-sidebar-nav a"
        );


    links.forEach(
        (
            link
        ) => {

            const href =
                link.getAttribute(
                    "href"
                );


            if (
                !href
            ) {

                return;

            }


            const isVisible =
                canDemoRoleSeePage(
                    currentDemoRole,
                    href
                );


            link.hidden =
                !isVisible;


            link.style.display =
                isVisible
                    ? ""
                    : "none";

        }
    );

}



function updateDemoUserCard() {

    const userCard =
        document.querySelector(
            ".crm-user-card"
        );


    if (
        !userCard
    ) {

        return;

    }


    const profile =
        getDemoProfile(
            currentDemoRole
        );


    const avatar =
        userCard.querySelector(
            ".crm-user-avatar"
        );


    const name =
        userCard.querySelector(
            ".crm-user-meta strong"
        );


    const role =
        userCard.querySelector(
            ".crm-user-meta span"
        );


    if (
        avatar
    ) {

        avatar.textContent =
            profile.initials;

    }


    if (
        name
    ) {

        name.textContent =
            profile.name;

    }


    if (
        role
    ) {

        role.textContent =
            getDemoRoleLabel(
                currentDemoRole
            );

    }

}



function createDemoRoleSelector() {

    const userCard =
        document.querySelector(
            ".crm-user-card"
        );


    if (
        !userCard ||
        document.getElementById(
            "demo-role-select"
        )
    ) {

        return;

    }


    const oldMenuButton =
        userCard.querySelector(
            ".crm-user-menu-button"
        );


    if (
        oldMenuButton
    ) {

        oldMenuButton.remove();

    }


    const select =
        document.createElement(
            "select"
        );


    select.id =
        "demo-role-select";


    select.setAttribute(
        "aria-label",
        currentLanguage === "fr"
            ? "Rôle de démonstration"
            : "Demo role"
    );


    Object.assign(
        select.style,
        {
            width: "100%",
            gridColumn: "1 / -1",
            marginTop: "8px",
            padding: "7px 9px",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "9px",
            background: "rgba(255,255,255,0.07)",
            color: "#ffffff",
            fontSize: "10px",
            cursor: "pointer",
            outline: "none"
        }
    );


    DEMO_ROLES.forEach(
        (
            demoRole
        ) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                demoRole;


            option.textContent =
                getDemoRoleLabel(
                    demoRole
                );


            option.style.color =
                "#111827";


            select.appendChild(
                option
            );

        }
    );


    select.value =
        currentDemoRole;


    select.addEventListener(
        "change",
        () => {

            currentDemoRole =
                DEMO_ROLES.includes(
                    select.value
                )
                    ? select.value
                    : "administrator";


            localStorage.setItem(
                DEMO_ROLE_STORAGE_KEY,
                currentDemoRole
            );


            applyDemoRoleUI();

        }
    );


    userCard.appendChild(
        select
    );

}



function refreshDemoRoleSelector() {

    const select =
        document.getElementById(
            "demo-role-select"
        );


    if (
        !select
    ) {

        return;

    }


    select.setAttribute(
        "aria-label",
        currentLanguage === "fr"
            ? "Rôle de démonstration"
            : "Demo role"
    );


    Array.from(
        select.options
    ).forEach(
        (
            option
        ) => {

            option.textContent =
                getDemoRoleLabel(
                    option.value
                );

        }
    );


    select.value =
        currentDemoRole;

}



function applyDemoRoleUI() {

    updateDemoNavigation();

    updateDemoUserCard();

    refreshDemoRoleSelector();

}



function initializeDemoRoles() {

    if (
        !document.querySelector(
            ".crm-app-shell"
        )
    ) {

        return;

    }


    createDemoRoleSelector();

    applyDemoRoleUI();

}



function applyLanguage(
    language
) {

    if (
        !translations[
            language
        ]
    ) {

        language =
            "fr";

    }


    currentLanguage =
        language;


    localStorage.setItem(
        "smartcrm-language",
        language
    );


    document.documentElement.lang =
        language;


    document
        .querySelectorAll(
            "[data-i18n]"
        )
        .forEach(
            (
                element
            ) => {

                const key =
                    element.dataset.i18n;


                element.textContent =
                    translate(
                        key
                    );

            }
        );


    document
        .querySelectorAll(
            "[data-i18n-placeholder]"
        )
        .forEach(
            (
                element
            ) => {

                const key =
                    element.dataset
                        .i18nPlaceholder;


                element.placeholder =
                    translate(
                        key
                    );

            }
        );


    document
        .querySelectorAll(
            "[data-i18n-aria-label]"
        )
        .forEach(
            (
                element
            ) => {

                const key =
                    element.dataset
                        .i18nAriaLabel;


                element.setAttribute(
                    "aria-label",
                    translate(
                        key
                    )
                );

            }
        );


    const frenchButton =
        document.getElementById(
            "lang-fr"
        );


    const englishButton =
        document.getElementById(
            "lang-en"
        );


    if (
        frenchButton
    ) {

        frenchButton.classList.toggle(
            "active",
            language === "fr"
        );

    }


    if (
        englishButton
    ) {

        englishButton.classList.toggle(
            "active",
            language === "en"
        );

    }


    applyDemoRoleUI();

    renderProspects();
    renderDashboard();
    renderSalespeople();
    renderAdmin();

}



function saveProspects() {

    localStorage.setItem(
        "smartcrm-prospects",
        JSON.stringify(
            prospects
        )
    );

}



function saveSalespeople() {

    localStorage.setItem(
        "smartcrm-salespeople",
        JSON.stringify(
            salespeople
        )
    );

}



function generateId() {

    return (
        Date.now().toString(
            36
        ) +
        Math.random()
            .toString(
                36
            )
            .substring(
                2,
                8
            )
    );

}



function normalizeStatus(
    status
) {

    return statusOrder.includes(
        status
    )
        ? status
        : "new";

}



function getStatusLabel(
    status
) {

    const normalizedStatus =
        normalizeStatus(
            status
        );


    return translate(
        statusTranslationKeys[
            normalizedStatus
        ]
    );

}



function getStatusClass(
    status
) {

    return (
        "status-" +
        normalizeStatus(
            status
        ).replaceAll(
            "_",
            "-"
        )
    );

}



function getSalespersonName(
    salespersonId
) {

    if (
        !salespersonId
    ) {

        return translate(
            "common.unassigned"
        );

    }


    const salesperson =
        salespeople.find(
            (
                item
            ) =>
                item.id ===
                salespersonId
        );


    if (
        !salesperson
    ) {

        return translate(
            "common.unassigned"
        );

    }


    return `${salesperson.firstName} ${salesperson.lastName}`;

}



async function sendProspectToAPI(
    prospect
) {

    try {

        const response =
            await fetch(
                API_URL,
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            {

                                first_name:
                                    prospect.firstName,

                                last_name:
                                    prospect.lastName,

                                company:
                                    prospect.company,

                                email:
                                    prospect.email,

                                phone:
                                    prospect.phone,

                                message:
                                    prospect.message

                            }
                        )

                }
            );


        if (
            !response.ok
        ) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        return true;

    } catch (
        error
    ) {

        console.error(
            "Erreur lors de l'envoi du prospect au Backend :",
            error
        );


        return false;

    }

}



function addPublicProspectLocally(
    request
) {

    const prospect = {

        id:
            generateId(),

        firstName:
            request.firstName,

        lastName:
            request.lastName,

        company:
            request.company,

        email:
            request.email,

        phone:
            request.phone,

        city:
            "",

        status:
            "new",

        commercial:
            "",

        comments:
            request.message,

        message:
            request.message,

        createdAt:
            new Date()
                .toISOString()

    };


    prospects.unshift(
        prospect
    );


    saveProspects();

}



function initializeQuoteForm() {

    const form =
        document.getElementById(
            "quote-form"
        );


    if (
        !form
    ) {

        return;

    }


    const successMessage =
        document.getElementById(
            "form-success"
        );


    form.addEventListener(
        "submit",
        async (
            event
        ) => {

            event.preventDefault();


            if (
                !form.checkValidity()
            ) {

                form.reportValidity();

                return;

            }


            const formData =
                new FormData(
                    form
                );


            const request = {

                firstName:
                    (
                        formData.get(
                            "first_name"
                        ) || ""
                    ).trim(),

                lastName:
                    (
                        formData.get(
                            "last_name"
                        ) || ""
                    ).trim(),

                company:
                    (
                        formData.get(
                            "company"
                        ) || ""
                    ).trim(),

                email:
                    (
                        formData.get(
                            "email"
                        ) || ""
                    ).trim(),

                phone:
                    (
                        formData.get(
                            "phone"
                        ) || ""
                    ).trim(),

                message:
                    (
                        formData.get(
                            "message"
                        ) || ""
                    ).trim()

            };


            const sent =
                await sendProspectToAPI(
                    request
                );


            if (
                !sent
            ) {

                addPublicProspectLocally(
                    request
                );

            }


            form.reset();


            if (
                successMessage
            ) {

                successMessage.hidden =
                    false;


                setTimeout(
                    () => {

                        successMessage.hidden =
                            true;

                    },
                    6000
                );

            }

        }
    );

}



function renderProspects() {

    const tableBody =
        document.getElementById(
            "prospects-table-body"
        );


    if (
        !tableBody
    ) {

        return;

    }


    const searchInput =
        document.getElementById(
            "prospect-search"
        );


    const statusFilter =
        document.getElementById(
            "status-filter"
        );


    const searchValue =
        (
            searchInput?.value ||
            ""
        )
            .trim()
            .toLowerCase();


    const statusValue =
        statusFilter?.value ||
        "all";


    const filteredProspects =
        prospects.filter(
            (
                prospect
            ) => {

                const searchContent =
                    [
                        prospect.firstName,
                        prospect.lastName,
                        prospect.company,
                        prospect.email
                    ]
                        .join(
                            " "
                        )
                        .toLowerCase();


                const matchesSearch =
                    !searchValue ||
                    searchContent.includes(
                        searchValue
                    );


                const matchesStatus =
                    statusValue ===
                        "all" ||
                    normalizeStatus(
                        prospect.status
                    ) ===
                        statusValue;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );


    tableBody.innerHTML =
        "";


    filteredProspects.forEach(
        (
            prospect
        ) => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    <strong>
                        ${escapeHTML(
                            prospect.firstName
                        )}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(
                        prospect.lastName
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        prospect.company ||
                        "-"
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        prospect.email
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        prospect.phone ||
                        "-"
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        prospect.city ||
                        "-"
                    )}
                </td>

                <td>

                    <span
                        class="status ${getStatusClass(
                            prospect.status
                        )}"
                    >
                        ${getStatusLabel(
                            prospect.status
                        )}
                    </span>

                </td>

                <td>
                    ${escapeHTML(
                        getSalespersonName(
                            prospect.commercial
                        )
                    )}
                </td>

                <td>

                    <div class="table-actions">

                        <button
                            type="button"
                            class="view-prospect"
                            data-action="view"
                            data-id="${prospect.id}"
                        >
                            ${translate(
                                "actions.view"
                            )}
                        </button>

                        <button
                            type="button"
                            data-action="edit"
                            data-id="${prospect.id}"
                        >
                            ${translate(
                                "actions.edit"
                            )}
                        </button>

                        <button
                            type="button"
                            class="delete-prospect"
                            data-action="delete"
                            data-id="${prospect.id}"
                        >
                            ${translate(
                                "actions.delete"
                            )}
                        </button>

                    </div>

                </td>

            `;


            tableBody.appendChild(
                row
            );

        }
    );

}



function initializeProspectForm() {

    const form =
        document.getElementById(
            "prospect-form"
        );


    if (
        !form
    ) {

        return;

    }


    const showFormButton =
        document.getElementById(
            "show-prospect-form"
        );


    const formSection =
        document.getElementById(
            "prospect-form-section"
        );


    showFormButton?.addEventListener(
        "click",
        () => {

            formSection?.scrollIntoView(
                {

                    behavior:
                        "smooth",

                    block:
                        "start"

                }
            );

        }
    );


    form.addEventListener(
        "submit",
        (
            event
        ) => {

            event.preventDefault();


            if (
                !form.checkValidity()
            ) {

                form.reportValidity();

                return;

            }


            const formData =
                new FormData(
                    form
                );


            const prospect = {

                id:
                    editingProspectId ||
                    generateId(),

                firstName:
                    (
                        formData.get(
                            "first_name"
                        ) || ""
                    ).trim(),

                lastName:
                    (
                        formData.get(
                            "last_name"
                        ) || ""
                    ).trim(),

                company:
                    (
                        formData.get(
                            "company"
                        ) || ""
                    ).trim(),

                email:
                    (
                        formData.get(
                            "email"
                        ) || ""
                    ).trim(),

                phone:
                    (
                        formData.get(
                            "phone"
                        ) || ""
                    ).trim(),

                city:
                    (
                        formData.get(
                            "city"
                        ) || ""
                    ).trim(),

                status:
                    normalizeStatus(
                        formData.get(
                            "status"
                        )
                    ),

                commercial:
                    formData.get(
                        "commercial"
                    ) || "",

                comments:
                    (
                        formData.get(
                            "comments"
                        ) || ""
                    ).trim(),

                createdAt:
                    new Date()
                        .toISOString()

            };


            if (
                editingProspectId
            ) {

                const index =
                    prospects.findIndex(
                        (
                            item
                        ) =>
                            item.id ===
                            editingProspectId
                    );


                if (
                    index !== -1
                ) {

                    prospect.createdAt =
                        prospects[
                            index
                        ].createdAt;


                    prospects[
                        index
                    ] =
                        prospect;

                }

            } else {

                prospects.unshift(
                    prospect
                );

            }


            editingProspectId =
                null;


            saveProspects();

            form.reset();

            renderProspects();
            renderDashboard();

        }
    );


    document
        .getElementById(
            "prospect-search"
        )
        ?.addEventListener(
            "input",
            renderProspects
        );


    document
        .getElementById(
            "status-filter"
        )
        ?.addEventListener(
            "change",
            renderProspects
        );


    document
        .getElementById(
            "prospects-table-body"
        )
        ?.addEventListener(
            "click",
            (
                event
            ) => {

                const button =
                    event.target.closest(
                        "button[data-action]"
                    );


                if (
                    !button
                ) {

                    return;

                }


                const id =
                    button.dataset.id;


                const action =
                    button.dataset.action;


                if (
                    action === "view"
                ) {

                    openProspectModal(
                        id
                    );

                }


                if (
                    action === "edit"
                ) {

                    editProspect(
                        id
                    );

                }


                if (
                    action === "delete"
                ) {

                    deleteProspect(
                        id
                    );

                }

            }
        );

}



function editProspect(
    id
) {

    const prospect =
        prospects.find(
            (
                item
            ) =>
                item.id ===
                id
        );


    if (
        !prospect
    ) {

        return;

    }


    editingProspectId =
        id;


    setValue(
        "prospect-first-name",
        prospect.firstName
    );


    setValue(
        "prospect-last-name",
        prospect.lastName
    );


    setValue(
        "prospect-company",
        prospect.company
    );


    setValue(
        "prospect-email",
        prospect.email
    );


    setValue(
        "prospect-phone",
        prospect.phone
    );


    setValue(
        "prospect-city",
        prospect.city
    );


    setValue(
        "prospect-status",
        normalizeStatus(
            prospect.status
        )
    );


    setValue(
        "prospect-commercial",
        prospect.commercial
    );


    setValue(
        "prospect-comments",
        prospect.comments
    );


    document
        .getElementById(
            "prospect-form-section"
        )
        ?.scrollIntoView(
            {

                behavior:
                    "smooth",

                block:
                    "start"

            }
        );

}



function deleteProspect(
    id
) {

    prospects =
        prospects.filter(
            (
                prospect
            ) =>
                prospect.id !==
                id
        );


    saveProspects();

    renderProspects();
    renderDashboard();

}



function openProspectModal(
    id
) {

    const prospect =
        prospects.find(
            (
                item
            ) =>
                item.id ===
                id
        );


    const modal =
        document.getElementById(
            "prospect-modal"
        );


    const details =
        document.getElementById(
            "prospect-details"
        );


    if (
        !prospect ||
        !modal ||
        !details
    ) {

        return;

    }


    const fullName =
        `${prospect.firstName || ""} ${prospect.lastName || ""}`
            .trim() ||
        "-";


    const initials =
        [
            prospect.firstName,
            prospect.lastName
        ]
            .filter(Boolean)
            .map(
                value =>
                    String(value)
                        .trim()
                        .charAt(0)
                        .toUpperCase()
            )
            .join("")
            .slice(0, 2) ||
        "PR";


    const company =
        prospect.company ||
        "-";


    const email =
        prospect.email ||
        "-";


    const phone =
        prospect.phone ||
        "-";


    const city =
        prospect.city ||
        "-";


    const salesperson =
        getSalespersonName(
            prospect.commercial
        ) ||
        translate(
            "common.unassigned"
        );


    const comments =
        prospect.comments ||
        "-";


    const status =
        normalizeStatus(
            prospect.status
        );


    const qualification =
        prospect.qualification
            ? String(
                prospect.qualification
            )
            : translate(
                "prospects.qualificationPending"
            );


    const createdAt =
        formatProspectDate(
            prospect.createdAt
        );


    const updatedAt =
        formatProspectDate(
            prospect.updatedAt ||
            prospect.createdAt
        );


    details.innerHTML = `

        <div class="prospect-profile">

            <div class="prospect-profile-main">

                <section class="prospect-profile-identity">

                    <span
                        class="prospect-profile-avatar"
                        aria-hidden="true"
                    >
                        ${escapeHTML(
                            initials
                        )}
                    </span>

                    <div class="prospect-profile-identity-copy">

                        <h3>
                            ${escapeHTML(
                                fullName
                            )}
                        </h3>

                        <p>
                            ${escapeHTML(
                                company
                            )}
                        </p>

                    </div>

                    <div class="prospect-profile-status">

                        <span
                            class="status ${getStatusClass(
                                status
                            )}"
                        >
                            ${escapeHTML(
                                getStatusLabel(
                                    status
                                )
                            )}
                        </span>

                    </div>

                </section>

                <section class="prospect-profile-card">

                    <div class="prospect-profile-card-header">

                        <h4>
                            ${escapeHTML(
                                translate(
                                    "prospects.contactInfo"
                                )
                            )}
                        </h4>

                    </div>

                    <div class="prospect-profile-grid">

                        <div class="prospect-profile-field">

                            <span>
                                ${escapeHTML(
                                    translate(
                                        "prospect.email"
                                    )
                                )}
                            </span>

                            <a
                                href="mailto:${escapeHTML(
                                    prospect.email || ""
                                )}"
                            >
                                ${escapeHTML(
                                    email
                                )}
                            </a>

                        </div>

                        <div class="prospect-profile-field">

                            <span>
                                ${escapeHTML(
                                    translate(
                                        "prospect.phone"
                                    )
                                )}
                            </span>

                            <a
                                href="${
                                    prospect.phone
                                        ? `tel:${escapeHTML(
                                            prospect.phone
                                        )}`
                                        : "#"
                                }"
                            >
                                ${escapeHTML(
                                    phone
                                )}
                            </a>

                        </div>

                        <div class="prospect-profile-field">

                            <span>
                                ${escapeHTML(
                                    translate(
                                        "prospect.company"
                                    )
                                )}
                            </span>

                            <strong>
                                ${escapeHTML(
                                    company
                                )}
                            </strong>

                        </div>

                        <div class="prospect-profile-field">

                            <span>
                                ${escapeHTML(
                                    translate(
                                        "prospect.city"
                                    )
                                )}
                            </span>

                            <strong>
                                ${escapeHTML(
                                    city
                                )}
                            </strong>

                        </div>

                    </div>

                </section>

                <section class="prospect-profile-card">

                    <div class="prospect-profile-card-header">

                        <h4>
                            ${escapeHTML(
                                translate(
                                    "prospects.comments"
                                )
                            )}
                        </h4>

                    </div>

                    <p class="prospect-profile-note">
                        ${escapeHTML(
                            comments
                        )}
                    </p>

                </section>

            </div>

            <aside class="prospect-profile-side">

                <section class="prospect-profile-card">

                    <div class="prospect-profile-card-header">

                        <h4>
                            ${escapeHTML(
                                translate(
                                    "prospects.commercialInfo"
                                )
                            )}
                        </h4>

                    </div>

                    <div class="prospect-profile-grid">

                        <div class="prospect-profile-field full">

                            <span>
                                ${escapeHTML(
                                    translate(
                                        "prospect.salesperson"
                                    )
                                )}
                            </span>

                            <strong>
                                ${escapeHTML(
                                    salesperson
                                )}
                            </strong>

                        </div>

                        <div class="prospect-profile-field full">

                            <span>
                                ${escapeHTML(
                                    translate(
                                        "prospects.qualification"
                                    )
                                )}
                            </span>

                            <span class="qualification-badge">
                                ${escapeHTML(
                                    qualification
                                )}
                            </span>

                        </div>

                        <div class="prospect-profile-field">

                            <span>
                                ${escapeHTML(
                                    translate(
                                        "prospects.createdAt"
                                    )
                                )}
                            </span>

                            <strong>
                                ${escapeHTML(
                                    createdAt
                                )}
                            </strong>

                        </div>

                        <div class="prospect-profile-field">

                            <span>
                                ${escapeHTML(
                                    translate(
                                        "prospects.updatedAt"
                                    )
                                )}
                            </span>

                            <strong>
                                ${escapeHTML(
                                    updatedAt
                                )}
                            </strong>

                        </div>

                    </div>

                </section>

                <section class="prospect-profile-card prospect-profile-ai">

                    <div class="prospect-profile-card-header">

                        <h4>
                            ${escapeHTML(
                                translate(
                                    "prospects.aiSection"
                                )
                            )}
                        </h4>

                    </div>

                    <p class="prospect-profile-placeholder">

                        <strong>
                            ${escapeHTML(
                                translate(
                                    "prospects.aiSummary"
                                )
                            )}
                        </strong>

                        <br>

                        ${escapeHTML(
                            prospect.aiSummary ||
                            translate(
                                "prospects.aiSummaryPending"
                            )
                        )}

                    </p>

                    <br>

                    <p class="prospect-profile-placeholder">

                        <strong>
                            ${escapeHTML(
                                translate(
                                    "prospects.nextAction"
                                )
                            )}
                        </strong>

                        <br>

                        ${escapeHTML(
                            prospect.nextAction ||
                            translate(
                                "prospects.nextActionPending"
                            )
                        )}

                    </p>

                </section>

                <div class="prospect-profile-actions">

                    <button
                        type="button"
                        class="btn-primary"
                        id="prospect-profile-edit"
                    >
                        ${escapeHTML(
                            translate(
                                "prospects.editProfile"
                            )
                        )}
                    </button>

                </div>

            </aside>

        </div>

    `;


    document
        .getElementById(
            "prospect-profile-edit"
        )
        ?.addEventListener(
            "click",
            () => {

                closeProspectModal();

                editProspect(
                    id
                );

            }
        );


    modal.classList.add(
        "active"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );

}



function closeProspectModal() {

    const modal =
        document.getElementById(
            "prospect-modal"
        );


    if (
        !modal
    ) {

        return;

    }


    modal.classList.remove(
        "active"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}



function initializeProspectModal() {

    const modal =
        document.getElementById(
            "prospect-modal"
        );


    if (
        !modal
    ) {

        return;

    }


    document
        .getElementById(
            "modal-close"
        )
        ?.addEventListener(
            "click",
            closeProspectModal
        );


    modal.addEventListener(
        "click",
        (
            event
        ) => {

            if (
                event.target ===
                modal
            ) {

                closeProspectModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        (
            event
        ) => {

            if (
                event.key ===
                    "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeProspectModal();

            }

        }
    );

}



function renderDashboard() {

    const recentTable =
        document.getElementById(
            "dashboard-recent-prospects"
        );


    const chart =
        document.getElementById(
            "lead-status-chart"
        );


    const totalElement =
        document.getElementById(
            "pipeline-total-leads"
        );


    if (
        totalElement
    ) {

        totalElement.textContent =
            prospects.length;

    }


    if (
        chart
    ) {

        chart.innerHTML =
            "";


        if (
            prospects.length ===
            0
        ) {

            chart.innerHTML = `

                <p class="lead-status-empty">

                    ${
                        currentLanguage ===
                        "fr"
                            ? "Aucun lead enregistré."
                            : "No leads registered."
                    }

                </p>

            `;

        } else {

            statusOrder.forEach(
                (
                    status
                ) => {

                    const count =
                        prospects.filter(
                            (
                                prospect
                            ) =>
                                normalizeStatus(
                                    prospect.status
                                ) ===
                                status
                        ).length;


                    const percentage =
                        prospects.length
                            ? Math.round(
                                  (
                                      count /
                                      prospects.length
                                  ) *
                                      100
                              )
                            : 0;


                    const row =
                        document.createElement(
                            "div"
                        );


                    row.className =
                        "lead-status-row";


                    const cssStatus =
                        status.replaceAll(
                            "_",
                            "-"
                        );


                    row.innerHTML = `

                        <div class="lead-status-meta">

                            <div class="lead-status-name">

                                <span
                                    class="lead-status-dot status-${cssStatus}"
                                ></span>

                                <span>
                                    ${getStatusLabel(
                                        status
                                    )}
                                </span>

                            </div>

                            <div class="lead-status-values">

                                <strong>
                                    ${count}
                                </strong>

                                <span>
                                    ${percentage}%
                                </span>

                            </div>

                        </div>

                        <div class="lead-status-track">

                            <span
                                class="lead-status-fill status-${cssStatus}"
                                style="--status-width: ${percentage}%"
                            ></span>

                        </div>

                    `;


                    chart.appendChild(
                        row
                    );

                }
            );

        }

    }


    if (
        !recentTable
    ) {

        return;

    }


    recentTable.innerHTML =
        "";


    prospects
        .slice(
            0,
            5
        )
        .forEach(
            (
                prospect
            ) => {

                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `

                    <td>
                        <strong>
                            ${escapeHTML(
                                prospect.firstName
                            )}
                            ${escapeHTML(
                                prospect.lastName
                            )}
                        </strong>
                    </td>

                    <td>
                        ${escapeHTML(
                            prospect.company ||
                            "-"
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            prospect.city ||
                            "-"
                        )}
                    </td>

                    <td>

                        <span
                            class="status ${getStatusClass(
                                prospect.status
                            )}"
                        >
                            ${getStatusLabel(
                                prospect.status
                            )}
                        </span>

                    </td>

                    <td>
                        ${escapeHTML(
                            getSalespersonName(
                                prospect.commercial
                            )
                        )}
                    </td>

                `;


                recentTable.appendChild(
                    row
                );

            }
        );

}



function initializeSalespersonForm() {

    const form =
        document.getElementById(
            "salesperson-form"
        );


    if (
        !form
    ) {

        return;

    }


    document
        .getElementById(
            "show-salesperson-form"
        )
        ?.addEventListener(
            "click",
            () => {

                document
                    .getElementById(
                        "salesperson-form-section"
                    )
                    ?.scrollIntoView(
                        {

                            behavior:
                                "smooth",

                            block:
                                "start"

                        }
                    );

            }
        );


    document
        .getElementById(
            "salesperson-cancel"
        )
        ?.addEventListener(
            "click",
            () => {

                editingSalespersonId =
                    null;


                form.reset();

            }
        );


    form.addEventListener(
        "submit",
        (
            event
        ) => {

            event.preventDefault();


            if (
                !form.checkValidity()
            ) {

                form.reportValidity();

                return;

            }


            const formData =
                new FormData(
                    form
                );


            const salesperson = {

                id:
                    editingSalespersonId ||
                    generateId(),

                lastName:
                    (
                        formData.get(
                            "lastname"
                        ) || ""
                    ).trim(),

                firstName:
                    (
                        formData.get(
                            "firstname"
                        ) || ""
                    ).trim(),

                email:
                    (
                        formData.get(
                            "email"
                        ) || ""
                    ).trim(),

                phone:
                    (
                        formData.get(
                            "phone"
                        ) || ""
                    ).trim(),

                role:
                    formData.get(
                        "role"
                    ) || "commercial",

                status:
                    formData.get(
                        "status"
                    ) || "active"

            };


            if (
                editingSalespersonId
            ) {

                const index =
                    salespeople.findIndex(
                        (
                            item
                        ) =>
                            item.id ===
                            editingSalespersonId
                    );


                if (
                    index !== -1
                ) {

                    salespeople[
                        index
                    ] =
                        salesperson;

                }

            } else {

                salespeople.push(
                    salesperson
                );

            }


            editingSalespersonId =
                null;


            saveSalespeople();

            form.reset();

            renderSalespeople();
            populateSalespeopleSelect();
            renderProspects();
            renderDashboard();
            renderAdmin();

        }
    );

}



function renderSalespeople() {

    const tableBody =
        document.getElementById(
            "salespeople-table-body"
        );


    if (
        !tableBody
    ) {

        return;

    }


    tableBody.innerHTML =
        "";


    salespeople.forEach(
        (
            salesperson
        ) => {

            const row =
                document.createElement(
                    "tr"
                );


            const statusLabel =
                salesperson.status ===
                "inactive"
                    ? translate(
                          "status.inactive"
                      )
                    : translate(
                          "status.active"
                      );


            const statusClass =
                salesperson.status ===
                "inactive"
                    ? "status-inactive"
                    : "status-active";


            const roleLabel =
                translate(
                    `roles.${salesperson.role}`
                );


            row.innerHTML = `

                <td>
                    <strong>
                        ${escapeHTML(
                            salesperson.firstName
                        )}
                        ${escapeHTML(
                            salesperson.lastName
                        )}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(
                        salesperson.email
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        salesperson.phone ||
                        "-"
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        roleLabel
                    )}
                </td>

                <td>

                    <span
                        class="status ${statusClass}"
                    >
                        ${statusLabel}
                    </span>

                </td>

                <td>

                    <div class="table-actions">

                        <button
                            type="button"
                            data-salesperson-action="edit"
                            data-id="${salesperson.id}"
                        >
                            ${translate(
                                "actions.edit"
                            )}
                        </button>

                        <button
                            type="button"
                            class="action-delete"
                            data-salesperson-action="delete"
                            data-id="${salesperson.id}"
                        >
                            ${translate(
                                "actions.delete"
                            )}
                        </button>

                    </div>

                </td>

            `;


            tableBody.appendChild(
                row
            );

        }
    );

}



function initializeSalespeopleActions() {

    document
        .getElementById(
            "salespeople-table-body"
        )
        ?.addEventListener(
            "click",
            (
                event
            ) => {

                const button =
                    event.target.closest(
                        "button[data-salesperson-action]"
                    );


                if (
                    !button
                ) {

                    return;

                }


                const id =
                    button.dataset.id;


                const action =
                    button.dataset
                        .salespersonAction;


                if (
                    action === "edit"
                ) {

                    const salesperson =
                        salespeople.find(
                            (
                                item
                            ) =>
                                item.id ===
                                id
                        );


                    if (
                        !salesperson
                    ) {

                        return;

                    }


                    editingSalespersonId =
                        id;


                    setValue(
                        "salesperson-lastname",
                        salesperson.lastName
                    );


                    setValue(
                        "salesperson-firstname",
                        salesperson.firstName
                    );


                    setValue(
                        "salesperson-email",
                        salesperson.email
                    );


                    setValue(
                        "salesperson-phone",
                        salesperson.phone
                    );


                    setValue(
                        "salesperson-role",
                        salesperson.role
                    );


                    setValue(
                        "salesperson-status",
                        salesperson.status
                    );


                    document
                        .getElementById(
                            "salesperson-form-section"
                        )
                        ?.scrollIntoView(
                            {

                                behavior:
                                    "smooth",

                                block:
                                    "start"

                            }
                        );

                }


                if (
                    action === "delete"
                ) {

                    salespeople =
                        salespeople.filter(
                            (
                                item
                            ) =>
                                item.id !==
                                id
                        );


                    prospects =
                        prospects.map(
                            (
                                prospect
                            ) => {

                                if (
                                    prospect.commercial ===
                                    id
                                ) {

                                    return {

                                        ...prospect,

                                        commercial:
                                            ""

                                    };

                                }


                                return prospect;

                            }
                        );


                    saveSalespeople();
                    saveProspects();

                    renderSalespeople();
                    populateSalespeopleSelect();
                    renderProspects();
                    renderDashboard();
                    renderAdmin();

                }

            }
        );

}



function populateSalespeopleSelect() {

    const select =
        document.getElementById(
            "prospect-commercial"
        );


    if (
        !select
    ) {

        return;

    }


    const currentValue =
        select.value;


    select.innerHTML = `

        <option value="">
            ${translate(
                "common.unassigned"
            )}
        </option>

    `;


    salespeople
        .filter(
            (
                salesperson
            ) =>
                salesperson.status !==
                "inactive"
        )
        .forEach(
            (
                salesperson
            ) => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    salesperson.id;


                option.textContent =
                    `${salesperson.firstName} ${salesperson.lastName}`;


                select.appendChild(
                    option
                );

            }
        );


    if (
        [
            ...select.options
        ].some(
            (
                option
            ) =>
                option.value ===
                currentValue
        )
    ) {

        select.value =
            currentValue;

    }

}



function renderAdmin() {

    const totalProspects =
        document.getElementById(
            "admin-total-prospects"
        );


    const totalSalespeople =
        document.getElementById(
            "admin-total-salespeople"
        );


    const totalClients =
        document.getElementById(
            "admin-total-clients"
        );


    const totalContracts =
        document.getElementById(
            "admin-total-contracts"
        );


    if (
        totalProspects
    ) {

        totalProspects.textContent =
            prospects.length;

    }


    if (
        totalSalespeople
    ) {

        totalSalespeople.textContent =
            salespeople.length;

    }


    if (
        totalClients
    ) {

        totalClients.textContent =
            prospects.filter(
                (
                    prospect
                ) =>
                    normalizeStatus(
                        prospect.status
                    ) ===
                    "won"
            ).length;

    }


    if (
        totalContracts
    ) {

        totalContracts.textContent =
            prospects.filter(
                (
                    prospect
                ) =>
                    normalizeStatus(
                        prospect.status
                    ) ===
                    "won"
            ).length;

    }


    const usersTable =
        document.getElementById(
            "admin-users-table-body"
        );


    if (
        !usersTable
    ) {

        return;

    }


    usersTable.innerHTML =
        "";


    salespeople.forEach(
        (
            salesperson
        ) => {

            const row =
                document.createElement(
                    "tr"
                );


            const statusLabel =
                salesperson.status ===
                "inactive"
                    ? translate(
                          "status.inactive"
                      )
                    : translate(
                          "status.active"
                      );


            const statusClass =
                salesperson.status ===
                "inactive"
                    ? "status-inactive"
                    : "status-active";


            row.innerHTML = `

                <td>

                    <strong>
                        ${escapeHTML(
                            salesperson.firstName
                        )}
                        ${escapeHTML(
                            salesperson.lastName
                        )}
                    </strong>

                </td>

                <td>
                    ${escapeHTML(
                        salesperson.email
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        translate(
                            `roles.${salesperson.role}`
                        )
                    )}
                </td>

                <td>

                    <span
                        class="status ${statusClass}"
                    >
                        ${statusLabel}
                    </span>

                </td>

                <td>

                    <div class="table-actions">

                        <button
                            type="button"
                            data-admin-user-action="edit"
                            data-id="${salesperson.id}"
                        >
                            ${translate(
                                "actions.edit"
                            )}
                        </button>

                    </div>

                </td>

            `;


            usersTable.appendChild(
                row
            );

        }
    );

}



function initializeAdmin() {

    document
        .getElementById(
            "add-user-button"
        )
        ?.addEventListener(
            "click",
            () => {

                window.location.href =
                    "commerciaux.html";

            }
        );


    document
        .getElementById(
            "admin-users-table-body"
        )
        ?.addEventListener(
            "click",
            (
                event
            ) => {

                const button =
                    event.target.closest(
                        "button[data-admin-user-action]"
                    );


                if (
                    !button
                ) {

                    return;

                }


                window.location.href =
                    "commerciaux.html";

            }
        );


    document
        .getElementById(
            "settings-form"
        )
        ?.addEventListener(
            "submit",
            (
                event
            ) => {

                event.preventDefault();

            }
        );

}



function initializeLogin() {

    const form =
        document.getElementById(
            "login-form"
        );


    if (
        !form
    ) {

        return;

    }


    const errorElement =
        document.getElementById(
            "login-error"
        );


    form.addEventListener(
        "submit",
        (
            event
        ) => {

            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "email"
                    )
                    ?.value.trim();


            const password =
                document
                    .getElementById(
                        "password"
                    )
                    ?.value;


            if (
                !email ||
                !password
            ) {

                if (
                    errorElement
                ) {

                    errorElement.textContent =
                        currentLanguage ===
                        "fr"
                            ? "Veuillez renseigner votre e-mail et votre mot de passe."
                            : "Please enter your email and password.";


                    errorElement.hidden =
                        false;

                }


                return;

            }


            if (
                errorElement
            ) {

                errorElement.hidden =
                    true;

            }


            window.location.href =
                "dashboard.html";

        }
    );

}



function initializeLanguageButtons() {

    document
        .getElementById(
            "lang-fr"
        )
        ?.addEventListener(
            "click",
            () => {

                applyLanguage(
                    "fr"
                );

            }
        );


    document
        .getElementById(
            "lang-en"
        )
        ?.addEventListener(
            "click",
            () => {

                applyLanguage(
                    "en"
                );

            }
        );

}



function formatProspectDate(
    value
) {

    if (
        !value
    ) {

        return "-";

    }


    const date =
        new Date(
            value
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "-";

    }


    return new Intl.DateTimeFormat(
        currentLanguage === "en"
            ? "en-GB"
            : "fr-FR",
        {
            dateStyle:
                "medium"
        }
    ).format(
        date
    );

}



function createDetailItem(
    label,
    value,
    fullWidth = false
) {

    return `

        <div
            class="prospect-detail-item ${
                fullWidth
                    ? "prospect-detail-full"
                    : ""
            }"
        >

            <span class="prospect-detail-label">
                ${escapeHTML(
                    label
                )}
            </span>

            <span class="prospect-detail-value">
                ${escapeHTML(
                    value
                )}
            </span>

        </div>

    `;

}



function setValue(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (
        element
    ) {

        element.value =
            value || "";

    }

}



function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}



document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeLanguageButtons();

        initializeQuoteForm();

        initializeProspectForm();

        initializeProspectModal();

        initializeSalespersonForm();

        initializeSalespeopleActions();

        initializeAdmin();

        initializeLogin();

        initializeDemoRoles();

        populateSalespeopleSelect();

        applyLanguage(
            currentLanguage
        );

    }
);