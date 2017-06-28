import { MineSweepersPage } from './app.po';

describe('mine-sweepers App', () => {
  let page: MineSweepersPage;

  beforeEach(() => {
    page = new MineSweepersPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
