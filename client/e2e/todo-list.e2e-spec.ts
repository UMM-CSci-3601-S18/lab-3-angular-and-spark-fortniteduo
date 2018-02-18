import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
    let args = arguments;

    // queue 100ms wait between test
    //This delay is only put here so that you can watch the browser do its' thing.
    //If you're tired of it taking long you can remove this call
    origFn.call(browser.driver.controlFlow(), function () {
        return protractor.promise.delayed(100);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
  });

  it('should get and highlight Todo Name attribute ', () => {
    page.navigateTo();
    expect(page.getTodoTitle()).toEqual('Todos');
  });

  // ID Box
  it('should type something in filter ID box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAnId("58895985f0a4bbea24084abf");
    expect(page.getUniqueTodo("58895985f0a4bbea24084abf")).toEqual("Barry");
  });

  // Category Box
  it('should type something in filter by category box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeACategory("video games");
    expect(page.getUniqueTodo("58895985c1849992336c219b")).toEqual("Fry");
  });

  // Owner Box
  it('should type something in filter by owner box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAOwner("Roberta");
    expect(page.getUniqueTodo("58895985f0b01c235d4bc630")).toEqual("Roberta");
  });

  // Status Box
  it('should type something in filter by status box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAStatus("complete");
    expect(page.getUniqueTodo("5889598528c4748a0292e014")).toEqual("Workman");
  });

  // Body Box
  it('should type something in filter by body box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeABody("tempor");
    expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("Blanche");
  });

  // Owner and Category
  it('should type something in filter by owner box and the filter by category box check that it returned correct element', () => {
    page.navigateTo();
    page.typeAOwner("Blanche");
    page.typeACategory("homework");
    expect(page.getUniqueTodo("5889598516c4280a078552fe")).toEqual("Blanche");
  });

});
