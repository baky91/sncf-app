const express = require('express')
const apicache = require('apicache')
const fs = require('fs')
const path = require('path')

const router = express.Router()
const cache = apicache.middleware

// Charger les données des gares
const garesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', 'gares.json'), 'utf8')
)

// Endpoint pour récupérer toutes les gares (pour le cache frontend)
router.get('/all', cache('1 hour'), (req, res) => {
  res.json({
    total: garesData.length,
    stations: garesData,
  })
})

// Recherche de gares
router.get('/', cache('5 minutes'), (req, res) => {
  const { q, code, count } = req.query  

  if (q && q.length < 2) {
    return res.status(400).json({
      error:
        "Le paramètre de recherche 'q' doit contenir au moins 2 caractères",
    })
  }

  let searchTerm = ''
  if (q) {
    searchTerm = q.toLowerCase().trim()
  }

  // Recherche dans le nom de la gare et le nom de la ville
  const results = garesData.filter(
    (gare) =>
      (q &&
        (normalize(gare.name).includes(normalize(searchTerm)) ||
          normalize(gare.city).includes(normalize(searchTerm)))) ||
      gare.id === code
  )

  if (code && results.length === 0) {
    return res.status(404).json({
      error: `Aucune gare avec le code ${code} n'a été trouvée.`,
    })
  }

  // Limiter les résultats
  const limitedResults = count ? results.slice(0, count) : results

  res.json({
    query: q,
    code: code,
    total: results.length,
    returned: limitedResults.length,
    stations: limitedResults,
  })
})

function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD') // décomposer les caractères accentués
    .replace(/[\u0300-\u036f]/g, '') // supprimer accents
    .replace(/[\s\-_]/g, '') // supprimer espaces, tirets et underscores
}

module.exports = router
