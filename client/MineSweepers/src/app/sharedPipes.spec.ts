import { ObjectPipe } from './objectPipe';

describe('GetKeyPipe', () => {
  it('create an instance', () => {
    const pipe = new ObjectPipe();
    expect(pipe).toBeTruthy();
  });
});
