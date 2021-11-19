// ; (function ($) {
//     $(function () {
//         // DOM ready
//         $('#nav-toggle').on('click', function () {
//             this.classList.toggle('active')
//         })
//     })
// })(jQuery)

(function ($) { // Begin jQuery
    $(function () { // DOM ready
        // Clicking away from dropdown will remove the dropdown class
        $('html').click(function () {
            $('.nav-dropdown').hide();
        });
        // Toggle open and close nav styles on click
        $('#nav-toggle').click(function () {
            $('nav ul').slideToggle();
        });
        // Hamburger to X toggle
        $('#nav-toggle').on('click', function () {
            this.classList.toggle('active');
        });
    }); // end DOM ready
})(jQuery); // end jQuery