const logError = (message) => {
    console.error(message)
    process.exit(1)
}

const logNewClient = (remoteAddress, username) => {
    console.log("=========================================")
    console.log(`New connection from ${remoteAddress}`)
    console.log(`User logged as '${username}'`)
    console.log("=========================================")
}

const logSocket = (socket) => {
    const { remoteAddress, remotePort } = socket
    return `${remoteAddress}:${remotePort}`
}

module.exports = {
    logError,
    logNewClient,
    logSocket
}