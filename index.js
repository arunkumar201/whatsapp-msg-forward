const wa = require("@open-wa/wa-automate");

async function start(client) {
	const groupIdFrom = "120363257019361988@g.us"; // test1
	const groupIdTo="120363254782296180@g.us"; //test2
	
	// Listen for new messages
	client.onMessage(async (message) => {
		if (
			message?.isGroupMsg &&
			message?.body &&
			message?.chat?.groupMetadata?.id === groupIdFrom
		) {
			await client.forwardMessages(groupIdTo, message?.id, false);
		}
	});
}
(async () => {
	const client = await wa.create({
		sessionId: "MSG_FORWARD_BOT",
		//required to enable multiDevice support
		multiDevice: true,
		//wait only 60 seconds to get a connection with the host account device
		authTimeout: 60,
		blockCrashLogs: true,
		disableSpins: true,
		headless: true,
		hostNotificationLang: "PT_BR",
		logConsole: false,
		popup: true,
		port:4000,
		qrTimeout: 0, 
	});
	start(client);
})();
