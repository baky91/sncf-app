const express = require('express')
const apicache = require('apicache')
const axios = require('axios')

const router = express.Router()
const cache = apicache.middleware

// Départs
router.get('/:stationCode/departures', cache('1 minute'), async (req, res) => {
  const { stationCode } = req.params
  const { physical_mode } = req.query

  try {
    const response = await axios.get(
      `https://api.sncf.com/v1/coverage/sncf/stop_areas/${stationCode}${
        physical_mode ? `/physical_modes/${physical_mode}` : ''
      }/departures`,
      {
        headers: { Authorization: `${process.env.SNCF_API_KEY}` },
      }
    )
    res.json(response.data)
  } catch (e) {
    // Erreur qui vient d'axios et a une réponse (ex: aucune données)
    if (e.isAxiosError && e.response) {
      console.error('Erreur API :', e.response.data)
      res.status(e.response.status).json(e.response.data)
    } else {
      // Autre type d'erreur (ex: réseau, objet introuvable...)
      console.error('Erreur :', e.message)
      res.status(500).json({ error: 'Impossible de récupérer les départs' })
    }
  }
})

// Arrivées
router.get('/:stationCode/arrivals', cache('1 minute'), async (req, res) => {
  const { stationCode } = req.params
  const { physical_mode } = req.query

  try {
    const response = await axios.get(
      `https://api.sncf.com/v1/coverage/sncf/stop_areas/${stationCode}${
        physical_mode ? `/physical_modes/${physical_mode}` : ''
      }/arrivals?forbidden_id%5B%5D=network%3ASNCF%3ATNRER&forbidden_id%5B%5D=network%3ASNCF%3ATN&`,
      {
        headers: { Authorization: `${process.env.SNCF_API_KEY}` },
      }
    )
    res.json(response.data)
  } catch (e) {
    // Erreur qui vient d'axios et a une réponse (ex: aucune données)
    if (e.isAxiosError && e.response) {
      console.error('Erreur API :', e.response.data)
      res.status(e.response.status).json(e.response.data)
    } else {
      // Autre type d'erreur (ex: réseau, objet introuvable...)
      console.error('Erreur :', e.message)
      res.status(500).json({ error: 'Impossible de récupérer les arrivées' })
    }
  }
})

// Itinéraires
router.get(
  '/:vehicleJourneyId/vehicle_journeys',
  cache('1 minute'),
  async (req, res) => {
    const { vehicleJourneyId } = req.params

    try {
      const response = await axios.get(
        `https://api.sncf.com/v1/coverage/sncf/vehicle_journeys/${vehicleJourneyId}?depth=2`,
        {
          headers: { Authorization: `${process.env.SNCF_API_KEY}` },
        }
      )
      res.json(response.data)
    } catch (error) {
      console.error('Erreur :', error.message)
      res.status(500).json({ error: 'Impossible de récupérer les itinéraires' })
    }
  }
)

module.exports = router
