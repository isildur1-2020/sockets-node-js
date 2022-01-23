const { Socket } = require("net")
const socket = new Socket()
const { readline } = require("./utils/readline")

const PORT = 8888
const HOST = "201.221.172.34"

const main = (host, port) => {
    socket.setEncoding("utf-8")
    socket.connect({ host, port })
    console.log("Type 'END' to finish chat")
    console.log("Please type your username: ")
    readline.on("line", (message) => socket.write(message))
    socket.on("data", (data) => console.log(data))
    socket.on("error", (err) => console.log(err))
    socket.on("close", () => {
        console.log("The connection has been finished...")
        process.exit(0)
    })
}

main(HOST, PORT)