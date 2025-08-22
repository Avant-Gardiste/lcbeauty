// assets/js/firebase-rdv.js
// Type: module
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

/* ====== Remplace cet objet par ton config récupérée dans Firebase console ====== */
const firebaseConfig = {
  apiKey: "AIzaSyB8ibrXiGUmhc4U6AVZaHm3NdiHrJGc5BU",
  authDomain: "lc-beauty.firebaseapp.com",
  projectId: "lc-beauty",
  storageBucket: "lc-beauty.firebasestorage.app",
  messagingSenderId: "294672948721",
  appId: "1:294672948721:web:b0e5358af31b722ab17850"
};
/* ============================================================================= */

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// cible le formulaire (id ajouté dans l'étape HTML)
const form = document.getElementById("rendezvous-form");
if (!form) {
  console.warn("Formulaire #rendezvous-form introuvable.");
} else {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // récupération des valeurs
    const nom = (form.name?.value || "").trim();
    const email = (form.email_address?.value || "").trim();
    const telephone = (form.phone?.value || "").trim();
    const service = (form.category?.value || "").trim();
    const date = (form.date?.value || "").trim(); // yyyy-mm-dd
    const message = (form.message?.value || "").trim();

    // validation simple
    if (!nom || !telephone || !date) {
      alert("Merci de renseigner au minimum le nom, le téléphone et la date.");
      return;
    }

    // désactiver le bouton pendant l'envoi
    const btn = form.querySelector(".form-btn");
    if (btn) btn.disabled = true;

    try {
      await addDoc(collection(db, "rendez-vous"), {
        nom,
        email,
        telephone,
        service,
        date,
        message,
        createdAt: serverTimestamp()
      });

      // succès
      alert("Merci ! Votre demande a bien été envoyée. Nous vous répondrons rapidement.");
      form.reset();

    } catch (err) {
      console.error("Erreur Firestore:", err);
      alert("Erreur lors de l'envoi. Réessaie ou contacte le salon directement.");
    } finally {
      if (btn) btn.disabled = false;
    }
  });
}