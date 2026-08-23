const API_URL = "https://xxxxxxxxxxx";

const LANGUAGE_STORAGE_KEY = "smartCRM_language";
const CRM_STORAGE_KEY = "smartCRM_prospects";
const SALESPEOPLE_STORAGE_KEY = "smartCRM_salespeople";
const SETTINGS_STORAGE_KEY = "smartCRM_settings";

let currentLanguage =
    localStorage.getItem(LANGUAGE_STORAGE_KEY) || "fr";

let prospectBeingEditedId = null;
let salespersonBeingEditedId = null;

const quoteForm =
    document.getElementById("quote-form");

const successMessage =
    document.getElementById("form-success");

const prospectsTableBody =
    document.getElementById("prospects-table-body");

const prospectSearch =
    document.getElementById("prospect-search");

const statusFilter =
    document.getElementById("status-filter");

const prospectForm =
    document.getElementById("prospect-form");

const prospectSubmit =
    document.getElementById("prospect-submit");

const prospectFormSection =
    document.getElementById("prospect-form-section");

const showProspectFormButton =
    document.getElementById("show-prospect-form");

const prospectModal =
    document.getElementById("prospect-modal");

const prospectDetails =
    document.getElementById("prospect-details");

const modalClose =
    document.getElementById("modal-close");

const dashboardRecentProspects =
    document.getElementById("dashboard-recent-prospects");

const leadStatusChart =
    document.getElementById("lead-status-chart");

const pipelineTotalLeads =
    document.getElementById("pipeline-total-leads");

const frenchLanguageButton =
    document.getElementById("lang-fr");

const englishLanguageButton =
    document.getElementById("lang-en");

const salespersonForm =
    document.getElementById("salesperson-form");

const salespersonSubmit =
    document.getElementById("salesperson-submit");

const salespersonCancel =
    document.getElementById("salesperson-cancel");

const salespersonFormSection =
    document.getElementById("salesperson-form-section");

const showSalespersonFormButton =
    document.getElementById("show-salesperson-form");

const salespeopleTableBody =
    document.getElementById("salespeople-table-body");

const adminUsersTableBody =
    document.getElementById("admin-users-table-body");

const settingsForm =
    document.getElementById("settings-form");

const loginForm =
    document.getElementById("login-form");

