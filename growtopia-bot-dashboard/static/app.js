const socket = io();

function render(bots) {
  let table = "";
  let online = 0, offline = 0, banned = 0;

  bots.forEach(b => {
    if (b.status === "online") online++;
    if (b.status === "offline") offline++;
    if (b.status === "banned") banned++;

    let color =
      b.status === "online" ? "text-green-400" :
      b.status === "offline" ? "text-yellow-400" :
      "text-red-400";

    table += `
      <tr class="border-t border-gray-700 text-center">
        <td>${b.name}</td>
        <td class="${color}">${b.status}</td>
        <td>${b.world}</td>
        <td>${b.ping} ms</td>
      </tr>
    `;
  });

  document.getElementById("botTable").innerHTML = table;

  document.getElementById("stats").innerHTML = `
    <div class="bg-[#161b22] p-4">Online: ${online}</div>
    <div class="bg-[#161b22] p-4">Offline: ${offline}</div>
    <div class="bg-[#161b22] p-4">Banned: ${banned}</div>
    <div class="bg-[#161b22] p-4">Total: ${bots.length}</div>
  `;
}

socket.on("update", (data) => {
  render(data);
});