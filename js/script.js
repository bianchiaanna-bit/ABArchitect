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
         * Sulla Home il bottone compare dopo la Hero.
         * Sulle pagine interne è sempre visibile.
         */

        const intro = document.querySelector(".opening .intro");


        if (intro) {

            /* =============================================
               HOME
            ============================================= */

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

            /* =============================================
               PAGINE INTERNE
               Progetti / Chi siamo / Contatti / Privacy
            ============================================= */

            menuTrigger.classList.add("visible");

        }


        /* =================================================
           APRI / CHIUDI MENU
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
           FUNZIONE APRI MENU
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
           FUNZIONE CHIUDI MENU
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
                   CHIUDE LE ALTRE DOMANDE
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
                   APRI / CHIUDI DOMANDA
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
       HERO HOME
       CAMBIO AUTOMATICO TRA LE DUE IMMAGINI
       
       SOLO IMMAGINI LOCALI:
       
       01 — Villa_Altavilla.jpg
       02 — Hero2.jpg
    ===================================================== */

    const hero =
        document.querySelector(".hero");


    const heroImage =
        document.querySelector(".hero-image");


    /*
     * Questo codice viene eseguito solo se
     * nella pagina esiste una Hero.
     */

    if (hero && heroImage) {


        /* =============================================
           IMMAGINI DELLA HERO
           
           IMPORTANTE:
           NON INSERIAMO PIÙ NESSUNA IMMAGINE ESTERNA.
        ============================================= */

        const heroImages = [

            "immagini/Villa_Altavilla.jpg",

            "immagini/Hero2.jpg"

        ];


        /*
         * Indice dell'immagine attualmente visualizzata.
         *
         * 0 = Villa_Altavilla.jpg
         * 1 = Hero2.jpg
         */

        let currentImage = 0;


        /* =============================================
           PRECARICAMENTO
           
           Carichiamo entrambe le immagini prima
           del cambio per evitare ritardi.
        ============================================= */

        heroImages.forEach((src) => {

            const image =
                new Image();

            image.src = src;

        });


        /* =============================================
           TRANSIZIONE FADE
        ============================================= */

        heroImage.style.transition =
            "opacity 2.5s ease-in-out";


        /* =============================================
           CAMBIO IMMAGINE
           
           La prima immagine resta visibile per 10 secondi.
           
           Poi:
           
           Villa_Altavilla
                  ↓
             fade out
                  ↓
               Hero2
                  ↓
             fade in
           
           Dopo altri 10 secondi:
           
               Hero2
                  ↓
             fade out
                  ↓
           Villa_Altavilla
        ============================================= */

        setInterval(() => {


            /* =========================================
               CALCOLA PROSSIMA IMMAGINE
            ========================================= */

            currentImage =
                (currentImage + 1)
                % heroImages.length;


            /* =========================================
               FADE OUT
            ========================================= */

            heroImage.style.opacity = "0";


            /* =========================================
               CAMBIO DEL FILE
               
               Aspettiamo che il fade out sia
               praticamente completato.
            ========================================= */

            setTimeout(() => {

                heroImage.src =
                    heroImages[currentImage];


                /* =====================================
                   FADE IN
                ===================================== */

                heroImage.style.opacity = "1";

            }, 2500);


        }, 10000);

    }

});