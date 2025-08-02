const express = require('express')
const apicache = require('apicache')
const fs = require('fs')
const path = require('path')

const router = express.Router()
const cache = apicache.middleware

// Charger les données des gares
const garesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'datas', 'gares.json'), 'utf8')
)

// Recherche de gares
router.get('/', cache('5 minutes'), (req, res) => {
  const { q, code } = req.query

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

  // Limiter les résultats à 50 pour éviter des réponses trop lourdes
  const limitedResults = results.slice(0, 50)

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