const loginError =
    document.getElementById("login-error");

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

        "contact.preferenceTitle":
            "Comment souhaitez-vous être contacté ?",

        "contact.preferenceEmail":
            "Par e-mail",

        "contact.preferencePhone":
            "Par téléphone",

        "contact.preferenceAny":
            "Peu importe",

        "contact.consent":
            "J'accepte que mes informations soient utilisées afin de traiter ma demande.",

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

        "form.service":
            "Service recherché *",

        "form.servicePlaceholder":
            "Sélectionnez un service",

        "form.other":
            "Autre",

        "form.budget":
            "Budget estimatif",

        "form.budgetPlaceholder":
            "Sélectionnez une estimation",

        "form.budgetUnder10000":
            "Moins de 10 000 MAD",

        "form.budget10000To30000":
            "10 000 – 30 000 MAD",

        "form.budget30000To50000":
            "30 000 – 50 000 MAD",

        "form.budgetOver50000":
            "Plus de 50 000 MAD",

        "form.budgetUnknown":
            "Je ne sais pas encore",

        "form.deadline":
            "Délai souhaité",

        "form.deadlinePlaceholder":
            "Sélectionnez un délai",

        "form.deadlineUrgent":
            "Dès que possible",

        "form.deadlineOneMonth":
            "Dans le mois",

        "form.deadlineOneToThreeMonths":
            "Dans 1 à 3 mois",

        "form.deadlineThreeToSixMonths":
            "Dans 3 à 6 mois",

        "form.deadlineFlexible":
            "Je suis flexible",

        "form.message":
            "Décrivez votre projet *",

        "form.messagePlaceholder":
            "Décrivez votre besoin, vos objectifs et les fonctionnalités souhaitées...",

        "form.submit":
            "Envoyer ma demande",

        "form.success":
            "Votre demande a été envoyée avec succès.",

        "footer.description":
            "Des solutions adaptées à vos projets et aux besoins de votre entreprise.",

        "footer.crmDescription":
            "Gestion intelligente des prospects et des équipes commerciales.",

        "footer.internalSpace":
            "Espace de gestion interne",

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

        "footer.copyright":
            "© 2026 Smart CRM. Tous droits réservés.",

        "login.subtitle":
            "Connectez-vous pour accéder à votre espace.",

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

        "login.demoMessage":
            "Authentification backend non connectée. Accès au dashboard en mode démonstration.",

        "actions.view":
            "Voir",

        "actions.edit":
            "Modifier",

        "actions.delete":
            "Supprimer",

        "actions.save":
            "Enregistrer le prospect",

        "actions.saveChanges":
            "Enregistrer les modifications",

        "actions.cancel":
            "Annuler",

        "actions.disable":
            "Désactiver",

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

        "roles.commercial":
            "Commercial",

        "roles.manager":
            "Manager",

        "roles.administrator":
            "Administrateur",

        "common.all":
            "Tous",

        "common.unassigned":
            "Non assigné",

        "prospect.name":
            "Prospect",

        "prospect.firstName":
            "Prénom",

        "prospect.firstNameRequired":
            "Prénom *",

        "prospect.lastName":
            "Nom",

        "prospect.lastNameRequired":
            "Nom *",

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
            "Commercial responsable",

        "prospect.comments":
            "Commentaires",

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

        "confirm.delete":
            "Voulez-vous vraiment supprimer {name} ?",

        "dashboard.mainStatistics":
            "Statistiques principales",

        "dashboard.pipelineLabel":
            "Pipeline commercial",

        "dashboard.pipelineTitle":
            "Répartition des leads par statut",

        "dashboard.pipelineDescription":
            "Visualisez en un coup d'œil la progression de vos leads dans le cycle commercial.",

        "dashboard.pipelineTotal":
            "Total leads",

        "dashboard.pipelineEmpty":
            "Aucun lead enregistré pour le moment.",

        "dashboard.overview":
            "Vue d'ensemble",

        "dashboard.welcome":
            "Bienvenue dans votre espace de gestion des prospects.",

        "dashboard.newProspect":
            "+ Nouveau prospect",

        "dashboard.totalProspects":
            "Total prospects",

        "dashboard.registeredProspects":
            "Prospects enregistrés",

        "dashboard.newProspects":
            "Nouveaux prospects",

        "dashboard.thisWeek":
            "Cette semaine",

        "dashboard.inProgress":
            "Prospects actifs",

        "dashboard.toProcess":
            "À traiter",

        "dashboard.converted":
            "Opportunités gagnées",

        "dashboard.thisMonth":
            "Ce mois-ci",

        "dashboard.recentActivity":
            "Activité récente",

        "dashboard.latestProspects":
            "Derniers prospects",

        "dashboard.recentlyAdded":
            "Les prospects récemment ajoutés au CRM.",

        "dashboard.viewAll":
            "Voir tous les prospects",

        "dashboard.noProspects":
            "Aucun prospect enregistré.",

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

        "salespeople.firstNameRequired":
            "Prénom *",

        "salespeople.emailRequired":
            "E-mail professionnel *",

        "salespeople.lastNamePlaceholder":
            "Nom",

        "salespeople.firstNamePlaceholder":
            "Prénom",

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

        "salespeople.saveChanges":
            "Enregistrer les modifications",

        "salespeople.teamTitle":
            "Équipe commerciale",

        "salespeople.teamDescription":
            "Consultez les membres de votre équipe.",

        "salespeople.lastName":
            "Nom",

        "salespeople.role":
            "Rôle",

        "salespeople.disable":
            "Désactiver",

        "salespeople.activate":
            "Activer",

        "salespeople.confirmDelete":
            "Voulez-vous vraiment supprimer {name} ?",

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

        "admin.users.disable":
            "Désactiver",

        "admin.users.activate":
            "Activer",

        "admin.roles.salesperson":
            "Commercial",

        "admin.roles.manager":
            "Manager",

        "admin.roles.administrator":
            "Administrateur",

        "admin.status.active":
            "Actif",

        "admin.status.inactive":
            "Inactif",

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

        "admin.settings.saved":
            "Paramètres sauvegardés."
    },

    en: {

        "page.homeTitle":
            "Smart CRM - Manage your prospects intelligently",

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
            "🇫🇷 Français",

        "language.english":
            "🇬🇧 English",

        "home.heroLabel":
            "Have a project? Let's talk.",

        "home.heroTitle":
            "Bring your project to life with a solution tailored to your needs.",

        "home.heroText":
            "Tell us about your project, your needs, or your challenges. Our team will review your request and propose a suitable solution.",

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
            "We start by understanding your needs before proposing a suitable solution.",

        "home.quoteLabel":
            "Your project",

        "home.quoteTitle":
            "Tell us about your needs",

        "home.quoteText":
            "Tell us about your project and our team will contact you to review your request.",

        "about.heroLabel":
            "About us",

        "about.heroTitle":
            "We turn ideas into concrete solutions.",

        "about.heroText":
            "Our team helps companies deliver their projects by providing solutions tailored to their needs.",

        "about.approachLabel":
            "Our approach",

        "about.approachTitle":
            "Understand before proposing",

        "about.approachText":
            "Every project is different. We therefore begin by understanding our clients' objectives, constraints, and expectations before building a suitable solution.",

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
            "Each request is reviewed individually in order to propose a suitable solution.",

        "service.webTitle":
            "Web development",

        "service.webText":
            "Creation of websites and applications tailored to your company's needs.",

        "service.automationTitle":
            "Automation",

        "service.automationText":
            "Automate repetitive tasks and optimize your business processes.",

        "service.digitalTitle":
            "Digital solutions",

        "service.digitalText":
            "Design digital solutions tailored to your goals and business needs.",

        "service.businessTitle":
            "Business applications",

        "service.businessText":
            "Develop custom applications to improve your daily operations.",

        "service.consultingTitle":
            "Digital consulting",

        "service.consultingText":
            "Identify the best digital solutions to help your business evolve.",

        "service.customTitle":
            "Custom project",

        "service.customText":
            "Have a specific need? Tell us about your project and let's discuss it.",

        "service.customButton":
            "Describe my project",

        "benefit.understandTitle":
            "Understand your needs",

        "benefit.understandText":
            "We analyze your request, your objectives, and your project's constraints.",

        "benefit.solutionTitle":
            "Propose the right solution",

        "benefit.solutionText":
            "We propose a solution tailored to your situation and objectives.",

        "benefit.supportTitle":
            "Support you",

        "benefit.supportText":
            "Our team supports you from your initial request through project completion.",

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

        "contact.preferenceTitle":
            "How would you like to be contacted?",

        "contact.preferenceEmail":
            "By email",

        "contact.preferencePhone":
            "By phone",

        "contact.preferenceAny":
            "No preference",

        "contact.consent":
            "I agree that my information may be used to process my request.",

        "contact.success":
            "Your request has been recorded. Our team will contact you shortly.",

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
            "Your company name",

        "form.email":
            "Email *",

        "form.emailPlaceholder":
            "you@company.com",

        "form.phone":
            "Phone",

        "form.phonePlaceholder":
            "+212 6...",

        "form.service":
            "Service required *",

        "form.servicePlaceholder":
            "Select a service",

        "form.other":
            "Other",

        "form.budget":
            "Estimated budget",

        "form.budgetPlaceholder":
            "Select an estimate",

        "form.budgetUnder10000":
            "Less than 10,000 MAD",

        "form.budget10000To30000":
            "10,000 – 30,000 MAD",

        "form.budget30000To50000":
            "30,000 – 50,000 MAD",

        "form.budgetOver50000":
            "More than 50,000 MAD",

        "form.budgetUnknown":
            "I don't know yet",

        "form.deadline":
            "Desired timeframe",

        "form.deadlinePlaceholder":
            "Select a timeframe",

        "form.deadlineUrgent":
            "As soon as possible",

        "form.deadlineOneMonth":
            "Within one month",

        "form.deadlineOneToThreeMonths":
            "Within 1 to 3 months",

        "form.deadlineThreeToSixMonths":
            "Within 3 to 6 months",

        "form.deadlineFlexible":
            "I'm flexible",

        "form.message":
            "Describe your project *",

        "form.messagePlaceholder":
            "Describe your needs, objectives, and desired features...",

        "form.submit":
            "Send my request",

        "form.success":
            "Your request has been sent successfully.",

        "footer.description":
            "Solutions tailored to your projects and your company's needs.",

        "footer.crmDescription":
            "Intelligent management of prospects and sales teams.",

        "footer.internalSpace":
            "Internal management area",

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

        "footer.copyright":
            "© 2026 Smart CRM. All rights reserved.",

        "login.subtitle":
            "Sign in to access your workspace.",

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
            "Reserved for authorized users.",

        "login.demoMessage":
            "Backend authentication is not connected yet. Opening the dashboard in demo mode.",

        "actions.view":
            "View",

        "actions.edit":
            "Edit",

        "actions.delete":
            "Delete",

        "actions.save":
            "Save prospect",

        "actions.saveChanges":
            "Save changes",

        "actions.cancel":
            "Cancel",

        "actions.disable":
            "Disable",

        "status.new":
            "New",

        "status.contacted":
            "Contacted",

        "status.qualified":
            "Qualified",

        "status.proposalSent":
            "Proposal Sent",

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

        "roles.commercial":
            "Salesperson",

        "roles.manager":
            "Manager",

        "roles.administrator":
            "Administrator",

        "common.all":
            "All",

        "common.unassigned":
            "Unassigned",

        "prospect.name":
            "Prospect",

        "prospect.firstName":
            "First name",

        "prospect.firstNameRequired":
            "First name *",

        "prospect.lastName":
            "Last name",

        "prospect.lastNameRequired":
            "Last name *",

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

        "prospect.comments":
            "Comments",

        "prospects.management":
            "Sales management",

        "prospects.pageDescription":
            "View, search and manage your prospects.",

        "prospects.newProspect":
            "New prospect",

        "prospects.addProspect":
            "Add a prospect",

        "prospects.formDescription":
            "Enter the new prospect's information.",

        "prospects.firstNamePlaceholder":
            "E.g. Ahmed",

        "prospects.lastNamePlaceholder":
            "E.g. Benali",

        "prospects.companyPlaceholder":
            "E.g. Atlas Solutions",

        "prospects.emailPlaceholder":
            "E.g. ahmed@example.com",

        "prospects.phonePlaceholder":
            "+212 6...",

        "prospects.cityPlaceholder":
            "E.g. Casablanca",

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
            "Search for a prospect",

        "prospects.searchPlaceholder":
            "Name, company or email...",

        "prospects.actions":
            "Actions",

        "prospects.details":
            "Prospect details",

        "prospects.close":
            "Close",

        "confirm.delete":
            "Do you really want to delete {name}?",

        "dashboard.mainStatistics":
            "Main statistics",

        "dashboard.pipelineLabel":
            "Sales pipeline",

        "dashboard.pipelineTitle":
            "Lead distribution by status",

        "dashboard.pipelineDescription":
            "See at a glance how your leads are progressing through the sales cycle.",

        "dashboard.pipelineTotal":
            "Total leads",

        "dashboard.pipelineEmpty":
            "No leads registered yet.",

        "dashboard.overview":
            "Overview",

        "dashboard.welcome":
            "Welcome to your prospect management space.",

        "dashboard.newProspect":
            "+ New prospect",

        "dashboard.totalProspects":
            "Total prospects",

        "dashboard.registeredProspects":
            "Registered prospects",

        "dashboard.newProspects":
            "New prospects",

        "dashboard.thisWeek":
            "This week",

        "dashboard.inProgress":
            "Active prospects",

        "dashboard.toProcess":
            "To process",

        "dashboard.converted":
            "Won opportunities",

        "dashboard.thisMonth":
            "This month",

        "dashboard.recentActivity":
            "Recent activity",

        "dashboard.latestProspects":
            "Latest prospects",

        "dashboard.recentlyAdded":
            "Prospects recently added to the CRM.",

        "dashboard.viewAll":
            "View all prospects",

        "dashboard.noProspects":
            "No prospects registered.",

        "salespeople.title":
            "Salespeople",

        "salespeople.pageDescription":
            "Manage the members of your sales team.",

        "salespeople.addButton":
            "+ Add salesperson",

        "salespeople.addTitle":
            "Add a salesperson",

        "salespeople.addDescription":
            "Enter the information for a new team member.",

        "salespeople.lastNameRequired":
            "Last name *",

        "salespeople.firstNameRequired":
            "First name *",

        "salespeople.emailRequired":
            "Business email *",

        "salespeople.lastNamePlaceholder":
            "Last name",

        "salespeople.firstNamePlaceholder":
            "First name",

        "salespeople.emailPlaceholder":
            "firstname@company.com",

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

        "salespeople.saveChanges":
            "Save changes",

        "salespeople.teamTitle":
            "Sales team",

        "salespeople.teamDescription":
            "View the members of your team.",

        "salespeople.lastName":
            "Name",

        "salespeople.role":
            "Role",

        "salespeople.disable":
            "Disable",

        "salespeople.activate":
            "Activate",

        "salespeople.confirmDelete":
            "Do you really want to delete {name}?",

        "admin.title":
            "Administration",

        "admin.description":
            "Manage CRM users, statistics and settings.",

        "admin.statistics.title":
            "General statistics",

        "admin.statistics.description":
            "Global overview of CRM activity.",

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

        "admin.users.disable":
            "Disable",

        "admin.users.activate":
            "Activate",

        "admin.roles.salesperson":
            "Salesperson",

        "admin.roles.manager":
            "Manager",

        "admin.roles.administrator":
            "Administrator",

        "admin.status.active":
            "Active",

        "admin.status.inactive":
            "Inactive",

        "admin.settings.title":
            "Settings",

        "admin.settings.description":
            "Configure the general CRM settings.",

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

        "admin.settings.saved":
            "Settings saved."
    }
};

