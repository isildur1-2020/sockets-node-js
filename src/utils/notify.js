const { logSocket } = require("./logs")
// currentSocket -> es el socket que está conectado actualmente
// connections -> Es un diccionario con los sockets new Map(socket, username)
// message -> Es el mensaje que se quiere enviar a los demás sockets
const notifyEveryone = (currentSocket, connections, message) => {
    const socketObjs = connections.keys()
    for (const socketObj of socketObjs) {
        const socket = logSocket(socketObj)
        if (socket === currentSocket) break
        socketObj.write(message)
    }
}

module.exports = {
    notifyEveryone
}