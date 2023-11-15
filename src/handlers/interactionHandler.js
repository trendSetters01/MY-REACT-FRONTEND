async function handleInteraction(interaction) {
  if (!interaction.isCommand()) {
    console.log("Not a command");
    return;
  }

  try {
    console.log("Command name:", interaction.commandName);
    // Dynamically import the command based on the command name
    const commandModule = "";
    // await import(
    //   `./commandHandlers/${interaction.commandName}.js`
    // );
    const commandFunctionName = "";
    // `handle${
    //   interaction.commandName.charAt(0).toUpperCase() +
    //   interaction.commandName.slice(1)
    // }`;
    if (commandModule && commandModule[commandFunctionName]) {
      await commandModule[commandFunctionName](interaction);
    } else {
      await interaction.reply("Command not found. Please try again later.");
    }
  } catch (error) {
    console.error(
      `Error processing command: ${interaction.commandName}. Error:`,
      error
    );
    await interaction.reply(
      "Sorry, an error occurred. Please try again later."
    );
  }
}

export { handleInteraction };
