/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
  describe('RSS Feeds', function() {

    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
     */
    it('Feeds are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* This is a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('URLs are defined', function() {
      for(let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      };
    });

    /* This is a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('Names are defined', function() {
      for(let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      };
    });
  });


    /* This suite contains testing for the sidebar menu functionality  */
    describe('The menu', function() {
      const body = $('body'),
            menuIcon = $('.menu-icon-link');

      /* This is a test that ensures the menu is
       * hidden by default.
       */
      it('is hidden by default', function() {
        expect(body.hasClass('menu-hidden')).toBe(true);
      });
         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
      it('changes when icon is clicked', function() {
        menuIcon.trigger('click');
        expect(body.hasClass('menu-hidden')).toBe(false);
        menuIcon.trigger('click');
        expect(body.hasClass('menu-hidden')).toBe(true);
      });
    });

    /* This suite contains testing for initial entries in the feed */
    describe('Initial Entries', function() {

      /* This is a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it('There is at least one entry in the feed container', function() {
        expect($('.entry .feed')).toBeDefined();
      });
    });

    /* This suite verifies the new feed array values are unique to the
     * previous array.
     */
    describe('New Feed Selection', function() {
      const feed = document.querySelector('.feed');
      const firstFeed = [];
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
      beforeEach(function(done) {
        loadFeed(0);
        Array.from(feed.children).forEach(function(entry) {
            firstFeed.push(entry.innerText);
        });
        loadFeed(1, done);
      });

      it('The Feed Selection Is New', function() {
        Array.from(feed.children).forEach(function(entry,index){
          expect(entry.innerText === firstFeed[index]).toBe(false);
        });
      });
    });
}());
