const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

// Import des routes
const stationsRoutes = require('./routes/stations')
const sncfRoutes = require('./routes/sncf')

const PORT = process.env.PORT || 3000
const app = express()

app.set('trust proxy', 1)

// Limite les requêtes API
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 30, // max 30 requetes par IP et par minute
})
app.use('/api', limiter)

app.use(cors())

app.get('/api', (req, res) => {
  res.json({
    message: "Bienvenue sur l'API SNCF Proxy",
    endpoints: [
      '/api/:stationCode/departures',
      '/api/:stationCode/arrivals',
      '/api/:vehicleJourneyId/vehicle_journeys',
      '/api/stations?q=research&code=stationCode',
    ],
  })
})

// Routes
app.use('/api/stations', stationsRoutes)
app.use('/api', sncfRoutes)

// Gestion d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Une erreur est survenue sur le serveur.' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

module.exports = app
