// =========================================================
// ELEMENTS
// =========================================================

const loader = document.getElementById("loader");
const enterBtn = document.getElementById("enterBtn");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");


// =========================================================
// ENTER BUTTON
// =========================================================

if (enterBtn) {

    enterBtn.addEventListener("click", function () {

        console.log("ENTER CLICKED");

        // Start website
        document.body.classList.add("started");

        // Hide loader
        if (loader) {
            loader.classList.add("hide");
        }

        // Start from top
        window.scrollTo(0, 0);


        // =================================================
        // MUSIC
        // =================================================

        if (music) {

            music.volume = 0.5;

            music.play()
                .then(function () {

                    console.log("Music started");

                    if (musicToggle) {
                        musicToggle.classList.add("playing");
                    }

                })
                .catch(function (error) {

                    console.log(
                        "Music could not start:",
                        error
                    );

                });

        }

    });

}


// =========================================================
// MUSIC TOGGLE
// =========================================================

if (musicToggle && music) {

    musicToggle.addEventListener("click", function () {

        if (music.paused) {

            music.play()
                .then(function () {

                    musicToggle.classList.add("playing");

                })
                .catch(function (error) {

                    console.log(
                        "Unable to play music:",
                        error
                    );

                });

        } else {

            music.pause();

            musicToggle.classList.remove("playing");

        }

    });

}


// =========================================================
// REVEAL ANIMATION
// =========================================================

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.14
            }

        );


    revealElements.forEach(function (element) {

        observer.observe(element);

    });

} else {

    revealElements.forEach(function (element) {

        element.classList.add("visible");

    });

}


// =========================================================
// CURSOR GLOW
// =========================================================

if (
    window.matchMedia("(pointer: fine)").matches
) {

    const glow =
        document.createElement("div");


    glow.style.cssText = `
        position: fixed;
        width: 220px;
        height: 220px;
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        background: radial-gradient(
            circle,
            rgba(210, 180, 130, 0.055),
            transparent 68%
        );
        transform: translate(-50%, -50%);
    `;


    document.body.appendChild(glow);


    window.addEventListener(
        "pointermove",
        function (event) {

            glow.style.left =
                event.clientX + "px";

            glow.style.top =
                event.clientY + "px";

        }
    );

}


// =========================================================
// PHOTO PARALLAX
// =========================================================

let ticking = false;


window.addEventListener(
    "scroll",
    function () {

        if (ticking) return;

        ticking = true;


        requestAnimationFrame(
            function () {

                const cards =
                    document.querySelectorAll(
                        ".photo-card"
                    );


                cards.forEach(function (card) {

                    const rect =
                        card.getBoundingClientRect();


                    if (
                        rect.top <
                            window.innerHeight &&
                        rect.bottom > 0
                    ) {

                        const distance =
                            (
                                rect.top +
                                rect.height / 2 -
                                window.innerHeight / 2
                            ) * 0.008;


                        card.style.setProperty(
                            "--scroll-shift",
                            distance + "px"
                        );

                    }

                });


                ticking = false;

            }
        );

    }
);


// =========================================================
// MUSIC ERROR CHECK
// =========================================================

if (music) {

    music.addEventListener(
        "error",
        function () {

            console.log(
                "Music file not found."
            );

            console.log(
                "Expected path: assets/music/birthday-music.mp3"
            );

        }
    );

}