const initialProspects = [

    {
        id: 1,
        firstName: "Ahmed",
        lastName: "Benali",
        company: "Atlas Solutions",
        email: "ahmed@example.com",
        phone: "0612345678",
        city: "Casablanca",
        status: "new",
        salespersonId: 3,
        salesperson: "Youssef Amrani",
        comments: "",
        createdAt: "2026-08-10T09:00:00",
        convertedAt: null
    },

    {
        id: 2,
        firstName: "Sarah",
        lastName: "Alaoui",
        company: "Digital Pro",
        email: "sarah@example.com",
        phone: "0677889900",
        city: "Rabat",
        status: "contacted",
        salespersonId: null,
        salesperson: "Amine",
        comments: "",
        createdAt: "2026-08-11T11:30:00",
        convertedAt: null
    },

    {
        id: 3,
        firstName: "Omar",
        lastName: "Idrissi",
        company: "Tech Maroc",
        email: "omar@example.com",
        phone: "0666778899",
        city: "Marrakech",
        status: "won",
        salespersonId: 3,
        salesperson: "Youssef Amrani",
        comments: "",
        createdAt: "2026-08-12T14:15:00",
        convertedAt: "2026-08-12T14:15:00"
    }

];

const initialSalespeople = [

    {
        id: 1,
        firstName: "Ahmed",
        lastName: "Benali",
        email: "ahmed@example.com",
        phone: "0612345678",
        role: "commercial",
        status: "active"
    },

    {
        id: 2,
        firstName: "Fatima",
        lastName: "Alaoui",
        email: "fatima@example.com",
        phone: "0677889900",
        role: "manager",
        status: "active"
    },

    {
        id: 3,
        firstName: "Youssef",
        lastName: "Amrani",
        email: "youssef@example.com",
        phone: "0666112233",
        role: "commercial",
        status: "active"
    }

];

function t(key) {

    return (
        translations[currentLanguage]?.[key] ??
        translations.fr[key] ??
        key
    );
}

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function parseStoredArray(key, fallback) {

    const stored =
        localStorage.getItem(key);

    if (!stored) {

        const cloned =
            fallback.map(
                item => ({ ...item })
            );

        localStorage.setItem(
            key,
            JSON.stringify(cloned)
        );

        return cloned;
    }

    try {

        const parsed =
            JSON.parse(stored);

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        console.error(
            `Erreur LocalStorage (${key}) :`,
            error
        );

        return [];
    }
}

function generateId(items) {

    if (!items.length) {
        return 1;
    }

    return (
        Math.max(
            ...items.map(
                item =>
                    Number(item.id) || 0
            )
        ) + 1
    );
}

const LEAD_STATUSES = Object.freeze([
    "new",
    "contacted",
    "qualified",
    "proposal_sent",
    "negotiation",
    "won",
    "lost",
    "archived"
]);

const LEAD_WORKFLOW = Object.freeze({
    new: ["contacted", "archived"],
    contacted: ["qualified", "lost", "archived"],
    qualified: ["proposal_sent", "lost", "archived"],
    proposal_sent: ["negotiation", "won", "lost", "archived"],
    negotiation: ["won", "lost", "archived"],
    won: ["archived"],
    lost: ["archived"],
    archived: []
});

const LEGACY_LEAD_STATUS_MAP = Object.freeze({
    progress: "contacted",
    converted: "won"
});

function normalizeLeadStatus(status) {

    const normalizedStatus =
        LEGACY_LEAD_STATUS_MAP[status] ||
        status;

    return LEAD_STATUSES.includes(
        normalizedStatus
    )
        ? normalizedStatus
        : "new";
}

function getProspects() {

    const prospects =
        parseStoredArray(
            CRM_STORAGE_KEY,
            initialProspects
        );

    let requiresMigration =
        false;

    const normalizedProspects =
        prospects.map(
            prospect => {

                const normalizedStatus =
                    normalizeLeadStatus(
                        prospect.status
                    );

                if (
                    normalizedStatus !==
                    prospect.status
                ) {
                    requiresMigration =
                        true;
                }

                return {
                    ...prospect,
                    status:
                        normalizedStatus
                };
            }
        );

    if (requiresMigration) {

        saveProspects(
            normalizedProspects
        );
    }

    return normalizedProspects;
}

function saveProspects(prospects) {

    localStorage.setItem(
        CRM_STORAGE_KEY,
        JSON.stringify(prospects)
    );
}

function getSalespeople() {

    return parseStoredArray(
        SALESPEOPLE_STORAGE_KEY,
        initialSalespeople
    );
}

function saveSalespeople(salespeople) {

    localStorage.setItem(
        SALESPEOPLE_STORAGE_KEY,
        JSON.stringify(salespeople)
    );
}

