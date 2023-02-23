!(function (a) {
  (a.fn.ZeroSpamDavidWalsh = function () {
    return void 0 === ZeroSpamDavidWalsh.key
      ? this
      : this.length
      ? (this.attr("data-zerospam-davidwalsh", "protected"),
        void (a('[name="zerospam_david_walsh_key"]', this).length
          ? a('[name="zerospam_david_walsh_key"]', this).val(
              ZeroSpamDavidWalsh.key
            )
          : a(
              '<input type="hidden" name="zerospam_david_walsh_key" value="' +
                ZeroSpamDavidWalsh.key +
                '" />'
            ).appendTo(this)))
      : this;
  }),
    a(function () {
      var a = "#commentform, #registerform, .wpforms-form, .wpcf7-form";
      void 0 !== ZeroSpamDavidWalsh.selectors &&
        ZeroSpamDavidWalsh.selectors &&
        (a += "," + ZeroSpamDavidWalsh.selectors),
        jQuery(a).ZeroSpamDavidWalsh();
    });
})(jQuery);
