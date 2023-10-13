class ColorTheme {

    static $el = $(".color-theme");

    static events = {};

    static init() {

        let colorTheme = LocalStorage.getItem("color-theme") || "light";

        ColorTheme.setColor(colorTheme);

        ColorTheme.$el.find(".dropdown-item").click(function () {

            let colorTheme = $(this).data("value");

            ColorTheme.setColor(colorTheme);
        });

        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {

            if (LocalStorage.getItem("color-theme") === "auto") {
                setColorTheme(getSystemColorTheme());
            }
        });
    }

    static setColor(colorTheme) {

        LocalStorage.setItem("color-theme", colorTheme);

        if (colorTheme === "auto") {
            ColorTheme.setColorTheme(ColorTheme.getSystemColorTheme());
        } else {
            ColorTheme.setColorTheme(colorTheme);
        }

        ColorTheme.setOption(colorTheme);
    }

    static getSystemColorTheme() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    static setColorTheme(colorTheme) {

        $("html").attr("data-bs-theme", colorTheme);

        ColorTheme.trigger("change", colorTheme);
    }

    static getOption(colorTheme) {
        return ColorTheme.$el.find(".dropdown-item").filter(`[data-value='${colorTheme}']`);
    }

    static setOption(colorTheme) {

        const allColors = ColorTheme.$el.find(".dropdown-item");
        const color = allColors.filter(`[data-value='${colorTheme}']`);

        allColors.removeClass("active");
        allColors.find(".bi-check2").addClass("d-none");

        color.addClass("active");
        color.find(".bi-check2").removeClass("d-none");

        ColorTheme.$el.find(".dropdown-toggle i").attr("class", color.find("i").first().attr("class"));
    }

    static on(eventName, callback) {

        if (!ColorTheme.events[eventName]) {
            ColorTheme.events[eventName] = [];
        }

        ColorTheme.events[eventName].push(callback);
    }

    static trigger(eventName, ...values) {

        if (ColorTheme.events[eventName]) {
            for (const callback of ColorTheme.events[eventName]) {
                callback(...values);
            }
        }
    }

}
