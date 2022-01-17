const { Server } = require("net")
const server = new Server()
const connections = new Map()
const { logError, logNewClient, logSocket } = require("./utils/logs")
const { notifyEveryone } = require("./utils/notify")
const END = "END"

const listen = (port, host) => {
    server.on("connection", (socket) => {
        socket.setEncoding("utf-8")
        connections.set(socket, 0)
        const remoteSocket = logSocket(socket)
        console.log(`** New connection from ${remoteSocket} **`)

        socket.on("data", (message) => {
            if (message === END) return socket.end()
            // to assign a username to socket
            if (!connections.get(socket)) {
                connections.set(socket, message)
                logNewClient(remoteSocket, connections.get(socket))
                const everyoneMsg = `${connections.get(socket)} se ha conectado`
                notifyEveryone(remoteSocket, connections, everyoneMsg)
            }
            else {
                const everyoneMsg = `[${remoteSocket}] (${connections.get(socket)}): ${message}`
                notifyEveryone(socket, connections, everyoneMsg)
            }
        })

        socket.on("close", () => console.log(`Connection with ${remoteSocket} closed`))
        socket.on("error", (err) => logError(err.message))
    })

    server.on("error", (err) => logError(err.message))
    server.listen({ port, host }, () => console.log(`Listening on port ${port}`))
}


const main = () => {
    const argv = process.argv
    if (argv.length < 3) {
        logError("Please type the PORT.")
        logError("Usage: node file PORT")
    }
    const PORT = argv[2]
    if (isNaN(PORT)) logError("PORT flag must be a number.")
    const HOST = "0.0.0.0"
    listen(PORT, HOST)
}

if (require.main === module) main()