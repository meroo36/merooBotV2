import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
import shuffle from "./helpers/shuffleArray";
dotenv.config();

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
    console.log("Bot is ready!");
});

client.on("messageCreate", (message) => {
    if (message.content === "!create_teams") {
        //                      TeamOne                TeamTwo
        const channels = ["922901843540054107", "922901914839031850"];
        const membersArr: DiscordJS.GuildMember[] = [];
        const members = message.member?.voice.channel?.members;
        members?.forEach((element) => {
            membersArr.push(element);
        });
        const shuffledArr = shuffle(membersArr);
        const half = Math.ceil(shuffledArr.length / 2);

        const teamOne = shuffledArr.splice(0, half);
        const teamTwo = shuffledArr.splice(-half);

        teamOne.forEach((element) => {
            element.voice.setChannel(channels[0]);
        });
        teamTwo.forEach((element) => {
            element.voice.setChannel(channels[1]);
        });

        message.reply("Teams has been created!");
    }
});

client.login(process.env.TOKEN);
