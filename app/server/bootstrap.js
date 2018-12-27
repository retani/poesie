Meteor.startup(function () {
  Meteor.setInterval(gameUpdate,1000)
});

const maxTime = 60
const countdown = 5

const gameUpdate = function() {
  const activeSession = Sessions.current()
  if (!activeSession) {
    console.log("no active session")
    return
  }

  const entry = activeSession.currentEntry()

  const nowTimeS = Math.floor(Date.now() / 1000)
  const endTimeS = Math.floor(entry.startTime.getTime() / 1000 ) + maxTime
  const countdown = endTimeS - nowTimeS


  // render countdown
  if (countdown <= 5) {
    console.log("time is running out " + countdown)
    Sessions.update(activeSession, { $set: { largeMessage: ""+countdown}})
  } else {
    Sessions.update(activeSession, { $set: { largeMessage: ""}})
  }

  // next poem!
  if (countdown <= 0) {
    Meteor.call("sessions/next")
  }
}