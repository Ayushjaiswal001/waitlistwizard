/* =============================================================
   WaitlistWizard — Radial Orbital Timeline
   Vanilla JS implementation — no React, no build step
   ============================================================= */
(function () {
  'use strict';

  const container = document.getElementById('orbitalContainer');
  if (!container) return;

  const viewport = container.querySelector('.orbital-viewport');
  if (!viewport) return;

  /* ── Timeline Data (WaitlistWizard workflow) ──────────── */
  const data = [
    {
      id: 1, title: 'Create', icon: '✏️', date: 'Step 1',
      content: 'Build your waitlist page with our intuitive builder. Add your branding, copy, and custom fields in 60 seconds.',
      relatedIds: [2], status: 'completed', energy: 100,
    },
    {
      id: 2, title: 'Design', icon: '🎨', date: 'Step 2',
      content: 'Customize every detail — colors, fonts, accent tones, and card layout. Make it unmistakably yours.',
      relatedIds: [1, 3], status: 'completed', energy: 90,
    },
    {
      id: 3, title: 'Launch', icon: '🚀', date: 'Step 3',
      content: 'Share your unique link across social media, email campaigns, and ads to start collecting signups.',
      relatedIds: [2, 4], status: 'in-progress', energy: 65,
    },
    {
      id: 4, title: 'Grow', icon: '📈', date: 'Step 4',
      content: 'Built-in viral referral mechanics reward sharing and drive exponential waitlist growth.',
      relatedIds: [3, 5], status: 'pending', energy: 35,
    },
    {
      id: 5, title: 'Analyze', icon: '📊', date: 'Step 5',
      content: 'Track signups, page views, conversion rates, and referral performance — all in real time.',
      relatedIds: [4, 1], status: 'pending', energy: 15,
    },
  ];

  /* ── State ────────────────────────────────────────────── */
  let rotation = 0;
  let autoRotate = true;
  let activeId = null;
  let raf = null;

  /* ── Build DOM ────────────────────────────────────────── */
  const nodeEls = {};

  data.forEach(function (item) {
    const node = document.createElement('div');
    node.className = 'orb-node';
    node.setAttribute('data-id', item.id);

    // Energy glow
    const eSize = item.energy * 0.5 + 44;
    const energy = document.createElement('div');
    energy.className = 'orb-energy';
    energy.style.width = eSize + 'px';
    energy.style.height = eSize + 'px';
    energy.style.left = -(eSize - 44) / 2 + 'px';
    energy.style.top = -(eSize - 44) / 2 + 'px';
    node.appendChild(energy);

    // Dot icon
    const dot = document.createElement('div');
    dot.className = 'orb-node-dot';
    dot.textContent = item.icon;
    node.appendChild(dot);

    // Label
    const label = document.createElement('div');
    label.className = 'orb-label';
    label.textContent = item.title;
    node.appendChild(label);

    // Expanded card
    node.appendChild(buildCard(item));

    // Click handler
    node.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleItem(item.id);
    });

    viewport.appendChild(node);
    nodeEls[item.id] = node;
  });

  /* ── Build Card ───────────────────────────────────────── */
  function buildCard(item) {
    var card = document.createElement('div');
    card.className = 'orb-card';

    var statusLabel =
      item.status === 'completed' ? 'COMPLETE' :
      item.status === 'in-progress' ? 'IN PROGRESS' : 'PENDING';

    var connectedHtml = '';
    if (item.relatedIds.length > 0) {
      var btns = item.relatedIds.map(function (rid) {
        var rel = data.find(function (d) { return d.id === rid; });
        return '<button class="orb-connected-btn" data-goto="' + rid + '">' + (rel ? rel.title : '') + ' →</button>';
      }).join('');
      connectedHtml =
        '<div class="orb-connected">' +
          '<div class="orb-connected-title">⟡ Connected Nodes</div>' +
          '<div>' + btns + '</div>' +
        '</div>';
    }

    card.innerHTML =
      '<div class="orb-card-header">' +
        '<span class="orb-card-badge ' + item.status + '">' + statusLabel + '</span>' +
        '<span class="orb-card-date">' + item.date + '</span>' +
      '</div>' +
      '<div class="orb-card-title">' + item.title + '</div>' +
      '<div class="orb-card-body">' +
        '<p>' + item.content + '</p>' +
        '<div class="orb-energy-bar">' +
          '<div class="orb-energy-header">' +
            '<span>⚡ Energy Level</span>' +
            '<span>' + item.energy + '%</span>' +
          '</div>' +
          '<div class="orb-energy-track">' +
            '<div class="orb-energy-fill" style="width:' + item.energy + '%"></div>' +
          '</div>' +
        '</div>' +
        connectedHtml +
      '</div>';

    // Connected-node buttons
    var goBtns = card.querySelectorAll('.orb-connected-btn');
    goBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleItem(parseInt(btn.getAttribute('data-goto')));
      });
    });

    return card;
  }

  /* ── Toggle Item ──────────────────────────────────────── */
  function toggleItem(id) {
    if (activeId === id) {
      activeId = null;
      autoRotate = true;
    } else {
      activeId = id;
      autoRotate = false;
      centerOnNode(id);
    }
    syncClasses();
  }

  /* ── Center rotation on node ──────────────────────────── */
  function centerOnNode(id) {
    var idx = data.findIndex(function (d) { return d.id === id; });
    var targetAngle = (idx / data.length) * 360;
    rotation = 270 - targetAngle;
  }

  /* ── Update active/related CSS classes ────────────────── */
  function syncClasses() {
    var relIds = [];
    if (activeId) {
      var active = data.find(function (d) { return d.id === activeId; });
      if (active) relIds = active.relatedIds;
    }

    Object.keys(nodeEls).forEach(function (key) {
      var nid = parseInt(key);
      var el = nodeEls[nid];
      if (nid === activeId) {
        el.classList.add('active');
        el.classList.remove('related');
      } else if (relIds.indexOf(nid) !== -1) {
        el.classList.remove('active');
        el.classList.add('related');
      } else {
        el.classList.remove('active');
        el.classList.remove('related');
      }
    });
  }

  /* ── Radius (responsive) ──────────────────────────────── */
  function getRadius() {
    return container.offsetWidth < 640 ? 130 : 195;
  }

  /* ── Position calc ────────────────────────────────────── */
  function calcPos(index, total) {
    var angle = ((index / total) * 360 + rotation) % 360;
    var radius = getRadius();
    var rad = (angle * Math.PI) / 180;
    return {
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
      z: Math.round(100 + 50 * Math.cos(rad)),
      o: Math.max(0.35, Math.min(1, 0.35 + 0.65 * ((1 + Math.sin(rad)) / 2))),
    };
  }

  /* ── Render loop ──────────────────────────────────────── */
  function render() {
    if (autoRotate) {
      rotation = (rotation + 0.12) % 360;
    }

    data.forEach(function (item, i) {
      var p = calcPos(i, data.length);
      var el = nodeEls[item.id];
      var isActive = item.id === activeId;
      el.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px)';
      el.style.zIndex = isActive ? 200 : p.z;
      if (!isActive) el.style.opacity = p.o;
      else el.style.opacity = 1;
    });

    raf = requestAnimationFrame(render);
  }

  /* ── Deselect on background click ─────────────────────── */
  container.addEventListener('click', function (e) {
    var t = e.target;
    if (
      t === container || t === viewport ||
      t.classList.contains('orb-ring') ||
      t.classList.contains('orb-center') ||
      t.classList.contains('orb-center-inner') ||
      t.classList.contains('orb-ping')
    ) {
      activeId = null;
      autoRotate = true;
      syncClasses();
    }
  });

  /* ── Start ────────────────────────────────────────────── */
  render();
})();