function getSalespersonById(salespersonId) {

    if (!salespersonId) {
        return null;
    }

    return (
        getSalespeople()
            .find(
                person =>
                    Number(person.id) ===
                    Number(salespersonId)
            ) || null
    );
}

function getSalespersonDisplayName(prospect) {

    const salesperson =
        getSalespersonById(
            prospect?.salespersonId
        );

    if (salesperson) {

        return (
            `${salesperson.firstName} ${salesperson.lastName}`
                .trim()
        );
    }

    const storedName =
        String(
            prospect?.salesperson ||
            ""
        ).trim();

    if (storedName) {
        return storedName;
    }

    return t(
        "common.unassigned"
    );
}

function getSettings() {

    const defaults = {
        companyName: "Smart CRM",
        companyEmail: "contact@example.com",
        defaultStatus: "new"
    };

    const stored =
        localStorage.getItem(
            SETTINGS_STORAGE_KEY
        );

    if (!stored) {

        localStorage.setItem(
            SETTINGS_STORAGE_KEY,
            JSON.stringify(defaults)
        );

        return defaults;
    }

    try {

        const settings = {
            ...defaults,
            ...JSON.parse(stored)
        };

        settings.defaultStatus =
            normalizeLeadStatus(
                settings.defaultStatus
            );

        return settings;

    } catch (error) {

        return defaults;
    }
}

function saveSettings(settings) {

    localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({
            ...settings,
            defaultStatus:
                normalizeLeadStatus(
                    settings.defaultStatus
                )
        })
    );
}

function getStatusInfo(status) {

    const normalizedStatus =
        normalizeLeadStatus(status);

    const map = {

        new: {
            text: t("status.new"),
            className: "status-new"
        },

        contacted: {
            text: t("status.contacted"),
            className: "status-contacted"
        },

        qualified: {
            text: t("status.qualified"),
            className: "status-qualified"
        },

        proposal_sent: {
            text: t("status.proposalSent"),
            className: "status-proposal-sent"
        },

        negotiation: {
            text: t("status.negotiation"),
            className: "status-negotiation"
        },

        won: {
            text: t("status.won"),
            className: "status-won"
        },

        lost: {
            text: t("status.lost"),
            className: "status-lost"
        },

        archived: {
            text: t("status.archived"),
            className: "status-archived"
        }

    };

    return map[normalizedStatus] ||
        map.new;
}

function getRoleLabel(role) {

    const map = {

        commercial:
            t("roles.commercial"),

        manager:
            t("roles.manager"),

        administrator:
            t("roles.administrator")

    };

    return map[role] || role;
}

function getSalespersonStatusInfo(status) {

    if (status === "inactive") {

        return {
            text: t("status.inactive"),
            className: "status-inactive"
        };
    }

    return {
        text: t("status.active"),
        className: "status-active"
    };
}

function applyTranslations() {

    document
        .querySelectorAll("[data-i18n]")
        .forEach(
            element => {

                const key =
                    element.dataset.i18n;

                const translation =
                    t(key);

                if (translation !== key) {

                    element.textContent =
                        translation;
                }
            }
        );

    document
        .querySelectorAll(
            "[data-i18n-placeholder]"
        )
        .forEach(
            element => {

                const key =
                    element.dataset.i18nPlaceholder;

                const translation =
                    t(key);

                if (translation !== key) {

                    element.placeholder =
                        translation;
                }
            }
        );

    document
        .querySelectorAll(
            "[data-i18n-aria-label]"
        )
        .forEach(
            element => {

                const key =
                    element.dataset.i18nAriaLabel;

                const translation =
                    t(key);

                if (translation !== key) {

                    element.setAttribute(
                        "aria-label",
                        translation
                    );
                }
            }
        );

    document.documentElement.lang =
        currentLanguage;

    frenchLanguageButton
        ?.classList.toggle(
            "active",
            currentLanguage === "fr"
        );

    englishLanguageButton
        ?.classList.toggle(
            "active",
            currentLanguage === "en"
        );
}

function applyLanguage(language) {

    currentLanguage =
        translations[language]
            ? language
            : "fr";

    localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        currentLanguage
    );

    applyTranslations();

    refreshAllViews();
}

async function sendProspectToAPI(prospect) {

    if (
        !API_URL ||
        API_URL.includes("xxxxxxxx")
    ) {

        return {
            skipped: true,
            reason: "api-not-configured"
        };
    }

    const response =
        await fetch(
            API_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

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

                    service:
                        prospect.service,

                    budget:
                        prospect.budget,

                    deadline:
                        prospect.deadline,

                    contact_preference:
                        prospect.contactPreference,

                    message:
                        prospect.message
                })
            }
        );

    if (!response.ok) {

        throw new Error(
            `Erreur HTTP ${response.status}`
        );
    }

    const contentType =
        response.headers.get(
            "content-type"
        ) || "";

    if (
        contentType.includes(
            "application/json"
        )
    ) {

        return response.json();
    }

    return response.text();
}

function savePublicRequestLocally(request) {

    const prospects =
        getProspects();

    const settings =
        getSettings();

    prospects.push({

        id:
            generateId(prospects),

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
            normalizeLeadStatus(
                settings.defaultStatus ||
                "new"
            ),

        salespersonId:
            null,

        salesperson:
            "",

        comments:
            request.message,

        service:
            request.service,

        budget:
            request.budget,

        deadline:
            request.deadline,

        contactPreference:
            request.contactPreference,

        createdAt:
            new Date().toISOString(),

        convertedAt:
            null
    });

    saveProspects(prospects);
}

if (quoteForm) {

    quoteForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            if (
                !quoteForm.checkValidity()
            ) {

                quoteForm.reportValidity();

                return;
            }

            const formData =
                new FormData(
                    quoteForm
                );

            const prospect = {

                firstName:
                    formData
                        .get("first_name")
                        ?.trim() || "",

                lastName:
                    formData
                        .get("last_name")
                        ?.trim() || "",

                company:
                    formData
                        .get("company")
                        ?.trim() || "",

                email:
                    formData
                        .get("email")
                        ?.trim() || "",

                phone:
                    formData
                        .get("phone")
                        ?.trim() || "",

                service:
                    formData.get(
                        "service"
                    ) || "",

                budget:
                    formData.get(
                        "budget"
                    ) || "",

                deadline:
                    formData.get(
                        "deadline"
                    ) || "",

                contactPreference:
                    formData.get(
                        "contact_preference"
                    ) || "email",

                message:
                    formData
                        .get("message")
                        ?.trim() || ""
            };

            try {

                const apiResult =
                    await sendProspectToAPI(
                        prospect
                    );

                if (
                    apiResult?.skipped
                ) {

                    savePublicRequestLocally(
                        prospect
                    );
                }

                if (successMessage) {

                    successMessage.hidden =
                        false;

                    successMessage.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }

                quoteForm.reset();

                renderLeadStatusChart();

            } catch (error) {

                console.error(
                    "Erreur lors de l'envoi du prospect :",
                    error
                );

                alert(
                    currentLanguage === "en"
                        ? "The request could not be sent. Please try again."
                        : "La demande n'a pas pu être envoyée. Veuillez réessayer."
                );
            }
        }
    );
}

