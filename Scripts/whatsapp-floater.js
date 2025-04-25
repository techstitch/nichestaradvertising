window.addEventListener("load", () => {
    const btn = document.querySelector(".whatsapp-floating-button");

    // Start 5 seconds after load
    gsap.delayedCall(3, () => {
        // Optional: animate it in (e.g., fade + scale)
        gsap.fromTo(btn, { autoAlpha: 0, scale: 0 }, { duration: 1, autoAlpha: 1, scale: 1, ease: "back.out(1.7)" });

        // Floating animation loop
        gsap.to(btn, {
            y: -10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    });
});