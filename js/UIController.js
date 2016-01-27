function UIController($elem) {
    var $container = $elem;

    return {
        fill: function (html) {
            this.destroy();
            $container.html(html);
        },

        destroy: function () {
            $container.off().empty();
        }
    }
}