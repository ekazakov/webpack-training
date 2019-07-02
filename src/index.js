/* eslint-disable */

import { Foo } from './Foo';
import { check } from './utils';

function foo() {
    console.log('foo');
}

if (check()) {
    console.log('doo');
    const foo = new Foo();
    foo.do();
}

foo();
