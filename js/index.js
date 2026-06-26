class GuideReveal {
    constructor(root) {
        this.root = root;
        this.spots = root.querySelectorAll(".spot");
        this.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        this.started = false;
        this.selected = null;
    }

    init() {
        this.bindLinks();

        if (this.reduce) {
            this.reveal();
            return;
        }

        requestAnimationFrame(() => requestAnimationFrame(() => this.reveal()));
        window.setTimeout(() => this.reveal(), 120);
    }

    reveal() {
        if (this.started) return;

        this.started = true;
        this.root.body.classList.add("ready");
        this.spots.forEach((spot) => spot.classList.add("is-in"));
    }

    bindLinks() {
        this.root.querySelectorAll(".spot-link").forEach((link) => {
            link.addEventListener("click", (event) => {
                const spot = link.closest(".spot");
                if (this.selected !== spot) {
                    event.preventDefault();
                    this.select(spot);
                }
            });
        });

        this.root.addEventListener("click", (event) => {
            if (!event.target.closest(".spot")) {
                this.select(null);
            }
        });
    }

    select(spot) {
        if (this.selected)
            this.selected.classList.remove("is-selected");

        this.selected = spot;
        if (spot) spot.classList.add("is-selected");
    }
}

new GuideReveal(document).init();
