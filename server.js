require("dotenv").config()
const express = require('express')
const app = express()
const { bots, playerRecord } = require('./data')
const { shuffleArray } = require('./utils')
const Rollbar = require('rollbar');
const cors = require("cors")

app.use(express.json())

app.use(express.static("public"))
app.use(cors())
var rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
        code_version: '1.0.0',
    }
});



app.get('/api/robots', (req, res) => {
    try {
        // rollbar events
        rollbar.log("retrived all bots")
        res.status(200).send(bots)
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        // rollbar events
        rollbar.error(error)
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        rollbar.info(" returned our choise and ocmputer choise", choices)
        res.status(200).send({ choices, compDuo })
    } catch (error) {
        console.log('ERROR GETTING FIVE BOTS', error)
        // rollbar events
        rollbar.error(error)
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let { compDuo, playerDuo } = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage

        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage

        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack
        console.log(compHealthAfterAttack)
        console.log(playerHealthAfterAttack)

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            res.status(200).send('You lost!')
            rollbar.warning("you lost")

        } else {
            playerRecord.wins++
            res.status(200).send('You won!')
        }
    } catch (error) {
        rollbar.error(error)

        console.log('ERROR DUELING', error)
        // rollbar events
        rollbar.error(error)
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        // rollbar events
        rollbar.error(error)
        res.sendStatus(400)
    }
})

app.listen(4000, () => {
    console.log(`Listening on 4000`)
})