function renderProspects() {

    if (!prospectsTableBody) {
        return;
    }

    const prospects =
        getProspects();

    prospectsTableBody.innerHTML =
        "";

    prospects.forEach(
        prospect => {

            const statusInfo =
                getStatusInfo(
                    prospect.status
                );

            const row =
                document.createElement(
                    "tr"
                );

            row.dataset.prospectId =
                prospect.id;

            row.dataset.status =
                normalizeLeadStatus(
                    prospect.status
                );

            row.innerHTML = `

                <td>
                    <strong>
                        ${escapeHTML(prospect.firstName)}
                    </strong>
                </td>

                <td>
                    <strong>
                        ${escapeHTML(prospect.lastName)}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(prospect.company)}
                </td>

                <td>
                    ${escapeHTML(prospect.email)}
                </td>

                <td>
                    ${escapeHTML(prospect.phone)}
                </td>

                <td>
                    ${escapeHTML(prospect.city)}
                </td>

                <td>
                    <span class="status ${statusInfo.className}">
                        ${escapeHTML(statusInfo.text)}
                    </span>
                </td>

                <td>
                    ${escapeHTML(
                        getSalespersonDisplayName(
                            prospect
                        )
                    )}
                </td>

                <td class="table-actions">

                    <button
                        type="button"
                        class="view-prospect"
                    >
                        ${escapeHTML(t("actions.view"))}
                    </button>

                    <button
                        type="button"
                        class="edit-prospect"
                    >
                        ${escapeHTML(t("actions.edit"))}
                    </button>

                    <button
                        type="button"
                        class="delete-prospect"
                    >
                        ${escapeHTML(t("actions.delete"))}
                    </button>

                </td>

            `;

            prospectsTableBody
                .appendChild(row);
        }
    );

    filterProspects();
}

function getStatusFromRow(row) {

    return normalizeLeadStatus(
        row?.dataset.status ||
        "new"
    );
}

function filterProspects() {

    if (!prospectsTableBody) {
        return;
    }

    const search =
        prospectSearch
            ?.value
            .toLowerCase()
            .trim() || "";

    const selectedStatus =
        statusFilter?.value ||
        "all";

    prospectsTableBody
        .querySelectorAll("tr")
        .forEach(
            row => {

                const matchesSearch =
                    row.textContent
                        .toLowerCase()
                        .includes(search);

                const matchesStatus =
                    selectedStatus === "all" ||
                    getStatusFromRow(row) ===
                        selectedStatus;

                row.hidden =
                    !(
                        matchesSearch &&
                        matchesStatus
                    );
            }
        );
}

prospectSearch
    ?.addEventListener(
        "input",
        filterProspects
    );

statusFilter
    ?.addEventListener(
        "change",
        filterProspects
    );

function populateProspectCommercialSelect() {

    const select =
        document.getElementById(
            "prospect-commercial"
        );

    if (!select) {
        return;
    }

    const currentValue =
        select.value;

    const salespeople =
        getSalespeople()
            .filter(
                person =>
                    person.status ===
                    "active"
            );

    select.innerHTML = `
        <option value="">
            ${escapeHTML(
                t("common.unassigned")
            )}
        </option>
    `;

    salespeople.forEach(
        person => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                String(person.id);

            option.textContent =
                `${person.firstName} ${person.lastName}`
                    .trim();

            select.appendChild(
                option
            );
        }
    );

    const exists =
        Array.from(
            select.options
        )
            .some(
                option =>
                    option.value ===
                    currentValue
            );

    if (exists) {

        select.value =
            currentValue;
    }
}

function fillProspectForm(prospectId) {

    const prospect =
        getProspects()
            .find(
                item =>
                    Number(item.id) ===
                    Number(prospectId)
            );

    if (!prospect) {
        return;
    }

    const values = {

        "prospect-first-name":
            prospect.firstName || "",

        "prospect-last-name":
            prospect.lastName || "",

        "prospect-company":
            prospect.company || "",

        "prospect-email":
            prospect.email || "",

        "prospect-phone":
            prospect.phone || "",

        "prospect-city":
            prospect.city || "",

        "prospect-status":
            prospect.status || "new",

        "prospect-comments":
            prospect.comments || ""
    };

    Object.entries(values)
        .forEach(
            ([id, value]) => {

                const element =
                    document.getElementById(
                        id
                    );

                if (element) {

                    element.value =
                        value;
                }
            }
        );

    populateProspectCommercialSelect();

    const commercialSelect =
        document.getElementById(
            "prospect-commercial"
        );

    if (commercialSelect) {

        const salespersonId =
            prospect.salespersonId
                ? String(
                    prospect.salespersonId
                )
                : "";

        const idExists =
            salespersonId &&
            Array.from(
                commercialSelect.options
            )
                .some(
                    option =>
                        option.value ===
                        salespersonId
                );

        if (idExists) {

            commercialSelect.value =
                salespersonId;

        } else {

            const matchingOption =
                Array.from(
                    commercialSelect.options
                )
                    .find(
                        option =>
                            option.textContent
                                .trim()
                                .toLowerCase() ===
                            String(
                                prospect.salesperson ||
                                ""
                            )
                                .trim()
                                .toLowerCase()
                    );

            commercialSelect.value =
                matchingOption?.value ||
                "";
        }
    }
}

function updateProspectSubmitButton() {

    if (!prospectSubmit) {
        return;
    }

    prospectSubmit.textContent =
        prospectBeingEditedId
            ? t("actions.saveChanges")
            : t("actions.save");
}

showProspectFormButton
    ?.addEventListener(
        "click",
        function () {

            prospectBeingEditedId =
                null;

            prospectForm?.reset();

            populateProspectCommercialSelect();

            updateProspectSubmitButton();

            prospectFormSection
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            setTimeout(
                function () {

                    document
                        .getElementById(
                            "prospect-first-name"
                        )
                        ?.focus();
                },
                300
            );
        }
    );

prospectsTableBody
    ?.addEventListener(
        "click",
        function (event) {

            const row =
                event.target.closest(
                    "tr"
                );

            if (!row) {
                return;
            }

            const prospectId =
                Number(
                    row.dataset.prospectId
                );

            if (
                event.target.closest(
                    ".view-prospect"
                )
            ) {

                showProspectDetails(
                    prospectId
                );

                return;
            }

            if (
                event.target.closest(
                    ".edit-prospect"
                )
            ) {

                prospectBeingEditedId =
                    prospectId;

                fillProspectForm(
                    prospectId
                );

                updateProspectSubmitButton();

                prospectFormSection
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                return;
            }

            if (
                event.target.closest(
                    ".delete-prospect"
                )
            ) {

                deleteProspect(
                    prospectId
                );
            }
        }
    );

