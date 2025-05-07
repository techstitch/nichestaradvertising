window.addEventListener("load", () => {
    const btn = document.querySelector(".whatsapp-floating-button");

    // Start 5 seconds after load
    gsap.delayedCall(3, () => {
        // Optional: animate it in (e.g., fade + scale)
        gsap.fromTo(btn, { autoAlpha: 0, scale: 0 }, { duration: 1, autoAlpha: 1, scale: 1, ease: "back.out(1.7)" });

        // Floating animation loop
        gsap.to(btn, {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "linear",
            transformOrigin: "50% 50%"
          });
    });
});