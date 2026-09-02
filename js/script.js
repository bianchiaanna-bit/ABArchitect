/* =========================================================
   AB ARCHITECT
   JAVASCRIPT COMPLETO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTI
    ===================================================== */

    const menu = document.querySelector(".menu");
    const menuTrigger = document.querySelector(".menu-trigger");
    const menuClose = document.querySelector(".close");


    /* =====================================================
       MENU
       FUNZIONA SU TUTTE LE PAGINE
    ===================================================== */

    if (menu && menuTrigger) {

        /*
         * Sulle pagine interne il bottone deve essere sempre visibile.
         * Sulla Home invece viene gestito dallo scroll.
         */

        const intro = document.querySelector(".opening .intro");

        if (intro) {

            /* HOME */

            const updateMenuVisibility = () => {

                const introRect =
                    intro.getBoundingClientRect();

                if (introRect.top > 80) {

                    menuTrigger.classList.remove("visible");

                } else {

                    menuTrigger.classList.add("visible");

                }

            };

            window.addEventListener(
                "scroll",
                updateMenuVisibility,
                { passive: true }
            );

            updateMenuVisibility();

        } else {

            /*
             * PAGINE INTERNE:
             * Progetti / Chi siamo / Contatti / Privacy
             */

            menuTrigger.classList.add("visible");

        }


        /* =================================================
           APRI MENU
        ================================================= */

        menuTrigger.addEventListener("click", () => {

            const isOpen =
                menu.classList.contains("open");

            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        });


        /* =================================================
           FUNZIONE APRI
        ================================================= */

        function openMenu() {

            menu.classList.add("open");

            document.body.classList.add("menu-open");

            menuTrigger.setAttribute(
                "aria-expanded",
                "true"
            );

            menuTrigger.setAttribute(
                "aria-label",
                "Chiudi menu"
            );

        }


        /* =================================================
           FUNZIONE CHIUDI
        ================================================= */

        function closeMenu() {

            menu.classList.remove("open");

            document.body.classList.remove("menu-open");

            menuTrigger.setAttribute(
                "aria-expanded",
                "false"
            );

            menuTrigger.setAttribute(
                "aria-label",
                "Apri menu"
            );

        }


        /* =================================================
           PULSANTE CHIUDI
        ================================================= */

        if (menuClose) {

            menuClose.addEventListener(
                "click",
                closeMenu
            );

        }


        /* =================================================
           LINK DEL MENU
        ================================================= */

        menu
            .querySelectorAll(".menu-links a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            });


        /* =================================================
           ESC
        ================================================= */

        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Escape") {

                    closeMenu();

                }

            }
        );

    }


    /* =====================================================
       SEZIONE 05
       DOMANDE / ACCORDION
    ===================================================== */

    const questions =
        document.querySelectorAll(".question");


    questions.forEach((question) => {

        const button =
            question.querySelector(
                ".question-button"
            );

        const answer =
            question.querySelector(
                ".answer"
            );


        if (!button || !answer) return;


        button.addEventListener(
            "click",
            () => {

                const isOpen =
                    question.classList.contains("open");


                /* =========================================
                   CHIUDE LE ALTRE
                ========================================= */

                questions.forEach(
                    (otherQuestion) => {

                        const otherAnswer =
                            otherQuestion.querySelector(
                                ".answer"
                            );


                        if (
                            otherQuestion !== question
                        ) {

                            otherQuestion.classList.remove(
                                "open"
                            );


                            if (otherAnswer) {

                                otherAnswer.style.maxHeight =
                                    null;

                            }

                        }

                    }
                );


                /* =========================================
                   APRI / CHIUDI
                ========================================= */

                if (isOpen) {

                    question.classList.remove(
                        "open"
                    );

                    answer.style.maxHeight = null;

                } else {

                    question.classList.add(
                        "open"
                    );

                    answer.style.maxHeight =
                        answer.scrollHeight + "px";

                }

            }
        );

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".alfio-name, " +
            ".alfio-copy, " +
            ".vision-statement, " +
            ".project, " +
            ".story, " +
            ".why-title"
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "reveal"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       HERO — CAMBIO LENTO DEL PAESAGGIO
       SOLO HOME
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroImage =
        document.querySelector(".hero-image");


    if (hero && heroImage) {

        const heroImages = [

            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90",

            "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=2400&q=90"

        ];


        let currentImage = 0;


        /*
         * Precarica le immagini
         */

        heroImages.forEach((src) => {

            const image =
                new Image();

            image.src = src;

        });


        /*
         * Transizione
         */

        heroImage.style.transition =
            "opacity 2.5s ease-in-out";


        /*
         * Cambio immagine
         */

        setInterval(() => {

            currentImage =
                (currentImage + 1)
                % heroImages.length;


            heroImage.style.opacity = "0";


            setTimeout(() => {

                heroImage.src =
                    heroImages[currentImage];

                heroImage.style.opacity = "1";

            }, 2500);

        }, 10000);

    }

});