prospectForm
    ?.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            if (
                !prospectForm.checkValidity()
            ) {

                prospectForm.reportValidity();

                return;
            }

            const commercialSelect =
                document.getElementById(
                    "prospect-commercial"
                );

            const salespersonId =
                commercialSelect?.value
                    ? Number(
                        commercialSelect.value
                    )
                    : null;

            const selectedSalesperson =
                getSalespersonById(
                    salespersonId
                );

            const salesperson =
                selectedSalesperson
                    ? `${selectedSalesperson.firstName} ${selectedSalesperson.lastName}`
                        .trim()
                    : "";

            const prospectData = {

                firstName:
                    document
                        .getElementById(
                            "prospect-first-name"
                        )
                        ?.value.trim() || "",

                lastName:
                    document
                        .getElementById(
                            "prospect-last-name"
                        )
                        ?.value.trim() || "",

                company:
                    document
                        .getElementById(
                            "prospect-company"
                        )
                        ?.value.trim() || "",

                email:
                    document
                        .getElementById(
                            "prospect-email"
                        )
                        ?.value.trim() || "",

                phone:
                    document
                        .getElementById(
                            "prospect-phone"
                        )
                        ?.value.trim() || "",

                city:
                    document
                        .getElementById(
                            "prospect-city"
                        )
                        ?.value.trim() || "",

                status:
                    normalizeLeadStatus(
                        document
                            .getElementById(
                                "prospect-status"
                            )
                            ?.value ||
                        "new"
                    ),

                salespersonId,

                salesperson,

                comments:
                    document
                        .getElementById(
                            "prospect-comments"
                        )
                        ?.value.trim() || ""
            };

            const prospects =
                getProspects();

            const now =
                new Date()
                    .toISOString();

            if (
                prospectBeingEditedId
            ) {

                const index =
                    prospects.findIndex(
                        item =>
                            Number(item.id) ===
                            Number(
                                prospectBeingEditedId
                            )
                    );

                if (index !== -1) {

                    const previousProspect =
                        prospects[index];

                    const wonAt =
                        prospectData.status ===
                        "won"
                            ? (
                                previousProspect.status ===
                                "won"
                                    ? (
                                        previousProspect.wonAt ||
                                        previousProspect.convertedAt ||
                                        previousProspect.createdAt ||
                                        now
                                    )
                                    : now
                            )
                            : null;

                    prospects[index] = {

                        ...previousProspect,

                        ...prospectData,

                        wonAt,

                        convertedAt:
                            wonAt,

                        updatedAt:
                            now
                    };
                }

            } else {

                prospects.push({

                    id:
                        generateId(
                            prospects
                        ),

                    ...prospectData,

                    createdAt:
                        now,

                    wonAt:
                        prospectData.status ===
                        "won"
                            ? now
                            : null,

                    convertedAt:
                        prospectData.status ===
                        "won"
                            ? now
                            : null
                });
            }

            saveProspects(
                prospects
            );

            prospectBeingEditedId =
                null;

            prospectForm.reset();

            populateProspectCommercialSelect();

            updateProspectSubmitButton();

            refreshProspectViews();
        }
    );

function deleteProspect(prospectId) {

    const prospects =
        getProspects();

    const prospect =
        prospects.find(
            item =>
                Number(item.id) ===
                Number(prospectId)
        );

    if (!prospect) {
        return;
    }

    const name =
        `${prospect.firstName} ${prospect.lastName}`
            .trim();

    const confirmation =
        t("confirm.delete")
            .replace(
                "{name}",
                name
            );

    if (
        !window.confirm(
            confirmation
        )
    ) {
        return;
    }

    const updatedProspects =
        prospects.filter(
            item =>
                Number(item.id) !==
                Number(prospectId)
        );

    saveProspects(
        updatedProspects
    );

    if (
        Number(
            prospectBeingEditedId
        ) ===
        Number(prospectId)
    ) {

        prospectBeingEditedId =
            null;

        prospectForm?.reset();

        updateProspectSubmitButton();
    }

    refreshProspectViews();
}

function showProspectDetails(prospectId) {

    if (
        !prospectModal ||
        !prospectDetails
    ) {
        return;
    }

    const prospect =
        getProspects()
            .find(
                item =>
                    Number(item.id) ===
                    Number(prospectId)
            );

    if (!prospect) {
        return;
    }

    const statusInfo =
        getStatusInfo(
            prospect.status
        );

    prospectDetails.innerHTML = `

        <div class="prospect-detail">

            <div class="prospect-detail-item">
                <span class="prospect-detail-label">
                    ${escapeHTML(t("prospect.firstName"))}
                </span>
                <span class="prospect-detail-value">
                    ${escapeHTML(prospect.firstName)}
                </span>
            </div>

            <div class="prospect-detail-item">
                <span class="prospect-detail-label">
                    ${escapeHTML(t("prospect.lastName"))}
                </span>
                <span class="prospect-detail-value">
                    ${escapeHTML(prospect.lastName)}
                </span>
            </div>

            <div class="prospect-detail-item">
                <span class="prospect-detail-label">
                    ${escapeHTML(t("prospect.company"))}
                </span>
                <span class="prospect-detail-value">
                    ${escapeHTML(prospect.company || "-")}
                </span>
            </div>

            <div class="prospect-detail-item">
                <span class="prospect-detail-label">
                    ${escapeHTML(t("prospect.email"))}
                </span>
                <span class="prospect-detail-value">
                    ${escapeHTML(prospect.email)}
                </span>
            </div>

            <div class="prospect-detail-item">
                <span class="prospect-detail-label">
                    ${escapeHTML(t("prospect.phone"))}
                </span>
                <span class="prospect-detail-value">
                    ${escapeHTML(prospect.phone || "-")}
                </span>
            </div>

            <div class="prospect-detail-item">
                <span class="prospect-detail-label">
                    ${escapeHTML(t("prospect.city"))}
                </span>
                <span class="prospect-detail-value">
                    ${escapeHTML(prospect.city || "-")}
                </span>
            </div>

            <div class="prospect-detail-item">
                <span class="prospect-detail-label">
                    ${escapeHTML(t("prospect.status"))}
                </span>

                <span class="prospect-detail-value">

                    <span class="status ${statusInfo.className}">
                        ${escapeHTML(statusInfo.text)}
                    </span>

                </span>

            </div>

            <div class="prospect-detail-item">
                <span class="prospect-detail-label">
                    ${escapeHTML(t("prospect.salesperson"))}
                </span>

                <span class="prospect-detail-value">
                    ${escapeHTML(
                        getSalespersonDisplayName(
                            prospect
                        )
                    )}
                </span>
            </div>

            <div class="prospect-detail-item">
                <span class="prospect-detail-label">
                    ${escapeHTML(t("prospect.comments"))}
                </span>

                <span class="prospect-detail-value">
                    ${escapeHTML(
                        prospect.comments ||
                        "-"
                    )}
                </span>
            </div>

        </div>
    `;

    prospectModal
        .classList.add(
            "active"
        );

    prospectModal
        .setAttribute(
            "aria-hidden",
            "false"
        );

    modalClose?.focus();
}

function closeProspectModal() {

    if (!prospectModal) {
        return;
    }

    prospectModal
        .classList.remove(
            "active"
        );

    prospectModal
        .setAttribute(
            "aria-hidden",
            "true"
        );
}

modalClose
    ?.addEventListener(
        "click",
        closeProspectModal
    );

prospectModal
    ?.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                prospectModal
            ) {

                closeProspectModal();
            }
        }
    );

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            prospectModal
                ?.classList.contains(
                    "active"
                )
        ) {

            closeProspectModal();
        }
    }
);

function isDateInCurrentWeek(value) {

    if (!value) {
        return false;
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return false;
    }

    const now =
        new Date();

    const startOfWeek =
        new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );

    const day =
        startOfWeek.getDay();

    const daysSinceMonday =
        (day + 6) % 7;

    startOfWeek.setDate(
        startOfWeek.getDate() -
        daysSinceMonday
    );

    const startOfNextWeek =
        new Date(
            startOfWeek
        );

    startOfNextWeek.setDate(
        startOfNextWeek.getDate() + 7
    );

    return (
        date >= startOfWeek &&
        date < startOfNextWeek
    );
}

function isDateInCurrentMonth(value) {

    if (!value) {
        return false;
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return false;
    }

    const now =
        new Date();

    return (
        date.getFullYear() ===
            now.getFullYear() &&
        date.getMonth() ===
            now.getMonth()
    );
}

function calculateLeadStatusDistribution(prospects) {

    const counts =
        Object.fromEntries(
            LEAD_STATUSES.map(
                status => [
                    status,
                    0
                ]
            )
        );

    prospects.forEach(
        prospect => {

            const status =
                normalizeLeadStatus(
                    prospect.status
                );

            counts[status] += 1;
        }
    );

    return {
        total: prospects.length,
        counts
    };
}

function getStatusPercentage(count, total) {

    if (!total) {
        return 0;
    }

    return Math.round(
        (count / total) * 100
    );
}

