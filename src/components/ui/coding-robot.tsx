import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CodingRobotProps { className?: string; }

export function CodingRobot({ className }: CodingRobotProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const w = mount.clientWidth || 500, h = mount.clientHeight || 600;

    // Camera: front view, slightly above, matching image 4 perspective
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.set(0, 4.0, 7.5);
    camera.lookAt(0, 3.0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // ── MATERIALS ──────────────────────────────────────────────
    // Gray head casing (medium gray, slightly matte)
    const grayCase = new THREE.MeshStandardMaterial({ color: 0x909090, metalness: 0.12, roughness: 0.65 });
    // Black screen face (glossy dark)
    const screenFace = new THREE.MeshStandardMaterial({ color: 0x080808, metalness: 0.6, roughness: 0.15 });
    // Eyes (warm white glow)
    const eyeWhite = new THREE.MeshStandardMaterial({ color: 0xfff5e0, emissive: 0xfff0d0, emissiveIntensity: 2.5 });
    // Headphones (matte black)
    const hpMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.12, roughness: 0.88 });
    // Hoodie (deep black fabric)
    const hoodie = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.96 });
    // Metallic hands
    const metalHand = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.65, roughness: 0.35 });
    const metalJoint = new THREE.MeshStandardMaterial({ color: 0x6a6a6a, metalness: 0.7, roughness: 0.45 });
    // Neck
    const neckMat = new THREE.MeshStandardMaterial({ color: 0x7a7a7a, metalness: 0.5, roughness: 0.4 });
    // Desk & chair
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x181818, metalness: 0.1, roughness: 0.92 });
    const chairMat = new THREE.MeshStandardMaterial({ color: 0x1e1e1e, roughness: 0.88 });
    const chairMeshMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.7, transparent: true, opacity: 0.9 });
    // Keyboard
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.15, roughness: 0.85 });

    // ══════════════════════════════════════════════════════════
    // HEAD GROUP (tracks cursor)
    // ══════════════════════════════════════════════════════════
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 4.55, 0);
    scene.add(headGroup);

    // GRAY OUTER CASING — rounded shape using sphere, wider than tall
    const headShell = new THREE.Mesh(
      new THREE.SphereGeometry(0.72, 32, 24),
      grayCase
    );
    headShell.scale.set(1.35, 1.0, 1.05);
    headGroup.add(headShell);

    // BLACK SCREEN FACE — flat panel inset on front of head
    // This sits ON the front surface so the gray shell peeks around the edges as a frame
    const screenPanel = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.82, 0.06),
      screenFace
    );
    screenPanel.position.set(0, -0.02, 0.58);
    headGroup.add(screenPanel);

    // Soften screen edges with small dark cylinders at corners (rounded screen border)
    const cornerR = 0.08;
    const cornerGeo = new THREE.CylinderGeometry(cornerR, cornerR, 0.06, 8);
    [[-0.47, 0.31], [0.47, 0.31], [-0.47, -0.35], [0.47, -0.35]].forEach(([cx, cy]) => {
      const c = new THREE.Mesh(cornerGeo, screenFace);
      c.rotation.x = Math.PI / 2;
      c.position.set(cx, cy, 0.58);
      headGroup.add(c);
    });

    // EYES — vertical rounded rectangles (using CapsuleGeometry)
    const leftEye = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.09, 0.16, 8, 16),
      eyeWhite
    );
    leftEye.position.set(-0.22, 0.0, 0.63);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.09, 0.16, 8, 16),
      eyeWhite
    );
    rightEye.position.set(0.22, 0.0, 0.63);
    headGroup.add(rightEye);

    // Eye glow
    const lGlow = new THREE.PointLight(0xfff0d0, 0.8, 2.5);
    lGlow.position.set(-0.22, 0, 0.75);
    headGroup.add(lGlow);
    const rGlow = new THREE.PointLight(0xfff0d0, 0.8, 2.5);
    rGlow.position.set(0.22, 0, 0.75);
    headGroup.add(rGlow);

    // ── HEADPHONES ────────────────────────────────────────────
    // Headband — thick arc over top
    const hband = new THREE.Mesh(
      new THREE.TorusGeometry(0.82, 0.06, 14, 32, Math.PI),
      hpMat
    );
    hband.position.set(0, 0.12, 0);
    headGroup.add(hband);

    // Headband top padding
    const hbPad = new THREE.Mesh(
      new THREE.TorusGeometry(0.82, 0.045, 8, 20, Math.PI * 0.5),
      hpMat
    );
    hbPad.position.set(0, 0.12, 0);
    hbPad.rotation.y = -Math.PI * 0.25;
    headGroup.add(hbPad);

    // Left ear cup — large black disc
    const cupGeo = new THREE.CylinderGeometry(0.28, 0.3, 0.22, 24);
    const lCup = new THREE.Mesh(cupGeo, hpMat);
    lCup.rotation.z = Math.PI / 2;
    lCup.position.set(-0.88, 0.05, 0);
    headGroup.add(lCup);

    // Right ear cup
    const rCup = new THREE.Mesh(cupGeo, hpMat);
    rCup.rotation.z = Math.PI / 2;
    rCup.position.set(0.88, 0.05, 0);
    headGroup.add(rCup);

    // ── NECK ──────────────────────────────────────────────────
    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.13, 0.16, 0.3, 14),
      neckMat
    );
    neck.position.set(0, 3.92, 0);
    scene.add(neck);

    // ══════════════════════════════════════════════════════════
    // TORSO (Black Hoodie)
    // ══════════════════════════════════════════════════════════
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, 2.8, 0);
    scene.add(torsoGroup);

    // Hoodie body — cylinder tapered, gives soft fabric feel
    const torso = new THREE.Mesh(
      new THREE.CylinderGeometry(0.72, 0.58, 1.9, 16),
      hoodie
    );
    torsoGroup.add(torso);

    // Hoodie collar/V-neck visible at top
    const collar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.28, 0.18, 12),
      hoodie
    );
    collar.position.set(0, 0.98, 0.15);
    torsoGroup.add(collar);

    // Hood (folded at back of neck)
    const hood = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 10, 10),
      hoodie
    );
    hood.scale.set(1.3, 0.7, 0.9);
    hood.position.set(0, 0.85, -0.32);
    torsoGroup.add(hood);

    // Shoulders
    const lShould = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 12), hoodie);
    lShould.position.set(-0.7, 0.62, 0);
    torsoGroup.add(lShould);
    const rShould = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 12), hoodie);
    rShould.position.set(0.7, 0.62, 0);
    torsoGroup.add(rShould);

    // ══════════════════════════════════════════════════════════
    // ARMS + HANDS
    // ══════════════════════════════════════════════════════════
    // Left Arm
    const lArmG = new THREE.Group();
    lArmG.position.set(-0.78, 3.42, 0);
    scene.add(lArmG);
    lArmG.add(new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.16, 0.85, 12), hoodie));

    const lForeG = new THREE.Group();
    lForeG.position.set(0, -0.85, 0);
    lArmG.add(lForeG);
    lForeG.add(new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.8, 12), hoodie));

    // Left hand
    const lHandG = new THREE.Group();
    lHandG.position.set(0, -0.8, 0.05);
    lForeG.add(lHandG);
    lHandG.add(new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 0.26), metalHand));

    // Left fingers (5, spread out for typing)
    const lFingers: THREE.Group[] = [];
    [-0.12, -0.06, 0, 0.06, 0.12].forEach((x) => {
      const fg = new THREE.Group();
      fg.position.set(x, -0.04, 0.13);
      lHandG.add(fg);
      fg.add(new THREE.Mesh(new THREE.CylinderGeometry(0.023, 0.02, 0.12, 8), metalHand));
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 6), metalJoint);
      tip.position.set(0, -0.06, 0);
      fg.add(tip);
      lFingers.push(fg);
    });

    // Right Arm
    const rArmG = new THREE.Group();
    rArmG.position.set(0.78, 3.42, 0);
    scene.add(rArmG);
    rArmG.add(new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.16, 0.85, 12), hoodie));

    const rForeG = new THREE.Group();
    rForeG.position.set(0, -0.85, 0);
    rArmG.add(rForeG);
    rForeG.add(new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.8, 12), hoodie));

    const rHandG = new THREE.Group();
    rHandG.position.set(0, -0.8, 0.05);
    rForeG.add(rHandG);
    rHandG.add(new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 0.26), metalHand));

    const rFingers: THREE.Group[] = [];
    [-0.12, -0.06, 0, 0.06, 0.12].forEach((x) => {
      const fg = new THREE.Group();
      fg.position.set(x, -0.04, 0.13);
      rHandG.add(fg);
      fg.add(new THREE.Mesh(new THREE.CylinderGeometry(0.023, 0.02, 0.12, 8), metalHand));
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 6), metalJoint);
      tip.position.set(0, -0.06, 0);
      fg.add(tip);
      rFingers.push(fg);
    });

    // Arm posture: reaching forward onto keyboard
    lArmG.rotation.set(Math.PI / 4.5, 0, Math.PI / 9);
    lForeG.rotation.x = -Math.PI / 2;
    rArmG.rotation.set(Math.PI / 4.5, 0, -Math.PI / 9);
    rForeG.rotation.x = -Math.PI / 2;

    // ══════════════════════════════════════════════════════════
    // CHAIR (dark, behind robot)
    // ══════════════════════════════════════════════════════════
    // Chair back (mesh style, visible behind head/shoulders)
    const chBack = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.8, 0.12), chairMeshMat);
    chBack.position.set(0, 3.3, -0.65);
    scene.add(chBack);
    // Chair back frame
    const chFrame = new THREE.Mesh(new THREE.BoxGeometry(1.55, 1.85, 0.06), chairMat);
    chFrame.position.set(0, 3.3, -0.72);
    scene.add(chFrame);
    // Chair arms
    const chArmL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.07, 0.55), chairMat);
    chArmL.position.set(-0.78, 2.65, -0.15);
    scene.add(chArmL);
    const chArmR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.07, 0.55), chairMat);
    chArmR.position.set(0.78, 2.65, -0.15);
    scene.add(chArmR);

    // ══════════════════════════════════════════════════════════
    // DESK (foreground, covering lower body)
    // ══════════════════════════════════════════════════════════
    const desk = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.14, 2.2), deskMat);
    desk.position.set(0, 2.0, 1.8);
    scene.add(desk);

    // Keyboard on desk
    const kb = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.04, 0.5), kbMat);
    kb.position.set(0, 2.1, 1.15);
    scene.add(kb);
    // Key rows
    for (let r = 0; r < 5; r++) {
      const kRow = new THREE.Mesh(
        new THREE.BoxGeometry(1.35 - r * 0.06, 0.012, 0.04),
        new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.9 })
      );
      kRow.position.set(0, 2.12, 0.95 + r * 0.065);
      scene.add(kRow);
    }

    // ══════════════════════════════════════════════════════════
    // LIGHTING
    // ══════════════════════════════════════════════════════════
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffeedd, 0.85);
    key.position.set(4, 8, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xaabbdd, 0.3);
    fill.position.set(-5, 4, 3);
    scene.add(fill);
    // Screen glow illuminating face
    const sGlow = new THREE.PointLight(0x88ccff, 0.9, 5);
    sGlow.position.set(0, 3.5, 2.5);
    scene.add(sGlow);

    // ══════════════════════════════════════════════════════════
    // CURSOR TRACKING + ANIMATION
    // ══════════════════════════════════════════════════════════
    const tgt = { rx: 0, ry: 0 }, cur = { rx: 0, ry: 0 };
    const onMouse = (e: MouseEvent) => {
      const r = mount.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = -((e.clientY - r.top) / r.height) * 2 + 1;
      tgt.ry = Math.max(-0.7, Math.min(0.7, nx * 0.7));
      tgt.rx = Math.max(-0.35, Math.min(0.35, ny * 0.35));
    };
    window.addEventListener('mousemove', onMouse);

    let raf: number, t = 0, blinkT = 0, nextBlink = 3 + Math.random() * 3;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.016;
      blinkT += 0.016;

      // Instant head tracking
      cur.rx += (tgt.rx - cur.rx) * 0.25;
      cur.ry += (tgt.ry - cur.ry) * 0.25;
      headGroup.rotation.x = cur.rx;
      headGroup.rotation.y = cur.ry;
      torsoGroup.rotation.y = cur.ry * 0.1;

      // Breathing
      const br = Math.sin(t * 0.75) * 0.012;
      torsoGroup.position.y = 2.8 + br;
      headGroup.position.y = 4.55 + br;

      // Typing
      const spd = 10 + Math.sin(t * 0.35) * 4;
      const lw = Math.sin(t * spd);
      const rw = Math.sin(t * spd + 1.5);
      lForeG.rotation.x = -Math.PI / 2 + lw * 0.055;
      rForeG.rotation.x = -Math.PI / 2 + rw * 0.055;
      lFingers.forEach((f, i) => { f.rotation.x = Math.max(0, Math.sin(t * spd * 1.3 + i * 0.85)) * 0.22; });
      rFingers.forEach((f, i) => { f.rotation.x = Math.max(0, Math.sin(t * spd * 1.3 + i * 0.85 + 2)) * 0.22; });

      // Blink
      if (blinkT > nextBlink) {
        leftEye.scale.y = 0.05; rightEye.scale.y = 0.05;
        if (blinkT > nextBlink + 0.15) { blinkT = 0; nextBlink = 2.5 + Math.random() * 4; }
      } else {
        leftEye.scale.y += (1 - leftEye.scale.y) * 0.35;
        rightEye.scale.y += (1 - rightEye.scale.y) * 0.35;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      if (!mount) return;
      const nw = mount.clientWidth, nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      ro.disconnect();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={className} style={{ width: '100%', height: '100%', background: 'transparent' }} />;
}