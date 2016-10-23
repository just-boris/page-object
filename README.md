## Page object pattern for Javascript

This repo contains examples how to implement Page Object pattern for Javascript testing frameworks. Let's assume, that we have UI framework that gives us a component instance, where we can navigate through items:

```js
const component = createComponent()

component.find('.name') // find and return element with class "name"
component.find('.action-button') // find button to trigger action
```

To avoid repeating this selectors every time, it is recommended to create Page Object as a wrapper:

```js
function Page() {
  this.name = () => component.find('.name');
  this.action = () => component.find('.action-button');

  //getter functions can be parametrized
  this.formField = (name) => component.find(`.form-control[name=${name}]`);
}
```

Then use this object rather that raw instance to do test actions

```js
it('fill form and submit', () => {
  const component = createComponent();
  const page = new Page(component);

  page.formField('username').val('tester');
  page.formField('email').val('tester@email.com');

  page.action().click();
});
```

It also makes sense to put this setup code in a helper function or beforeEach hook:

```js
function setup() {
  const component = createComponent();
  return new Page(component);
}
```

> ProTip: use ES2015 features to return multiple values from the function if you need so

```js
function setup(data) {
  const component = createComponent(data);
  const page = new Page(component);
  return {component, page}
}

// later in code
const {component, page} = setup(data);
```

## FAQ

**Can I use this pattern with my framework?**
Yes, you probably can. It works with any framework that uses UI-Components. Then you need to have an ability to traverse through elements tree. See [examples section](#examples) for actual frameworks example

**I want to put a method like "clickTheButton" into my page object. Is it correct?**
It is not okay. If you have a button in your component, it should be available not only for click but also for checking its content or visibility at all. When you create a method that unconditionally clicks on button, it is not good for reusability. However, you can add two methods: one, that returns button, and second that makes a click:

```js
function Page(component) {
  this.button = () => component.find('button');
  this.clickOnButton = () => this.button().click();
}
```

**I have a complex component and I need to find an element within another element. How can I do that?**
If your component framework supports `.find()` chaining, you can do it with page objects as well:

```js
function Page(component) {
  this.topBar = () => component.find('.top-bar');
  this.topButton = () => this.topBar().find('.button');
}
```

## Examples

* [React](examples/react)
* [Backbone](examples/backbone)