function renderLeadStatusChart() {

    if (!leadStatusChart) {
        return;
    }

    const prospects =
        getProspects();

    const distribution =
        calculateLeadStatusDistribution(
            prospects
        );

    if (pipelineTotalLeads) {

        pipelineTotalLeads.textContent =
            distribution.total;
    }

    if (!distribution.total) {

        leadStatusChart.innerHTML = `
            <p class="lead-status-empty">
                ${escapeHTML(
                    t("dashboard.pipelineEmpty")
                )}
            </p>
        `;

        return;
    }

    leadStatusChart.innerHTML =
        LEAD_STATUSES
            .map(
                status => {

                    const count =
                        distribution.counts[
                            status
                        ];

                    const percentage =
                        getStatusPercentage(
                            count,
                            distribution.total
                        );

                    const statusInfo =
                        getStatusInfo(
                            status
                        );

                    return `
                        <article
                            class="lead-status-row"
                            data-status="${escapeHTML(status)}"
                        >

                            <div class="lead-status-meta">

                                <div class="lead-status-name">

                                    <span
                                        class="lead-status-dot ${statusInfo.className}"
                                        aria-hidden="true"
                                    ></span>

                                    <span>
                                        ${escapeHTML(statusInfo.text)}
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

                            <div
                                class="lead-status-track"
                                role="progressbar"
                                aria-valuemin="0"
                                aria-valuemax="${distribution.total}"
                                aria-valuenow="${count}"
                                aria-label="${escapeHTML(statusInfo.text)}"
                            >

                                <span
                                    class="lead-status-fill ${statusInfo.className}"
                                    style="--status-width: ${percentage}%"
                                ></span>

                            </div>

                        </article>
                    `;
                }
            )
            .join("");
}

function renderDashboardRecentProspects() {

    if (
        !dashboardRecentProspects
    ) {
        return;
    }

    const prospects =
        getProspects()
            .slice()
            .sort(
                function (a, b) {

                    const aDate =
                        new Date(
                            a.createdAt || 0
                        ).getTime();

                    const bDate =
                        new Date(
                            b.createdAt || 0
                        ).getTime();

                    return (
                        bDate -
                        aDate ||
                        Number(b.id) -
                        Number(a.id)
                    );
                }
            )
            .slice(0, 5);

    if (!prospects.length) {

        dashboardRecentProspects
            .innerHTML = `

                <tr>
                    <td colspan="5">
                        ${escapeHTML(
                            t("dashboard.noProspects")
                        )}
                    </td>
                </tr>
            `;

        return;
    }

    dashboardRecentProspects.innerHTML =
        prospects
            .map(
                prospect => {

                    const statusInfo =
                        getStatusInfo(
                            prospect.status
                        );

                    return `

                        <tr>

                            <td>

                                <strong>
                                    ${escapeHTML(
                                        `${prospect.firstName} ${prospect.lastName}`
                                            .trim()
                                    )}
                                </strong>

                                <span class="table-secondary">
                                    ${escapeHTML(
                                        prospect.email
                                    )}
                                </span>

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

                                <span class="status ${statusInfo.className}">
                                    ${escapeHTML(
                                        statusInfo.text
                                    )}
                                </span>

                            </td>

                            <td>
                                ${escapeHTML(
                                    prospect.salesperson ||
                                    t("common.unassigned")
                                )}
                            </td>

                        </tr>
                    `;
                }
            )
            .join("");
}

function renderDashboard() {

    renderLeadStatusChart();

    renderDashboardRecentProspects();
}

function refreshProspectViews() {

    populateProspectCommercialSelect();

    renderProspects();

    renderDashboard();

    renderAdmin();
}

function refreshSalespeopleViews() {

    renderSalespeople();

    populateProspectCommercialSelect();

    renderAdmin();
}

function refreshAllViews() {

    populateProspectCommercialSelect();

    updateProspectSubmitButton();

    updateSalespersonSubmitButton();

    renderProspects();

    renderDashboard();

    renderSalespeople();

    renderAdmin();
}

function renderSalespeople() {

    if (!salespeopleTableBody) {
        return;
    }

    const salespeople =
        getSalespeople();

    salespeopleTableBody.innerHTML =
        "";

    salespeople.forEach(
        person => {

            const statusInfo =
                getSalespersonStatusInfo(
                    person.status
                );

            const row =
                document.createElement(
                    "tr"
                );

            row.dataset.salespersonId =
                person.id;

            row.innerHTML = `

                <td>
                    <strong>
                        ${escapeHTML(
                            `${person.firstName} ${person.lastName}`
                                .trim()
                        )}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(person.email)}
                </td>

                <td>
                    ${escapeHTML(
                        person.phone ||
                        "-"
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        getRoleLabel(
                            person.role
                        )
                    )}
                </td>

                <td>

                    <span class="status ${statusInfo.className}">
                        ${escapeHTML(
                            statusInfo.text
                        )}
                    </span>

                </td>

                <td>

                    <div class="table-actions">

                        <button
                            type="button"
                            class="action-view"
                            data-action="view"
                        >
                            ${escapeHTML(
                                t("actions.view")
                            )}
                        </button>

                        <button
                            type="button"
                            class="action-edit"
                            data-action="edit"
                        >
                            ${escapeHTML(
                                t("actions.edit")
                            )}
                        </button>

                        <button
                            type="button"
                            class="action-delete"
                            data-action="toggle"
                        >
                            ${escapeHTML(
                                person.status ===
                                "active"
                                    ? t("salespeople.disable")
                                    : t("salespeople.activate")
                            )}
                        </button>

                    </div>

                </td>
            `;

            salespeopleTableBody
                .appendChild(row);
        }
    );

    populateProspectCommercialSelect();
}

function updateSalespersonSubmitButton() {

    if (!salespersonSubmit) {
        return;
    }

    salespersonSubmit.textContent =
        salespersonBeingEditedId
            ? t(
                "salespeople.saveChanges"
            )
            : t(
                "salespeople.addSubmit"
            );
}

function resetSalespersonForm() {

    salespersonBeingEditedId =
        null;

    salespersonForm?.reset();

    updateSalespersonSubmitButton();
}

showSalespersonFormButton
    ?.addEventListener(
        "click",
        function () {

            resetSalespersonForm();

            salespersonFormSection
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            setTimeout(
                function () {

                    document
                        .getElementById(
                            "salesperson-lastname"
                        )
                        ?.focus();
                },
                300
            );
        }
    );

salespersonCancel
    ?.addEventListener(
        "click",
        function () {

            setTimeout(
                resetSalespersonForm,
                0
            );
        }
    );

salespersonForm
    ?.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            if (
                !salespersonForm
                    .checkValidity()
            ) {

                salespersonForm
                    .reportValidity();

                return;
            }

            const data = {

                lastName:
                    document
                        .getElementById(
                            "salesperson-lastname"
                        )
                        ?.value.trim() || "",

                firstName:
                    document
                        .getElementById(
                            "salesperson-firstname"
                        )
                        ?.value.trim() || "",

                email:
                    document
                        .getElementById(
                            "salesperson-email"
                        )
                        ?.value.trim() || "",

                phone:
                    document
                        .getElementById(
                            "salesperson-phone"
                        )
                        ?.value.trim() || "",

                role:
                    document
                        .getElementById(
                            "salesperson-role"
                        )
                        ?.value ||
                    "commercial",

                status:
                    document
                        .getElementById(
                            "salesperson-status"
                        )
                        ?.value ||
                    "active"
            };

            const salespeople =
                getSalespeople();

            if (
                salespersonBeingEditedId
            ) {

                const index =
                    salespeople
                        .findIndex(
                            person =>
                                Number(person.id) ===
                                Number(
                                    salespersonBeingEditedId
                                )
                        );

                if (index !== -1) {

                    salespeople[index] = {

                        ...salespeople[index],

                        ...data
                    };
                }

            } else {

                salespeople.push({

                    id:
                        generateId(
                            salespeople
                        ),

                    ...data
                });
            }

            saveSalespeople(
                salespeople
            );

            resetSalespersonForm();

            refreshSalespeopleViews();
        }
    );

