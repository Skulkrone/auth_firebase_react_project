import { createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase-config";
// ici si on créé un context proider, il n'y aura pas toute la logique et le données qu'on a envie de passer à tous nos composants. Donc on va utiliser un autre composant : un composant d'ordre supérieur (comme fonction d'ordre supérieur : fonctions qui peuvent utiliser une fonction callback ou en retourner une autre)

export const UserContext = createContext();

export function UserContextProvider(props) {

  // onAuthStateChanged = nous permet d'enregistrer un currentUser, une fois qu'on l'aura enregistrer dans le contexte, on pourra vérifier globalement si on a un currentUser en cours ! S'est on connecté ou juste inscrit ? et à ce moment là, acéder à des routes privées ou pas

  const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd);
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  // setCurrentUser = user qui va s'inscrire
  // setLoadingData = le temps qu'on va recevoir une réponse depuis firebase, on va avoir besoin d'une variable (loadingData) qui va être utilisée
  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);



  useEffect(() => {

    // Ceci est un observateur :
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser)
      // Attendre de bien avoir les données et ensuite on montre l'application setLoadingData(false)
      setLoadingData(false)
    })

    return unsubscribe;

  }, [])

  // Modal Section
  const [modalState, setModalState] = useState({
    // de base, on ne veut pas voir nos Modals
    signUpModal: false,
    signInModal: false,
  });

  const toggleModals = (modal) => {
    if (modal === "signIn") {
      setModalState({
        signUpModal: false,
        signInModal: true,
      });
    }
    if (modal === "signUp") {
      setModalState({
        signUpModal: true,
        signInModal: false,
      });
      // display: "block";
    }
    if (modal === "close") {
      setModalState({
        signUpModal: false,
        signInModal: false,
      });
    }
  };

  return (
    <UserContext.Provider value={{ modalState, toggleModals, signUp, currentUser, signIn }}>
      {/* Seulement qd on a les données, on envoie l'application */}
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
