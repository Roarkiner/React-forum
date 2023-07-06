# React Forum

Ceci est une app de forum faite avec React et en Typescript. Trois ressources sont exploitées et manipulées à l'aide d'une API ("https://ynov-topics-comments.ld-web.net/") : Les sujets de discussion "Topics", les commentaires "Comments" et les utilisateurs "Users".

## Sommaire
- ## [Librairies utilisées](#librairies)
- ## [Pages](#pages)
    - ### [Layout](#layout)
    - ### [Page d'accueil](#home-page)
    - ### [Page d'authentification](#auth-page)
    - ### [Page "Mes sujets"](#my-topics-page)
    - ### [Page d'ajout d'un sujet](#new-topic-page)
    - ### [Page de détail d'un sujet](#topic-detail-page)
- ## [Fonctionnalités](#fonctionnalities)
    - ### [Routing](#routing)
    - ### [Authentification](#authentication)
    - ### [Recherche et pagination](#search-paginate)
    - ### [Généralités](#generalities)
    
## Librairies utilisées<a name="librairies"></a>

- **@tanstack/react-query** : permet de créer des queries pour récupérer de la data et les manipuler après. Je l'ai utilisée pour éviter l'utilisation de UseEffect la plupart du temps (et parce que c'est vachement pratique, surtout le isLoading ou isError)
- **axios** : alternative à fetch pour faire des appels d'API. Je l'ai utilisée pour automatiquement configurer et simplifier mes appels d'API, mais aussi et surtout pour pouvoir gérer les erreurs 401 retournées par l'API.
- **bootstrap** : bibliothèque de style. Je l'ai utilisée parce que j'y suis habitué, et ça me permet de limiter l'ajout de classes css personnalisées.
- **bootstrap-icons** : permet d'utiliser les icons de bootstrap. Rapide à mettre en place et plutôt complet il y avait largement tout ce dont je pouvais avoir besoin.
- **jwt-decode** : permet de décoder des jwt token. Je l'ai utilisé pour récupérer l'IRI de l'utilisateur connecté dans le jwt token renvoyé par l'API.
- **react** : librairie js permet d'utiliser les outils de base de React, notamment les composants et la plupart des hook.
- **react-dom** : librairie js qui permet de render ce qui est créé par React dans le navigateur.
- **react-router-dom** : permet de faire du routing dans une app react. <a name="react-dom-router"></a>
- **react-toastify** : permet d'afficher et configurer des "toasts" (messages qui s'affichent par dessus la page). Je l'ai utilisée pour afficher mes messages d'erreurs.

## Pages <a name="pages"></a>

### Layout <a name="layout"></a>

Le layout est présent sur toutes les pages sauf la page d'authentification. Il contient :

