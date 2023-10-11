class ColorTheme {

    static $el = $(".color-theme");

    static init() {

        let colorTheme = LocalStorageUtils.getItem("color-theme") || "auto";

        ColorTheme.setColor(colorTheme);

        ColorTheme.$el.find(".dropdown-item").click(function () {

            let colorTheme = $(this).data("value");

            ColorTheme.setColor(colorTheme);
        });

        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {

            if (LocalStorageUtils.getItem("color-theme") === "auto") {
                setColorTheme(getSystemColorTheme());
            }
        });
    }

    static setColor(colorTheme) {

        LocalStorageUtils.setItem("color-theme", colorTheme);

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
    }

    static getOption(colorTheme) {
        return ColorTheme.$el.find(".dropdown-item").filter(`[data-value='${colorTheme}']`);
    }

    static setOption(colorTheme) {

        const allColors = ColorTheme.$el.find(".dropdown-item");
        const color = allColors.filter(`[data-value='${colorTheme}']`);

        allColors.removeClass("active");
        color.addClass("active");
    }

}