salespeopleTableBody
    ?.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "button[data-action]"
                );

            const row =
                event.target.closest(
                    "tr"
                );

            if (
                !button ||
                !row
            ) {
                return;
            }

            const salespersonId =
                Number(
                    row.dataset.salespersonId
                );

            const salespeople =
                getSalespeople();

            const person =
                salespeople.find(
                    item =>
                        Number(item.id) ===
                        salespersonId
                );

            if (!person) {
                return;
            }

            if (
                button.dataset.action ===
                "view"
            ) {

                alert(
                    `${person.firstName} ${person.lastName}\n` +
                    `${person.email}\n` +
                    `${person.phone || "-"}\n` +
                    `${getRoleLabel(person.role)}\n` +
                    `${getSalespersonStatusInfo(person.status).text}`
                );

                return;
            }

            if (
                button.dataset.action ===
                "edit"
            ) {

                salespersonBeingEditedId =
                    salespersonId;

                const values = {

                    "salesperson-lastname":
                        person.lastName,

                    "salesperson-firstname":
                        person.firstName,

                    "salesperson-email":
                        person.email,

                    "salesperson-phone":
                        person.phone,

                    "salesperson-role":
                        person.role,

                    "salesperson-status":
                        person.status
                };

                Object.entries(values)
                    .forEach(
                        ([id, value]) => {

                            const element =
                                document
                                    .getElementById(
                                        id
                                    );

                            if (element) {

                                element.value =
                                    value ||
                                    "";
                            }
                        }
                    );

                updateSalespersonSubmitButton();

                salespersonFormSection
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                return;
            }

            if (
                button.dataset.action ===
                "toggle"
            ) {

                person.status =
                    person.status ===
                    "active"
                        ? "inactive"
                        : "active";

                saveSalespeople(
                    salespeople
                );

                refreshSalespeopleViews();
            }
        }
    );

function renderAdminStats() {

    const prospects =
        getProspects();

    const salespeople =
        getSalespeople();

    const converted =
        prospects.filter(
            prospect =>
                normalizeLeadStatus(
                    prospect.status
                ) === "won"
        ).length;

    const values = {

        "admin-total-prospects":
            prospects.length,

        "admin-total-salespeople":
            salespeople.filter(
                person =>
                    person.status ===
                    "active"
            ).length,

        "admin-total-clients":
            converted,

        "admin-total-contracts":
            converted
    };

    Object.entries(values)
        .forEach(
            ([id, value]) => {

                const element =
                    document.getElementById(
                        id
                    );

                if (element) {

                    element.textContent =
                        value;
                }
            }
        );
}

function renderAdminUsers() {

    if (!adminUsersTableBody) {
        return;
    }

    const salespeople =
        getSalespeople();

    adminUsersTableBody.innerHTML =
        salespeople
            .map(
                person => {

                    const statusInfo =
                        getSalespersonStatusInfo(
                            person.status
                        );

                    return `

                        <tr data-user-id="${Number(person.id)}">

                            <td>
                                <strong>
                                    ${escapeHTML(
                                        `${person.firstName} ${person.lastName}`
                                            .trim()
                                    )}
                                </strong>
                            </td>

                            <td>
                                ${escapeHTML(person.email)}
                            </td>

                            <td>
                                ${escapeHTML(
                                    getRoleLabel(
                                        person.role
                                    )
                                )}
                            </td>

                            <td>

                                <span class="status ${statusInfo.className}">
                                    ${escapeHTML(
                                        statusInfo.text
                                    )}
                                </span>

                            </td>

                            <td>

                                <div class="table-actions">

                                    <button
                                        type="button"
                                        class="action-edit"
                                        data-admin-action="edit"
                                    >
                                        ${escapeHTML(
                                            t("actions.edit")
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        class="action-delete"
                                        data-admin-action="toggle"
                                    >
                                        ${escapeHTML(
                                            person.status ===
                                            "active"
                                                ? t("admin.users.disable")
                                                : t("admin.users.activate")
                                        )}
                                    </button>

                                </div>

                            </td>

                        </tr>
                    `;
                }
            )
            .join("");
}

function loadSettingsIntoForm() {

    if (!settingsForm) {
        return;
    }

    const settings =
        getSettings();

    const companyName =
        document.getElementById(
            "company-name"
        );

    const companyEmail =
        document.getElementById(
            "company-email"
        );

    const defaultStatus =
        document.getElementById(
            "default-status"
        );

    if (companyName) {

        companyName.value =
            settings.companyName ||
            "";
    }

    if (companyEmail) {

        companyEmail.value =
            settings.companyEmail ||
            "";
    }

    if (defaultStatus) {

        defaultStatus.value =
            settings.defaultStatus ||
            "new";
    }
}

settingsForm
    ?.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const settings = {

                companyName:
                    document
                        .getElementById(
                            "company-name"
                        )
                        ?.value.trim() ||
                    "",

                companyEmail:
                    document
                        .getElementById(
                            "company-email"
                        )
                        ?.value.trim() ||
                    "",

                defaultStatus:
                    document
                        .getElementById(
                            "default-status"
                        )
                        ?.value ||
                    "new"
            };

            saveSettings(
                settings
            );

            alert(
                t(
                    "admin.settings.saved"
                )
            );
        }
    );

settingsForm
    ?.addEventListener(
        "reset",
        function () {

            setTimeout(
                loadSettingsIntoForm,
                0
            );
        }
    );

adminUsersTableBody
    ?.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "button[data-admin-action]"
                );

            const row =
                event.target.closest(
                    "tr"
                );

            if (
                !button ||
                !row
            ) {
                return;
            }

            const id =
                Number(
                    row.dataset.userId
                );

            const salespeople =
                getSalespeople();

            const person =
                salespeople.find(
                    item =>
                        Number(item.id) ===
                        id
                );

            if (!person) {
                return;
            }

            if (
                button.dataset.adminAction ===
                "edit"
            ) {

                window.location.href =
                    "commerciaux.html";

                return;
            }

            if (
                button.dataset.adminAction ===
                "toggle"
            ) {

                person.status =
                    person.status ===
                    "active"
                        ? "inactive"
                        : "active";

                saveSalespeople(
                    salespeople
                );

                refreshSalespeopleViews();
            }
        }
    );

function renderAdmin() {

    renderAdminStats();

    renderAdminUsers();

    loadSettingsIntoForm();
}

loginForm
    ?.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            if (
                !loginForm.checkValidity()
            ) {

                loginForm.reportValidity();

                return;
            }

            if (loginError) {

                loginError.hidden =
                    false;

                loginError.textContent =
                    t(
                        "login.demoMessage"
                    );
            }

            setTimeout(
                function () {

                    window.location.href =
                        "dashboard.html";
                },
                500
            );
        }
    );

frenchLanguageButton
    ?.addEventListener(
        "click",
        function () {

            applyLanguage(
                "fr"
            );
        }
    );

englishLanguageButton
    ?.addEventListener(
        "click",
        function () {

            applyLanguage(
                "en"
            );
        }
    );

function initializeApp() {

    applyTranslations();

    refreshAllViews();

    console.log(
        "Smart CRM — JavaScript chargé correctement."
    );
}

initializeApp();