- Une navbar avec : 
    - Un lien vers l'accueil.
    - Un lien vers la page contenant les sujets créés par l'utilisateur connecté **(apparait si l'utilisateur est connecté)**
    - Un lien pour accéder à la page de connection **(si l'utilisateur n'est pas connecté)** / Un bouton de déconnexion **(si l'utilisateur est connecté)**.
- Le contenu de la page.
- Un footer, à remplir avec ce qui est obligatoire pour un site web et autre.

### Page d'accueil <a name="home-page"></a>

La page d'accueil contient :

- Un sujet est composé d'un titre, une description, le nombres de commentaires, le nom d'utilisateur du créateur du sujet (email sans ce qu'il y a après "@") et la date de création du sujet
- Une liste des sujets triés par ordre chronologique du plus récent au moins récent avec pagination. Les sujets sont cliquables. Une query va appeler une méthode de service, qui va ensuite appeler l'API avec comme paramètres la valeur de la barre de recherche et la page. Pendant que la query est en cours, un placeholder est inséré pour signifier à l'utilisateur que la page se charge. Si l'API renvoir une erreur, un text d'erreur prend la place du contenu de la page.
- Une barre de recherche qui va chercher les sujets dont le titre correspond au filtre.
- Une liste de boutons pour la pagination qui permet de passer aux différentes pages de la liste
- Un bouton pour accéder à la page d'ajout de sujet.

### Page d'authentification <a name="auth-page"></a>

La page d'authentification contient :

- Un bouton permettant de revenir à la page d'acceuil.
- Un bouton permettant de passer de la connexion à la création de compte
- Un formulaire pour se connecter / créer son compte.
- Connexion
    - Champ email.
    - Champ mot de passe.
    - Bouton de connexion.
    - Si l'email et le mot de passe ne permettent pas la connexion, un toast informe l'utilisateur. Sinon, l'utilisateur est connecté pui redirigé vers la page d'accueil
- Création de compte
    - Champ email.
    - Champ mot de passe.
    - Champ de confirmation du mot de passe.
    - Bouton de création de compte.
    - Si l'email n'a pas le bon format, un message d'erreur s'affiche en dessous du champ. Si l'email est déjà utilisé, un toast l'indique.
    - Si le mot de passe ne correspond pas avec la confirmation du mot de passe une erreur s'affiche en dessous.
    - S'il y a une erreur d'affichée, la création de compte ne s'effectue pas.

### Page "Mes sujets" <a name="my-topics-page"></a>

La page "Mes sujets" contient :
    
- Les mêmes éléments que la page d'accueil
    - Les sujets sont ceux appartenant à l'utilisateur connecté
    - Un bouton de suppression est affiché en dessous de chaque sujet

### Page d'ajout d'un sujet <a name="new-topic-page"></a>

La page d'ajout d'un sujet contient :

- Un formulaire pour créer un nouveau topic avec :
    - Un champ titre
    - Un champ description
    - Un bouton de création du sujet
    - Si le titre et/ou la description est vide une erreur s'affiche en dessous du champ.
    - Si au moins un des deuc champs est vide, la création du sujet ne s'effectue pas.

### Page de détail d'un sujet <a name="topic-detail-page"></a>

La page de détail d'un sujet contient :

- Le titre, la description, l'auteur et la date de création du sujet
- Les commentaires postés sur ce sujet, sous la forme d'une liste du plus vieux au plus récent
- Un bouton pour ajouter un commentaire. Un input et deux boutons apparaissent. Le bouton annuler permet de refermer la zone, et le bouton envoyer permet de poster le commentaire. Si le commentaire est vide quand on essaie de le poster, une erreur apparait sous l'input, et le commentaire n'est pas posté.
- Pour chaque commentaire effectué par la personne connectée, un bouton pour supprimer le commentaire

## Fonctionnalités <a name="fonctionnalities"></a>

### Routing <a name="routing"></a>

Pour faire le routing de l'application j'ai utilisé [**react-router-dom**](#react-dom-router), voir App.tsx.

Il y a 6 routes :

- /* : si aucune autres des 5 routes ne correspond, revient vers celle-ci
- /
- /login
- /my-topics
- /add-topic
- /topic-detail/{id} : id correspond à l'id du topic

J'ai crée un composant PrivateRoute qui va wrapper le composant auquel la route donne accès, pour les routes qui nécessitent d'être connecté. Si un utilisateur non connecté essaie d'y accéder, il est renvoyé vers la page de login, avec un returnUrl correspondant à la route auquel il essayait d'accéder.

### Authentification <a name="authentication"></a>

Pour le système d'authentification, lorsque l'utilisateur essaie de se connecter, l'app envoie les informations de connexion à l'endpoint de l'api /api/login_check.
Si l'authentification est un succès, l'api renvoie un jwt token. Je le stocke dans le local storage et lorsque je voudra vérifier si l'utilisateur est connecté je regarde si le jwt token existe dans le local storage. Pour la déconnexion je supprime le jwt-token du local storage.

Je récupère l'IRI de l'utilisateur (pour pouvoir enregistrer un nouveau sujet par exemple) en décodant le jwt token et en l'extrayant du payload du token.

### Recherche et pagination <a name="search-paginate"></a>

- La barre de recherche et la pagination récupèrent une variable d'état du composant parent ainsi que la fonction qui permet d'en changer la valeur.
- Lorsque la valeur de recherche ou de page change, la query du composant parent qui récupère une liste est invalidée et se relance.
- Pour la recherche, une variable d'état locale sauvegarde la valeur de l'input de recherche, puis set la variable d'état donnée par le parent avec la valeur stockée dans la variable d'état locale.
- Pour la pagination, un algorithme définit quels nombres sont affichés, puis une liste de boutons est crée. Si le nombre de pages dépasse 5, "..." sera inséré avant ou après les nombres aux extremités en fonction d'à quel page l'utilisateur se trouve actuellement. Lorsqu'un bouton est cliqué, la varible d'état du parent est changé.

### Généralités <a name="generalities"></a>

- Chaque appel d'API est accompagné d'un jwt token dans les headers. Si il y en a pas, le jwt token est simplement vide.
- Quand un appel d'API est fait, les erreurs sont récupérées dans un bloc trycatch et un toast d'erreur s'affiche.
- Si une 401 est renvoyée par l'API, l'utilisateur est redirigé vers la page de login avec un toast d'erreur sauf si l'utilisateur est déjà sur la page login.
- Les pages et composants contenant des boutons qui font un appel d'API utilisent le isLoading de la query ou une variable d'état isLoading pour désactiver les boutons le temps que l'appel est résolu, afin de garantir un appel à la fois.
