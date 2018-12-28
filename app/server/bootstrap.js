Meteor.startup(function () {
  Meteor.setInterval(gameUpdate,1000)
});

const minTime = 45 // seconds
const maxTime = 75 // seconds
const countdown = 5 // seconds
const touchBonus = 5 // seconds

const gameUpdate = function() {
  const activeSession = Sessions.current()
  if (!activeSession) {
    console.log("no active session")
    return
  }

  const entry = activeSession.currentEntry()

  const nowTimeS = Math.floor(Date.now() / 1000)
  const touchedTimeS = Math.floor(activeSession.touchedAt.getTime() / 1000)
  const startTimeS = Math.floor(entry.startTime.getTime() / 1000)
  const endTimeS = Math.min([Math.max([startTimeS + minTime], [touchedTimeS + touchBonus])], [startTimeS + maxTime])
  const countdown = endTimeS - nowTimeS


  // render countdown
  if (countdown <= 5) {
    console.log("time is running out " + countdown)
    Sessions.update(activeSession, { $set: { 
      countdown: countdown,
      largeMessage: ""+countdown,
    }})
  } else {
    Sessions.update(activeSession, { $set: { 
      countdown: countdown,
      largeMessage: ""
    }})
  }

  // next poem!
  if (countdown <= 0) {
    Meteor.call("sessions/next")
  }
}