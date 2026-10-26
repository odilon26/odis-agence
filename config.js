// ─────────────────────────────────────────────────────────────
//  Configuration d'Odi's Agence
//  Remplacez les valeurs COLLER_ICI par celles de votre projet Firebase :
//  Console Firebase > Paramètres du projet (roue dentée) > Vos applications > Configuration.
//  Gardez les guillemets. Ne touchez pas au reste du fichier.
// ─────────────────────────────────────────────────────────────
window.ODIS_CONFIG = {
  firebase: {
    apiKey: "AIzaSyB4df4tDlW-VdQ02EXFnfvL2H0oWzFftPw",
    authDomain: "odis-agence-86b63.firebaseapp.com",
    projectId: "odis-agence-86b63",
    storageBucket: "odis-agence-86b63.firebasestorage.app",
    messagingSenderId: "274073445189",
    appId: "1:274073445189:web:1dc60b78c2b223c30d542c"
  },

  // Adresse du compte administrateur (la même que dans firestore.rules)
  adminEmail: "informaticiendraboisso@gmail.com",

  // Valeurs par défaut de l'abonnement (modifiables ensuite dans la Console de l'app)
  waveLink: "https://pay.wave.com/m/M_ci_w8OF1owScWak/c/ci/?amount=2000",
  prix: 2000,
  prixSup: 1000,
  periode: 30,
  essai: 7
};
