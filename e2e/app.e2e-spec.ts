import { MapToolPage } from './app.po';

describe('map-tool App', function() {
  let page: MapToolPage;

  beforeEach(() => {
    page = new MapToolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
