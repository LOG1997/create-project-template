import { AjaxMiddleware } from './ajax.middleware';

describe('AjaxMiddleware', () => {
  it('should be defined', () => {
    expect(new AjaxMiddleware()).toBeDefined();
  });
});
