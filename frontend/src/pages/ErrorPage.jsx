import { useNavigate } from "react-router-dom"
import Header from "../components/layout/Header"

function ErrorPage(){
  const navigate = useNavigate()

  const goHome = () => navigate('/', { replace: true })

  return (
    <>
      <Header />
      <div className="not-found">
        <h1>Page introuvable</h1>
        <p>Il semble que l'URL que vous avez saisie n'existe pas. Vérifiez l'adresse ou retournez à la page d'accueil.</p>
        <button onClick={goHome}>Retour à l'accueil</button>
      </div>
    </>
  )
}

export default ErrorPage