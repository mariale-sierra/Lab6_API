const getMessages = async () => {
    const response = await fetch("/api/messages");
    const messages = await response.json();

    const ul = document.getElementById("messages");
    ul.innerHTML = "";

    for (let i = 0; i < messages.length; i++) {
        const message = messages[i];

        const li = document.createElement("li");
        li.innerHTML = `<strong>${message.user}</strong>: ${message.text}`;

        ul.append(li);
    }

    // bajar el scroll al último mensaje
    ul.scrollTop = ul.scrollHeight;

    return messages;
}

const postMessage = async (message) => {
    await fetch("/api/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message),
    });

    getMessages();
}

getMessages();

//autorefresh
setInterval(() => {
    getMessages();
}, 5000);


document.getElementById("send").addEventListener("click", () => {
    const message = document.getElementById("message").text();

    postMessage({
        user: "ales",
        text: message,
    });
});

//event listener enter para enviar mensaje
const textarea = document.getElementById("message")

textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        document.getElementById("send").click()
    }
})