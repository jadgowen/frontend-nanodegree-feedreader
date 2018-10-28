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
      /* Trigger mimics click on the menuIcon selected class */
      menuIcon.trigger('click');
      /* The first click should result in menu-hidden being removed */
      expect(body.hasClass('menu-hidden')).toBe(false);
      /* A second mimicked click on menuIcon */
      menuIcon.trigger('click');
      /* The menu-hidden class should be re-added */
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
      /* Ensures the feed has been loaded before testing */
      loadFeed(0, done);
    });

    it('There is at least one entry in the feed container', function() {
      /* Verified length of entry in feed is not equal to 0 */
      expect($('.entry, .feed').length).not.toEqual(0);
    });
  });

  /* This suite verifies the new feed array values are unique to the
   * previous array. Inspired by Matthew Cranford and his Udacity-provided walkthrough
   * https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/
   */
  describe('New Feed Selection', function() {
    const feed = $('.feed')[0],
          firstFeed = [];

    /* This is a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    beforeEach(function(done) {
      /* Runs the feed loading function */
      loadFeed(0);
      /* Pushes each entry into the firstFeed array */
      Array.from(feed.children).forEach(function(e) {
          firstFeed.push(e.innerText);
      });
      /* Runs the feed loading function again and provides callback */
      loadFeed(1, done);
    });

    it('The Feed Selection Is New', function() {
      /* Takes value of new feed and corresponding index */
      Array.from(feed.children).forEach(function(e,i){
        /* Compares current feed innerText against firstFeed array values by index */
        expect(e.innerText === firstFeed[i]).toBe(false);
      });
    });
  });
}());
