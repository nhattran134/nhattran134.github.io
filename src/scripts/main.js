(function () {
  'use strict';

  // 1. Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('active');
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    reveals.forEach(function (el) { revealObs.observe(el); });
  }

  // 2. Stagger assignment
  var grids = document.querySelectorAll('.stats-grid, .stat-grid, .services-grid, .skills-grid, .projects-grid, .testimonials-grid, .cert-grid, .tags, .tag-row');
  grids.forEach(function (grid) {
    var children = grid.querySelectorAll('.reveal');
    children.forEach(function (child, i) {
      child.classList.add('stagger-' + ((i % 6) + 1));
    });
  });

  // 3. Counter animation
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var counterObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          var suffix = el.textContent.replace(/[0-9]/g, '');
          var start = performance.now();
          var duration = 1500;
          function step(now) {
            var t = Math.min((now - start) / duration, 1);
            var ease = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * ease) + suffix;
            if (t < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          counterObs.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );
    counters.forEach(function (el) { counterObs.observe(el); });
  }

  // 4. Smooth scroll + close mobile menu
  var toggle = document.querySelector('[data-nav-toggle]');
  var links = document.querySelector('[data-nav-links]');
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      if (toggle && links && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 5. Mobile menu toggle
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      links.classList.toggle('open');
    });
  }

  // 6. Magnetic buttons
  document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var r = btn.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width / 2) * 0.3;
      var y = (e.clientY - r.top - r.height / 2) * 0.3;
      btn.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });
  });

  // 7. Back-to-top + 8. Nav scroll effect
  var backToTop = document.querySelector('.back-to-top');
  var nav = document.querySelector('nav, .nav');
  window.addEventListener('scroll', function () {
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500);
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 9. Card tilt
  document.querySelectorAll('[data-tilt]').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'perspective(500px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 10) + 'deg)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  // 10. Contact form AJAX
  var form = document.getElementById('contactForm') || document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
        .then(function (res) {
          if (!res.ok) throw new Error(res.status);
          btn.textContent = 'Sent!';
          form.reset();
          setTimeout(function () { btn.textContent = original; btn.disabled = false; }, 3000);
        })
        .catch(function () {
          btn.textContent = 'Error — try again';
          btn.disabled = false;
          setTimeout(function () { btn.textContent = original; }, 3000);
        });
    });
  }

  // 11. Hero code typing animation
  var codeEl = document.getElementById('hero-code-text');
  if (codeEl) {
    var lines = [
      { text: '# pipeline.yml', cls: 'cm' },
      { text: 'name: ', cls: 'key', rest: [{ text: 'CI/CD Pipeline', cls: 'str' }] },
      { text: 'on: ', cls: 'key', rest: [{ text: '[push, pull_request]', cls: 'val' }] },
      { text: '' },
      { text: 'jobs:', cls: 'key' },
      { text: '  discover:', cls: 'key' },
      { text: '    runs-on: ', cls: 'key', rest: [{ text: 'self-hosted', cls: 'str' }] },
      { text: '    outputs:', cls: 'key' },
      { text: '      matrix: ', cls: 'key', rest: [{ text: '${{ steps.detect.outputs.projects }}', cls: 'fn' }] },
      { text: '' },
      { text: '  build:', cls: 'key' },
      { text: '    needs: ', cls: 'key', rest: [{ text: 'discover', cls: 'str' }] },
      { text: '    strategy:', cls: 'key' },
      { text: '      matrix: ', cls: 'key', rest: [{ text: '${{ fromJson(needs.discover.outputs.matrix) }}', cls: 'fn' }] },
      { text: '    steps:', cls: 'key' },
      { text: '      - uses: ', cls: 'key', rest: [{ text: 'actions/checkout@v4', cls: 'str' }] },
      { text: '      - run: ', cls: 'key', rest: [{ text: 'terraform init && terraform plan', cls: 'fn' }] },
      { text: '      - run: ', cls: 'key', rest: [{ text: 'trivy fs --severity HIGH,CRITICAL .', cls: 'fn' }] },
      { text: '' },
      { text: '  deploy:', cls: 'key' },
      { text: '    needs: ', cls: 'key', rest: [{ text: '[build]', cls: 'str' }] },
      { text: '    environment: ', cls: 'key', rest: [{ text: 'production', cls: 'val' }] },
      { text: '    permissions:', cls: 'key' },
      { text: '      id-token: ', cls: 'key', rest: [{ text: 'write  ', cls: 'val' }, { text: '# OIDC', cls: 'cm' }] },
      { text: '    steps:', cls: 'key' },
      { text: '      - run: ', cls: 'key', rest: [{ text: 'terraform apply -auto-approve', cls: 'fn' }] },
      { text: '' },
      { text: '# Apply complete! Resources: 12 added, 3 changed, 0 destroyed.', cls: 'cm' },
    ];

    var lineIdx = 0;
    var charIdx = 0;
    var currentLine = '';
    var output = '';
    var speed = 30;
    var lineDelay = 200;

    function getLineText(line) {
      var t = line.text;
      if (line.rest) {
        line.rest.forEach(function (r) { t += r.text; });
      }
      return t;
    }

    function renderLine(line) {
      if (!line.text && !line.rest) return '';
      var html = '';
      if (line.cls) {
        html += '<span class="' + line.cls + '">' + escHtml(line.text) + '</span>';
      } else {
        html += escHtml(line.text);
      }
      if (line.rest) {
        line.rest.forEach(function (r) {
          html += '<span class="' + r.cls + '">' + escHtml(r.text) + '</span>';
        });
      }
      return html;
    }

    function escHtml(s) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function renderPartial(line, chars) {
      var plain = getLineText(line);
      var visible = plain.substring(0, chars);
      // Build syntax-highlighted partial
      var pos = 0;
      var parts = [];
      if (line.cls) parts.push({ text: line.text, cls: line.cls });
      else parts.push({ text: line.text, cls: '' });
      if (line.rest) {
        line.rest.forEach(function (r) { parts.push({ text: r.text, cls: r.cls }); });
      }
      var html = '';
      var remaining = chars;
      for (var i = 0; i < parts.length && remaining > 0; i++) {
        var slice = parts[i].text.substring(0, remaining);
        remaining -= slice.length;
        if (parts[i].cls) {
          html += '<span class="' + parts[i].cls + '">' + escHtml(slice) + '</span>';
        } else {
          html += escHtml(slice);
        }
      }
      return html;
    }

    function typeLine() {
      if (lineIdx >= lines.length) return;
      var line = lines[lineIdx];
      var fullLen = getLineText(line).length;

      if (charIdx <= fullLen) {
        codeEl.innerHTML = output + renderPartial(line, charIdx);
        charIdx++;
        codeEl.parentElement.scrollTop = codeEl.parentElement.scrollHeight;
        var vimPos = document.getElementById('vim-pos');
        if (vimPos) vimPos.textContent = (lineIdx + 1) + ',' + charIdx;
        setTimeout(typeLine, speed);
      } else {
        output += renderLine(line) + '\n';
        codeEl.innerHTML = output;
        codeEl.parentElement.scrollTop = codeEl.parentElement.scrollHeight;
        lineIdx++;
        charIdx = 0;
        if (lineIdx >= lines.length) {
          var vimMode = document.getElementById('vim-mode');
          var vimPos2 = document.getElementById('vim-pos');
          if (vimMode) vimMode.textContent = '-- NORMAL --';
          if (vimMode) vimMode.style.color = '#bd93f9';
          if (vimPos2) vimPos2.textContent = lines.length + ',1';
          return;
        }
        lineIdx++;
        charIdx = 0;
        setTimeout(typeLine, lineDelay);
      }
    }

    // Start after a short delay
    setTimeout(typeLine, 800);
  }

  // 12. Particle network
  var canvas = document.getElementById('hero-particles');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var count = 60;
    var maxDist = 160;
    var mouse = { x: -9999, y: -9999 };
    var mouseRadius = 200;

    function resize() {
      var hero = document.getElementById('hero');
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    var hero = document.getElementById('hero');
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        baseVx: (Math.random() - 0.5) * 0.5,
        baseVy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2.5 + 1,
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw lines from cursor to nearby particles
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var dmx = p.x - mouse.x;
        var dmy = p.y - mouse.y;
        var dm = Math.sqrt(dmx * dmx + dmy * dmy);
        if (dm < mouseRadius) {
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = 'rgba(20, 184, 166, ' + (0.4 * (1 - dm / mouseRadius)) + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Attract toward cursor
          var force = (1 - dm / mouseRadius) * 0.3;
          p.vx -= (dmx / dm) * force;
          p.vy -= (dmy / dm) * force;
        }
      }

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        // Blend back toward base velocity to keep drifting
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(20, 184, 166, 0.6)';
        ctx.fill();

        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var dx = p.x - q.x;
          var dy = p.y - q.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'rgba(139, 92, 246, ' + (0.3 * (1 - dist / maxDist)) + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }
})();
