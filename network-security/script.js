const sendPacketBtn = document.getElementById('sendPacketBtn');
const packetSource = document.getElementById('packetSource');
const packetType = document.getElementById('packetType');
const logList = document.getElementById('logList');
const networkDiagram = document.getElementById('networkDiagram');

function logMessage(message, allowed) {
  const li = document.createElement('li');
  li.textContent = `${new Date().toLocaleTimeString()} — ${message}`;
  li.style.color = allowed ? '#4db6ac' : '#e07a5f';
  logList.prepend(li);
}

sendPacketBtn.addEventListener('click', () => {
  const source = packetSource.value;
  const type = packetType.value;

  let allowed = false;
  if (source === 'internet') {
    allowed = (type === 'allowed');
  } else {
    allowed = true;
  }

  const message = `Packet from ${source} (${type}) was ${allowed ? 'allowed' : 'blocked'} by firewall.`;
  logMessage(message, allowed);

  animatePacket(source, allowed);
});

function animatePacket(source, allowed) {
  const packet = document.createElement('div');
  packet.className = 'packet';
  packet.textContent = '📦';
  if (!allowed) packet.classList.add('blocked');

  let startX, startY, endX, endY;
  const sourceEl = document.getElementById(source);
  const firewallEl = document.querySelector('.firewall');
  const serverEl = document.getElementById('server');

  ({ x: startX, y: startY } = getCenterPosition(sourceEl));
  ({ x: endX, y: endY } = getCenterPosition(firewallEl));

  packet.style.left = `${startX}px`;
  packet.style.top = `${startY}px`;
  networkDiagram.appendChild(packet);

  let progress = 0;
  const steps = 60;
  function stepToFirewall() {
    progress++;
    const currentX = startX + (endX - startX) * (progress / steps);
    const currentY = startY + (endY - startY) * (progress / steps);
    packet.style.left = currentX + 'px';
    packet.style.top = currentY + 'px';

    if (progress < steps) {
      requestAnimationFrame(stepToFirewall);
    } else {
      if (allowed) {
        animateThroughFirewall(packet);
      } else {
        packet.classList.add('blocked');
        setTimeout(() => packet.remove(), 700);
      }
    }
  }

  stepToFirewall();
}

function animateThroughFirewall(packet) {
  const firewallEl = document.querySelector('.firewall');
  const serverEl = document.getElementById('server');

  let startX, startY, endX, endY;
  ({ x: startX, y: startY } = getCenterPosition(firewallEl));
  ({ x: endX, y: endY } = getCenterPosition(serverEl));

  let progress = 0;
  const steps = 60;
  function stepToServer() {
    progress++;
    const currentX = startX + (endX - startX) * (progress / steps);
    const currentY = startY + (endY - startY) * (progress / steps);
    packet.style.left = currentX + 'px';
    packet.style.top = currentY + 'px';

    if (progress < steps) {
      requestAnimationFrame(stepToServer);
    } else {
      setTimeout(() => packet.remove(), 500);
    }
  }

  stepToServer();
}

function getCenterPosition(el) {
  const rect = el.getBoundingClientRect();
  const parentRect = networkDiagram.getBoundingClientRect();
  return {
    x: rect.left - parentRect.left + rect.width / 2 - 12,
    y: rect.top - parentRect.top + rect.height / 2 - 12,
  };
}
