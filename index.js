// call the api and get the response
// structure the response into a card layout and push to the container div

const apiURL = "https://contenthub-api.eco.astro.com.my/channel/all.json";

const formatTime = (dateTime) => {
  const date = new Date(dateTime);

  let hours = date.getHours();
  let minutes = date.getMinutes();

  const day = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const formatMinutes = minutes.toString().padStart(2, "0");

  return `${hours}:${formatMinutes} ${day}`;
};

const getAstroContentGuide = async () => {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    const channels = data.response; // array of channels data

    const channelGrid = document.getElementById("channelGrid");

    channels.forEach((channel) => {
      const card = document.createElement("div"); // contain all the channel data
      card.className = "channel-card";

      const currentSchedule = channel?.currentSchedule || [];

      const logo = document.createElement("img"); // creating the image
      logo.className = "channel-logo";
      logo.src = channel.imageUrl; // take the imageUrl from the channel object inside the array
      logo.alt = "channel logo";

      const info = document.createElement("div"); // creating the info div
      info.className = "channel-info"; // give it a classname for styling purpose
      info.innerHTML = `
      <div class="channel-number" > CH${channel.stbNumber}</div>
      <div class="channel-title" > ${channel.title}</div>
      <div class="playing-now" > On Now ${currentSchedule[0].title}</div>
      <div class="playing-next" > ${formatTime(currentSchedule[1].datetime)} ${
        currentSchedule[1].title
      }</div>
      <div class="playing-later" > ${formatTime(currentSchedule[2].datetime)} ${
        currentSchedule[2].title
      }</div>

      `;

      card.appendChild(logo);
      card.appendChild(info);

      channelGrid.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
};

getAstroContentGuide();
