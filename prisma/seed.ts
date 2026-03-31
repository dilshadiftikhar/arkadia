import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Arkadia...");

  // Nettoyage
  await prisma.booking.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  // ── Événements ──────────────────────────────────────────────────────────────

  const events = await prisma.event.createMany({
    data: [
      // Semaine 1 — 6-12 avril 2026
      {
        title: "Soirée Découverte — Bienvenue chez Arkadia",
        shortDesc:
          "Votre première fois ici ? On s'occupe de tout : jeux simples, bonne ambiance, zéro prise de tête.",
        description: `Vous n'avez jamais mis les pieds dans un café-jeux ? C'est exactement pour vous que cette soirée existe.

Théo vous accueille avec quelques jeux d'initiation soigneusement choisis : des règles en 5 minutes, du rire garanti, et une première victoire possible même en débutant complet.

Au programme : Concept, Dixit, Skull, et peut-être Azul si on a le temps. On joue par petites tables, on tourne, on découvre.

Venez seul, avec un ami, ou en groupe — vous repartirez avec l'envie de revenir.`,
        scheduledAt: new Date("2026-04-07T19:00:00"),
        durationMinutes: 180,
        capacity: 20,
        tableSize: 5,
        status: "open",
        level: "debutant",
        animatorName: "Théo",
        animatorNote:
          "Théo sera là dès 18h45 pour vous accueillir et vous orienter vers la bonne table.",
        tags: ["débutant", "découverte", "initiation", "convivial"],
        price: 0,
      },
      {
        title: "Afterwork — Jeux Courts & Apéro",
        shortDesc:
          "Finissez la semaine comme il se doit : une bière, des dés, et des collègues qui deviennent rivaux.",
        description: `Jeudi soir, 18h30. La semaine est longue, le bureau pèse. Sophie vous propose l'antidote parfait.

Des jeux rapides, nerveux, et souvent hilarants — Sushi Go, Love Letter, Cockroach Poker, Skull & Roses. Des parties de 15 à 30 minutes, qu'on enchaîne sans se lasser.

Format libre : vous arrivez quand vous voulez dans la tranche 18h30–21h30, vous trouvez une table, vous jouez. Idéal pour venir directement après le boulot.

Consommation non incluse, mais la carte des boissons est là pour ça.`,
        scheduledAt: new Date("2026-04-09T18:30:00"),
        durationMinutes: 180,
        capacity: 20,
        tableSize: 4,
        status: "open",
        level: "tous",
        animatorName: "Sophie",
        animatorNote:
          "Sophie circule entre les tables toute la soirée pour lancer de nouvelles parties.",
        tags: ["apéro", "afterwork", "jeux courts", "décontracté"],
        price: 0,
      },
      {
        title: "Initiation Wingspan — L'Ornithologie Ludique",
        shortDesc:
          "Wingspan en 3h avec Théo : apprenez en jouant, et tombez amoureux du plus beau jeu de l'année.",
        description: `Vous avez vu Wingspan partout — sur Instagram, dans les tops de fin d'année, dans les vitrines des boutiques. Mais les règles vous semblent complexes ?

Théo a initié plus de 200 joueurs à ce jeu. Il connaît exactement où ça coince, ce qu'on oublie, et comment rendre l'apprentissage fluide et agréable.

Ce soir, on commence ensemble à zéro. Tableau blanc, dés de nourriture, cartes oiseaux sublimes. Vous apprendrez les mécaniques partie après partie, et vous repartirez capable de l'enseigner à votre tour.

Places limitées à 12 pour que chaque joueur ait l'attention qu'il mérite.`,
        scheduledAt: new Date("2026-04-10T19:30:00"),
        durationMinutes: 210,
        capacity: 12,
        tableSize: 4,
        status: "full",
        level: "debutant",
        animatorName: "Théo",
        animatorNote:
          "Apportez votre curiosité, Théo apporte tout le reste. Aucun matériel nécessaire.",
        tags: ["débutant", "initiation", "nature", "engine-building"],
        price: 800,
      },
      {
        title: "Tournoi Catan — La Guerre des Ressources",
        shortDesc:
          "4 tables, 16 joueurs, 1 seul vainqueur. Que le meilleur négociateur l'emporte.",
        description: `Catan. Le classique absolu. Celui qui a ruiné des amitiés et forgé des alliances improbables depuis 1995.

Sophie organise ce tournoi en deux rounds : une phase de poules où tout le monde joue une partie, puis une finale entre les 4 meilleurs scores.

Règles officielles KOSMOS, avec quelques variantes maison annoncées avant le début. Niveau intermédiaire requis — vous devez connaître les règles de base, mais nul besoin d'être un champion.

Prix d'entrée : 12€ incluant la réservation de la table et une boisson offerte en début de soirée.`,
        scheduledAt: new Date("2026-04-12T14:00:00"),
        durationMinutes: 240,
        capacity: 16,
        tableSize: 4,
        status: "open",
        level: "intermediaire",
        animatorName: "Sophie",
        animatorNote:
          "Arbitre neutre : Sophie ne joue pas et reste disponible pour régler tout litige de règles.",
        tags: ["compétition", "tournoi", "stratégie", "négociation"],
        price: 1200,
      },

      // Semaine 2 — 13-19 avril 2026
      {
        title: "Nuit des Coopératifs — Ensemble ou Rien",
        shortDesc:
          "Une soirée entière dédiée aux jeux où l'équipe gagne — ou perd — ensemble.",
        description: `Pandemic, Arkham Horror, Spirit Island, Hanabi. Ce soir, on laisse la compétition au vestiaire.

Théo vous guide à travers une sélection de jeux coopératifs, du plus accessible (Hanabi, Mysterium) au plus tendu (Pandemic Legacy si le groupe est chaud).

Le principe : vous formez une équipe au moment d'arriver, et vous traversez la soirée ensemble. Victoire collective, défaite collective, fous rires garantis.

Parfait pour les groupes d'amis qui veulent jouer "en équipe contre le jeu" plutôt que les uns contre les autres.`,
        scheduledAt: new Date("2026-04-17T19:00:00"),
        durationMinutes: 240,
        capacity: 20,
        tableSize: 5,
        status: "open",
        level: "tous",
        animatorName: "Théo",
        animatorNote:
          "Théo adapte le niveau de difficulté en temps réel selon l'expérience de chaque table.",
        tags: ["coopératif", "soirée", "aventure", "équipe"],
        price: 800,
      },
      {
        title: "Matinée Famille — Jeux pour Petits et Grands",
        shortDesc:
          "Samedi matin en famille : des jeux qui plaisent aux enfants ET aux adultes, promis.",
        description: `10h du matin, les enfants sont réveillés depuis 6h et ont déjà tout retourné. Et si on jouait ensemble ?

Sophie a sélectionné des jeux qui fonctionnent pour les 6-10 ans mais qui n'ennuient pas les adultes : Jungle Speed Kids, Dobble, King of Tokyo, Ticket to Ride First Journey.

Format détendu, tables ouvertes, vous pouvez arriver à partir de 10h. On termine vers 13h avec une pause collation à mi-parcours.

Entrée libre. Les enfants de moins de 6 ans sont les bienvenus accompagnés.`,
        scheduledAt: new Date("2026-04-19T10:00:00"),
        durationMinutes: 180,
        capacity: 16,
        tableSize: 4,
        status: "open",
        level: "tous",
        animatorName: "Sophie",
        animatorNote:
          "Sophie adapte les règles pour les plus jeunes sans gâcher le plaisir des adultes.",
        tags: ["famille", "enfants", "accessible", "weekend"],
        price: 0,
      },

      // Semaine 3 — 20-26 avril 2026
      {
        title: "Atelier Jeux Experts — Profondeur & Stratégie",
        shortDesc:
          "Twilight Imperium, Brass, Terra Mystica : une soirée pour les joueurs qui veulent vraiment se creuser la tête.",
        description: `Vous connaissez déjà les classiques. Vous voulez aller plus loin. Cette soirée est pour vous.

Théo propose un format "atelier" : on choisit ensemble en début de soirée le jeu principal de la nuit, et on le joue dans les règles — sans simplification, avec toute sa profondeur stratégique.

Jeux au menu selon les inscrits : Brass Birmingham, Terra Mystica, Through the Ages, ou Twilight Imperium si on est assez nombreux et courageux.

Niveau confirmé requis. Si vous avez déjà des parties de Wingspan ou Catan derrière vous, c'est suffisant pour venir — venez simplement prêt à apprendre.`,
        scheduledAt: new Date("2026-04-24T18:30:00"),
        durationMinutes: 300,
        capacity: 12,
        tableSize: 4,
        status: "full",
        level: "confirme",
        animatorName: "Théo",
        animatorNote:
          "Théo envoie un sondage 3 jours avant pour choisir le jeu principal — répondez vite.",
        tags: ["experts", "stratégie", "complexe", "immersif"],
        price: 1200,
      },

      // Semaine 4 — 27 avril-3 mai 2026
      {
        title: "Afterwork Léger — Mardi Détente",
        shortDesc:
          "Rien de prise de tête : des jeux malins et rapides pour décompresser en milieu de semaine.",
        description: `Pas besoin d'attendre le jeudi. Mardi soir, Sophie ouvre Arkadia pour une formule ultra-décontractée.

Au programme : jeux de 15-20 minutes, règles expliquées en 2 minutes chrono, et une ambiance brasserie-salon où on peut aussi juste venir boire quelque chose et regarder jouer.

Silver, Skull, Dobble XL, Wavelength, Codenames. Des jeux qui n'intimident personne mais qui cachent une vraie profondeur quand on s'y met.

Entrée libre, venez comme vous êtes, amenez qui vous voulez.`,
        scheduledAt: new Date("2026-04-28T18:30:00"),
        durationMinutes: 150,
        capacity: 20,
        tableSize: 5,
        status: "open",
        level: "tous",
        animatorName: "Sophie",
        animatorNote:
          "Sophie est là pour lancer les parties mais la soirée reste très libre — venez à votre rythme.",
        tags: ["apéro", "afterwork", "léger", "jeux courts", "accessible"],
        price: 0,
      },
    ],
  });

  console.log(`✅ ${events.count} événements créés`);

  // ── Utilisateurs de démo ────────────────────────────────────────────────────

  const users = await Promise.all([
    prisma.user.create({
      data: {
        clerkId: "demo_user_alice",
        email: "alice@demo.arkadia",
        name: "Alice Marchand",
        level: "intermediaire",
        bio: "Fan de jeux de stratégie, j'ai découvert Catan il y a 3 ans et je n'ai jamais regardé en arrière.",
      },
    }),
    prisma.user.create({
      data: {
        clerkId: "demo_user_ben",
        email: "ben@demo.arkadia",
        name: "Benjamin Tran",
        level: "debutant",
        bio: "Nouveau dans l'univers du jeu de société. Ma copine m'a traîné ici et maintenant c'est moi qui veux y retourner.",
      },
    }),
    prisma.user.create({
      data: {
        clerkId: "demo_user_chloe",
        email: "chloe@demo.arkadia",
        name: "Chloé Durand",
        level: "confirme",
        bio: "Je joue depuis l'enfance. Twilight Imperium, Gloomhaven, Arkham Horror — je connais la collection d'Arkadia mieux que certains employés.",
      },
    }),
  ]);

  console.log(`✅ ${users.length} utilisateurs créés`);

  // ── Quelques réservations de démo ──────────────────────────────────────────

  const allEvents = await prisma.event.findMany({
    orderBy: { scheduledAt: "asc" },
  });

  const [soireeDecouverte, afterworkJeudi, wingspan, catan, cooperatifs] =
    allEvents;
  const [alice, ben, chloe] = users;

  await prisma.booking.createMany({
    data: [
      // Alice — Tournoi Catan + Coopératifs
      {
        userId: alice.id,
        eventId: catan.id,
        status: "confirmed",
        groupSize: 1,
      },
      {
        userId: alice.id,
        eventId: cooperatifs.id,
        status: "confirmed",
        groupSize: 2,
        specialNote: "On vient à deux avec mon frère",
      },
      // Ben — Soirée Découverte + Afterwork
      {
        userId: ben.id,
        eventId: soireeDecouverte.id,
        status: "confirmed",
        groupSize: 1,
        isOpenTable: true,
      },
      {
        userId: ben.id,
        eventId: afterworkJeudi.id,
        status: "confirmed",
        groupSize: 1,
      },
      // Chloé — Wingspan (liste d'attente car full) + Coopératifs
      {
        userId: chloe.id,
        eventId: wingspan.id,
        status: "waitlist",
        groupSize: 1,
        specialNote: "Je suis souple sur d'autres créneaux si une place se libère",
      },
      {
        userId: chloe.id,
        eventId: cooperatifs.id,
        status: "confirmed",
        groupSize: 1,
      },
    ],
  });

  console.log("✅ 6 réservations de démo créées");
  console.log("\n🎲 Arkadia est prêt à jouer !");
  console.log(`   ${allEvents.length} événements · ${users.length} utilisateurs · 6 réservations`);
}

main()
  .catch((e) => {
    console.error("❌ Erreur seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
